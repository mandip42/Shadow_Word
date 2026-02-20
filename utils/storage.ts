const MAX_HISTORY = 20;
const HISTORY_KEY = 'shadow-word-history';
const LEADERBOARD_KEY = 'shadow-word-leaderboard';
const CUSTOM_WORDS_KEY = 'shadow-word-custom-pairs';

export interface GameRecord {
  id: string;
  timestamp: number;
  playerCount: number;
  winner: 'citizens' | 'undercover' | 'mrwhite';
  winReason: string;
  playerNames: string[];
}

export function loadGameHistory(): GameRecord[] {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(HISTORY_KEY) : null;
    if (!raw) return [];
    const parsed = JSON.parse(raw) as GameRecord[];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_HISTORY) : [];
  } catch {
    return [];
  }
}

export function saveGameHistory(records: GameRecord[]): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(records.slice(0, MAX_HISTORY)));
  } catch {
    // ignore
  }
}

export function appendGameHistory(record: GameRecord): void {
  const list = loadGameHistory();
  list.unshift(record);
  saveGameHistory(list);
}

export function loadLeaderboard(): Record<string, number> {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(LEADERBOARD_KEY) : null;
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, number>;
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function saveLeaderboard(board: Record<string, number>): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(board));
  } catch {
    // ignore
  }
}

export function addLeaderboardWin(playerName: string): void {
  const board = loadLeaderboard();
  board[playerName] = (board[playerName] ?? 0) + 1;
  saveLeaderboard(board);
}

export interface CustomWordPair {
  id: string;
  wordA: string;
  wordB: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export function loadCustomWordPairs(): CustomWordPair[] {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(CUSTOM_WORDS_KEY) : null;
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CustomWordPair[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomWordPairs(pairs: CustomWordPair[]): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CUSTOM_WORDS_KEY, JSON.stringify(pairs));
  } catch {
    // ignore
  }
}

export function addCustomWordPair(pair: Omit<CustomWordPair, 'id'>): void {
  const list = loadCustomWordPairs();
  list.push({
    ...pair,
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  });
  saveCustomWordPairs(list);
}

export function removeCustomWordPair(id: string): void {
  const list = loadCustomWordPairs().filter((p) => p.id !== id);
  saveCustomWordPairs(list);
}
