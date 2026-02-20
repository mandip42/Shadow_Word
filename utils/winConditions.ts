import type { Player } from '@/store/gameStore';

export function getAlivePlayers(players: Player[]): Player[] {
  return players.filter((p) => !p.isEliminated);
}

export function getAliveCitizens(players: Player[]): Player[] {
  return players.filter((p) => !p.isEliminated && p.role === 'citizen');
}

export function getAliveUndercover(players: Player[]): Player[] {
  return players.filter((p) => !p.isEliminated && p.role === 'undercover');
}

export function getAliveMrWhite(players: Player[]): Player[] {
  return players.filter((p) => !p.isEliminated && p.role === 'mrwhite');
}

export function checkCitizensWin(players: Player[]): boolean {
  const undercover = getAliveUndercover(players);
  const mrwhite = getAliveMrWhite(players);
  return undercover.length === 0 && mrwhite.length === 0;
}

export function checkUndercoverWin(players: Player[]): boolean {
  const alive = getAlivePlayers(players);
  const undercover = getAliveUndercover(players);
  const citizens = getAliveCitizens(players);
  const mrwhite = getAliveMrWhite(players);
  if (alive.length <= 2 && undercover.length >= 1) return true;
  if (citizens.length === 0 && (undercover.length >= 1 || mrwhite.length >= 1)) return true;
  return false;
}

export function checkMrWhiteWin(
  players: Player[],
  eliminatedPlayerId: string,
  guess: string,
  citizenWord: string
): boolean {
  const eliminated = players.find((p) => p.id === eliminatedPlayerId);
  if (!eliminated || eliminated.role !== 'mrwhite') return false;
  return guess.trim().toLowerCase() === citizenWord.toLowerCase();
}

export type WinnerKind = 'citizens' | 'undercover' | 'mrwhite' | null;

export function resolveWinner(
  players: Player[],
  mrWhiteGuess?: { guess: string; citizenWord: string }
): { winner: WinnerKind; reason: string } {
  if (checkCitizensWin(players)) {
    return { winner: 'citizens', reason: 'All Undercover and Mr. White eliminated!' };
  }
  if (checkUndercoverWin(players)) {
    return { winner: 'undercover', reason: 'Undercover reached final 2 (or citizens eliminated).' };
  }
  const mrWhite = players.find((p) => p.role === 'mrwhite');
  if (mrWhiteGuess && mrWhite && checkMrWhiteWin(players, mrWhite.id, mrWhiteGuess.guess, mrWhiteGuess.citizenWord)) {
    return { winner: 'mrwhite', reason: 'Mr. White guessed the word correctly!' };
  }
  return { winner: null, reason: '' };
}
