import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = false;
const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.MODAL:
      return action.payload;

    default:
      return state;
  }
};
export default themeReducer;
