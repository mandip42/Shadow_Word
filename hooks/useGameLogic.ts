import { useCallback } from 'react';
import { useGameStore } from '@/store/gameStore';
import {
  getAlivePlayers,
  checkCitizensWin,
  checkUndercoverWin,
} from '@/utils/winConditions';

export function useGameLogic() {
  const players = useGameStore((s) => s.players);
  const gamePhase = useGameStore((s) => s.gamePhase);

  const alivePlayers = useCallback(() => getAlivePlayers(players), [players]);

  const citizensWin = useCallback(() => checkCitizensWin(players), [players]);

  const undercoverWin = useCallback(() => checkUndercoverWin(players), [players]);

  const isGameOver = gamePhase === 'ended';

  return {
    alivePlayers,
    citizensWin,
    undercoverWin,
    isGameOver,
  };
}
