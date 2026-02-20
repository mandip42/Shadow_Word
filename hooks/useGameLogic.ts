import { useCallback } from 'react';
import { useGameStore } from '@/store/gameStore';
import {
  getAlivePlayers,
  checkCitizensWin,
  checkSpyWin,
} from '@/utils/winConditions';

export function useGameLogic() {
  const players = useGameStore((s) => s.players);
  const gamePhase = useGameStore((s) => s.gamePhase);

  const alivePlayers = useCallback(() => getAlivePlayers(players), [players]);

  const citizensWin = useCallback(() => checkCitizensWin(players), [players]);

  const spyWin = useCallback(() => checkSpyWin(players), [players]);

  const isGameOver = gamePhase === 'ended';

  return {
    alivePlayers,
    citizensWin,
    spyWin,
    isGameOver,
  };
}
