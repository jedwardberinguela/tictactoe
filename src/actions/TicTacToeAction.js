import { TIC_TAC_TOE_MODAL_OPEN, TIC_TAC_TOE_MODAL_CLOSE } from "./Types";

export const showTicTacToeModal = () => ({
  type: TIC_TAC_TOE_MODAL_OPEN
});

export const closeTicTacToeModal = () => ({
  type: TIC_TAC_TOE_MODAL_CLOSE
});