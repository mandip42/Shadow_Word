import type { Player } from '@/store/gameStore';

export function getAlivePlayers(players: Player[]): Player[] {
  return players.filter((p) => !p.isEliminated);
}

export function getAliveCitizens(players: Player[]): Player[] {
  return players.filter((p) => !p.isEliminated && p.role === 'citizen');
}

export function getAliveSpy(players: Player[]): Player[] {
  return players.filter((p) => !p.isEliminated && p.role === 'spy');
}

export function getAliveGhost(players: Player[]): Player[] {
  return players.filter((p) => !p.isEliminated && p.role === 'ghost');
}

export function checkCitizensWin(players: Player[]): boolean {
  const spy = getAliveSpy(players);
  const ghost = getAliveGhost(players);
  return spy.length === 0 && ghost.length === 0;
}

export function checkSpyWin(players: Player[]): boolean {
  const alive = getAlivePlayers(players);
  const spy = getAliveSpy(players);
  const citizens = getAliveCitizens(players);
  const ghost = getAliveGhost(players);
  if (alive.length <= 2 && spy.length >= 1) return true;
  if (citizens.length === 0 && (spy.length >= 1 || ghost.length >= 1)) return true;
  return false;
}

export function checkGhostWin(
  players: Player[],
  eliminatedPlayerId: string,
  guess: string,
  citizenWord: string
): boolean {
  const eliminated = players.find((p) => p.id === eliminatedPlayerId);
  if (!eliminated || eliminated.role !== 'ghost') return false;
  return guess.trim().toLowerCase() === citizenWord.toLowerCase();
}

export type WinnerKind = 'citizens' | 'spy' | 'ghost' | null;

export function resolveWinner(
  players: Player[],
  ghostGuess?: { guess: string; citizenWord: string }
): { winner: WinnerKind; reason: string } {
  if (checkCitizensWin(players)) {
    return { winner: 'citizens', reason: 'All Spy and Ghost eliminated!' };
  }
  if (checkSpyWin(players)) {
    return { winner: 'spy', reason: 'Spy reached final 2 (or citizens eliminated).' };
  }
  const ghost = players.find((p) => p.role === 'ghost');
  if (ghostGuess && ghost && checkGhostWin(players, ghost.id, ghostGuess.guess, ghostGuess.citizenWord)) {
    return { winner: 'ghost', reason: 'Ghost guessed the word correctly!' };
  }
  return { winner: null, reason: '' };
}
