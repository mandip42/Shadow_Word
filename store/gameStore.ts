import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WordPair } from '@/data/wordPairs';
import { getRandomWordPair } from '@/data/wordPairs';
import { loadCustomWordPairs } from '@/utils/storage';
import { assignRoles as doAssignRoles, suggestedUndercoverCount } from '@/utils/roleAssignment';
import {
  checkCitizensWin,
  checkUndercoverWin,
  resolveWinner,
  getAlivePlayers,
} from '@/utils/winConditions';
import {
  appendGameHistory,
  loadGameHistory,
  loadLeaderboard,
  saveLeaderboard,
  addLeaderboardWin,
} from '@/utils/storage';

export interface Player {
  id: string;
  name: string;
  role: 'citizen' | 'undercover' | 'mrwhite';
  word: string | null;
  isEliminated: boolean;
  votes: number;
}

export interface GameSettings {
  playerCount: number;
  undercoverCount: number;
  mrWhiteEnabled: boolean;
  timerSeconds: 0 | 30 | 60 | 90;
  wordPackFilter: WordCategoryFilter;
  difficultyFilter: 'easy' | 'medium' | 'hard' | 'any';
}

export type WordCategoryFilter = 'all' | string;

export interface GameState {
  players: Player[];
  wordPair: WordPair | null;
  currentRevealIndex: number;
  currentRound: number;
  currentSpeakerIndex: number;
  votes: Record<string, string>;
  eliminatedPlayers: string[];
  gamePhase:
    | 'idle'
    | 'setup'
    | 'naming'
    | 'reveal'
    | 'discussion'
    | 'voting'
    | 'elimination'
    | 'mrwhite'
    | 'ended';
  winner: 'citizens' | 'undercover' | 'mrwhite' | null;
  winReason: string;
  gameHistory: ReturnType<typeof loadGameHistory>;
  leaderboard: Record<string, number>;
  settings: GameSettings | null;
  mrWhiteGuess: string | null;
  lastEliminatedId: string | null;
}

type GameActions = {
  initGame: (settings: GameSettings) => void;
  setPlayers: (names: string[]) => void;
  assignRoles: () => void;
  advanceReveal: () => void;
  castVote: (voterId: string, targetId: string) => void;
  resolveVote: () => void;
  checkWinCondition: () => void;
  eliminatePlayer: (playerId: string) => void;
  submitMrWhiteGuess: (guess: string) => void;
  nextRound: () => void;
  resetGame: () => void;
  saveToHistory: () => void;
  setPhase: (phase: GameState['gamePhase']) => void;
  setSettings: (s: GameSettings | null) => void;
  loadPersisted: () => void;
};

const defaultSettings: GameSettings = {
  playerCount: 6,
  undercoverCount: 1,
  mrWhiteEnabled: true,
  timerSeconds: 0,
  wordPackFilter: 'all',
  difficultyFilter: 'any',
};

const initialState: GameState = {
  players: [],
  wordPair: null,
  currentRevealIndex: 0,
  currentRound: 1,
  currentSpeakerIndex: 0,
  votes: {},
  eliminatedPlayers: [],
  gamePhase: 'idle',
  winner: null,
  winReason: '',
  gameHistory: [],
  leaderboard: {},
  settings: null,
  mrWhiteGuess: null,
  lastEliminatedId: null,
};

