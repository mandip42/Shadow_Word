import type { WordPair } from '@/data/wordPairs';

export type Role = 'citizen' | 'spy' | 'ghost';

export interface AssignmentInput {
  playerCount: number;
  spyCount: number;
  ghostEnabled: boolean;
  wordPair: WordPair;
}

export interface AssignedRole {
  role: Role;
  word: string | null;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Returns one assignment per player index: role and word (or null for Ghost).
 * Citizens get wordA, Spy get wordB, Ghost gets null.
 */
export function assignRoles(input: AssignmentInput): AssignedRole[] {
  const { playerCount, spyCount, ghostEnabled, wordPair } = input;
  const slots: Role[] = [];
  for (let i = 0; i < playerCount; i++) {
    if (i < spyCount) slots.push('spy');
    else if (ghostEnabled && i === spyCount) slots.push('ghost');
    else slots.push('citizen');
  }
  const shuffled = shuffle(slots);
  return shuffled.map((role) => {
    if (role === 'citizen') return { role: 'citizen', word: wordPair.wordA };
    if (role === 'spy') return { role: 'spy', word: wordPair.wordB };
    return { role: 'ghost', word: null };
  });
}

/**
 * Suggested spy count for 2–16 players (inclusive).
 */
export function suggestedSpyCount(playerCount: number): number {
  if (playerCount <= 2) return 1;
  if (playerCount <= 4) return 1;
  if (playerCount <= 6) return 1;
  if (playerCount <= 8) return 2;
  if (playerCount <= 10) return 2;
  if (playerCount <= 12) return 2;
  if (playerCount <= 14) return 3;
  return 3;
}
