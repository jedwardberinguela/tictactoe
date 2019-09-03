import {
  TIC_TAC_TOE_MODAL_OPEN,
  TIC_TAC_TOE_MODAL_CLOSE
} from "../actions/Types";

const initialState = { open: false };

export default (state = { ...initialState }, { type, payload }) => {
  switch (type) {
    
    case TIC_TAC_TOE_MODAL_OPEN:
      return { ...state, open: true };
    case TIC_TAC_TOE_MODAL_CLOSE:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
};
