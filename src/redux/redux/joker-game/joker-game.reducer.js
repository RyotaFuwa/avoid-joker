import JokerGameActionType from "./joker-game.actionType";

const INIT_STATE = {
    numCards: 16,
    cheatingSystem: "default",
}

const jokerGameReducer = (state=INIT_STATE, action) => {
    switch(action.type) {
        case JokerGameActionType.SET_NUM_CARDS:
            return {...state, numCards: action.payload};
        case JokerGameActionType.SET_CHEATING_SYSTEM:
            return {...state, cheatingSystem: action.payload};
        default:
            return state;
    }
}

export default jokerGameReducer;