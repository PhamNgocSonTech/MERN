import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import theme from "./themeReducer";
import profile from "./profileReducer";
import status from "./statusReducer";


export default combineReducers({
  auth,
  alert,
  theme,
  profile,
  status
});
