import JokerGameActionTypes from "./joker-game.actionType";

export const setNumCards = numCards => ({
    type: JokerGameActionTypes.SET_NUM_CARDS,
    payload: numCards,
})

export const setCheatingSystem = cheatingSystem => ({
    type: JokerGameActionTypes.SET_CHEATING_SYSTEM,
    payload: cheatingSystem,
})