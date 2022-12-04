import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import sectionReducer from './sectionSlice'
import errorReducer from './errorSlice'

// Redux Persist
import storage from 'redux-persist/lib/storage'
import {combineReducers} from 'redux'
import {persistedReducer} from 'redux-persist'
import thunk from 'redux-thunk'

// const persistConfig = {
//     key: 'root',
//     storage
// }

// const persistedReducer = persistedReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: {
        user: userReducer,
        section: sectionReducer,
        error: errorReducer
    },
})
