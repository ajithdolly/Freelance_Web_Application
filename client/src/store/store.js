import {configureStore} from "@reduxjs/toolkit"
import logger from 'redux-logger';

import { rootReducer } from "./rootReducer";

const middleWares = [logger];


export const store = configureStore({
    reducer : rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleWares),
})