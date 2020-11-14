import { combineReducers } from "redux";
import jokerGameReducer from "./redux/joker-game/joker-game.reducer";

const rootReducer = {
    jokerGame: jokerGameReducer,
}

export default combineReducers(rootReducer);