function pickWordPair(settings: GameSettings): WordPair | null {
  const custom = loadCustomWordPairs();
  const pool: WordPair[] = custom.map((c) => ({
    id: c.id,
    wordA: c.wordA,
    wordB: c.wordB,
    category: c.category as WordPair['category'],
    difficulty: c.difficulty,
  }));
  const builtIn = getRandomWordPair({
    category: settings.wordPackFilter === 'all' ? undefined : (settings.wordPackFilter as WordPair['category']),
    difficulty: settings.difficultyFilter === 'any' ? undefined : settings.difficultyFilter,
  });
  if (builtIn) pool.push(builtIn);
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      loadPersisted() {
        set({
          gameHistory: loadGameHistory(),
          leaderboard: loadLeaderboard(),
        });
      },

      setSettings(s) {
        set({ settings: s });
      },

      initGame(settings) {
        const wordPair = pickWordPair(settings);
        set({
          ...initialState,
          settings,
          wordPair,
          gamePhase: 'setup',
          gameHistory: loadGameHistory(),
          leaderboard: loadLeaderboard(),
        });
      },

      setPlayers(names) {
        const players: Player[] = names.map((name, i) => ({
          id: `p-${i}-${Date.now()}`,
          name: name.trim() || `Player ${i + 1}`,
          role: 'citizen',
          word: null,
          isEliminated: false,
          votes: 0,
        }));
        set({
          players,
          gamePhase: 'naming',
        });
      },

      assignRoles() {
        const state = get();
        const { players, wordPair, settings } = state;
        if (!wordPair || !settings) return;
        const assignments = doAssignRoles({
          playerCount: players.length,
          undercoverCount: settings.undercoverCount,
          mrWhiteEnabled: settings.mrWhiteEnabled,
          wordPair,
        });
        const next: Player[] = players.map((p, i) => ({
          ...p,
          role: assignments[i].role,
          word: assignments[i].word,
        }));
        set({
          players: next,
          currentRevealIndex: 0,
          currentRound: 1,
          currentSpeakerIndex: 0,
          gamePhase: 'reveal',
        });
      },

      advanceReveal() {
        const state = get();
        const next = state.currentRevealIndex + 1;
        if (next >= state.players.length) {
          set({
            currentRevealIndex: next,
            gamePhase: 'discussion',
            currentSpeakerIndex: 0,
          });
        } else {
          set({ currentRevealIndex: next });
        }
      },

      castVote(voterId, targetId) {
        set((s) => ({
          votes: { ...s.votes, [voterId]: targetId },
        }));
      },

      resolveVote() {
        const state = get();
        const votes = state.votes;
        const alive = getAlivePlayers(state.players);
        // Only consider alive players — never eliminate someone already out
        const tally: Record<string, number> = {};
        alive.forEach((p) => (tally[p.id] = 0));
        Object.values(votes).forEach((targetId) => {
          if (tally[targetId] !== undefined) tally[targetId]++;
        });
        const maxVotes = Math.max(...Object.values(tally), 0);
        const tied = Object.entries(tally).filter(([, n]) => n === maxVotes);
        let eliminatedId: string | null = null;
        if (tied.length === 1 && maxVotes > 0) {
          eliminatedId = tied[0][0];
        } else if (tied.length > 1 && maxVotes > 0) {
          set({
            gamePhase: 'voting',
            votes: {},
            winReason: 'Tie — re-vote!',
          });
          return;
        }
        if (eliminatedId) {
          set({
            votes: {},
            gamePhase: 'elimination',
            lastEliminatedId: eliminatedId,
          });
        } else {
          set({ votes: {}, gamePhase: 'discussion' });
          get().nextRound();
        }
      },

      eliminatePlayer(playerId) {
        const state = get();
        const player = state.players.find((p) => p.id === playerId);
        if (!player) return;
        if (player.role === 'mrwhite') {
          set({
            gamePhase: 'mrwhite',
            eliminatedPlayers: [...state.eliminatedPlayers, playerId],
            players: state.players.map((p) =>
              p.id === playerId ? { ...p, isEliminated: true } : p
            ),
          });
          return;
        }
        const nextPlayers = state.players.map((p) =>
          p.id === playerId ? { ...p, isEliminated: true } : p
        );
        const { winner, reason } = resolveWinner(nextPlayers);
        if (winner) {
          set({
            players: nextPlayers,
            eliminatedPlayers: [...state.eliminatedPlayers, playerId],
            gamePhase: 'ended',
            winner,
            winReason: reason,
          });
          get().saveToHistory();
        } else {
          set({
            players: nextPlayers,
            eliminatedPlayers: [...state.eliminatedPlayers, playerId],
            gamePhase: 'discussion',
            currentRound: state.currentRound + 1,
            currentSpeakerIndex: 0,
          });
        }
      },

      submitMrWhiteGuess(guess: string) {
        const state = get();
        const citizenWord = state.wordPair?.wordA ?? '';
        const mrWhite = state.players.find((p) => p.role === 'mrwhite');
        const { winner, reason } = resolveWinner(state.players, {
          guess,
          citizenWord,
        });
        const wonAsMrWhite = winner === 'mrwhite';
        const nextPlayers = state.players.map((p) =>
          p.id === mrWhite?.id ? { ...p, isEliminated: true } : p
        );
        if (wonAsMrWhite) {
          set({
            mrWhiteGuess: guess,
            players: nextPlayers,
            gamePhase: 'ended',
            winner: 'mrwhite',
            winReason: reason,
          });
        } else {
          const afterElim = nextPlayers.filter((p) => !p.isEliminated);
          const { winner: w2, reason: r2 } = resolveWinner(nextPlayers);
          set({
            mrWhiteGuess: guess,
            players: nextPlayers,
            gamePhase: w2 ? 'ended' : 'discussion',
            winner: w2 ?? null,
            winReason: w2 ? r2 : 'Mr. White guessed wrong. Game continues.',
            currentRound: w2 ? state.currentRound : state.currentRound + 1,
            currentSpeakerIndex: 0,
          });
          if (w2) get().saveToHistory();
        }
      },

      checkWinCondition() {
        const state = get();
        if (checkCitizensWin(state.players)) {
          set({
            gamePhase: 'ended',
            winner: 'citizens',
            winReason: 'All Undercover and Mr. White eliminated!',
          });
          get().saveToHistory();
        } else if (checkUndercoverWin(state.players)) {
          set({
            gamePhase: 'ended',
            winner: 'undercover',
            winReason: 'Undercover reached final 2!',
          });
          get().saveToHistory();
        }
      },

      nextRound() {
        const state = get();
        set({
          currentRound: state.currentRound + 1,
          currentSpeakerIndex: 0,
        });
        get().checkWinCondition();
      },

      resetGame() {
        set(initialState);
      },

      saveToHistory() {
        const state = get();
        if (state.winner && state.players.length) {
          const names = state.players.map((p) => p.name);
          appendGameHistory({
            id: `game-${Date.now()}`,
            timestamp: Date.now(),
            playerCount: state.players.length,
            winner: state.winner,
            winReason: state.winReason,
            playerNames: names,
          });
          const winnerPlayers = state.players.filter(
            (p) =>
              (state.winner === 'citizens' && p.role === 'citizen') ||
              (state.winner === 'undercover' && p.role === 'undercover') ||
              (state.winner === 'mrwhite' && p.role === 'mrwhite')
          );
          winnerPlayers.forEach((p) => addLeaderboardWin(p.name));
          set({
            gameHistory: loadGameHistory(),
            leaderboard: loadLeaderboard(),
          });
        }
      },

      setPhase(phase) {
        set({ gamePhase: phase });
      },
    }),
    {
      name: 'shadow-word-game',
      partialize: (s) => ({
        gameHistory: s.gameHistory,
        leaderboard: s.leaderboard,
      }),
    }
  )
);

export { suggestedUndercoverCount };
