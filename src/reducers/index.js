import { combineReducers } from "redux";

import { movieReducer } from "./movies";

export const rootReducer = combineReducers({
    movies: movieReducer
})
