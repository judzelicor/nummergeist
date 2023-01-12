import {
    createStore,
    combineReducers
} from "redux";
import {
    gameStateReducer
} from "../reducers";

const store = createStore(combineReducers({
    gameState: gameStateReducer
}));

export default store;