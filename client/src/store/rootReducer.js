import { combineReducers } from "@reduxjs/toolkit";
import { gigReducer } from "./gig/gig.slice";

export const rootReducer = combineReducers({
    gig : gigReducer,
})