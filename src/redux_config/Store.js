/* eslint-disable import/no-anonymous-default-export */
import backend_reducer from './reducers/Backend_reducer.js';
import frontend_reducer from './reducers/Frontend_reducer.js';
import overall_reducer from './reducers/Overall_reducer.js';
import { createStore , combineReducers }  from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// const persistConfig = {
//     key: 'root',
//     storage,
//   }

let rootReducer =  combineReducers({ frontend : frontend_reducer , backend : backend_reducer , overall : overall_reducer})
// const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(rootReducer)
// let persistor = persistStore(store)

export default store

// export default () => {
//     let store = createStore(persistReducer)
//     // let persistor = persistStore(store)
//     return store
//     // return { store, persistor }
//   }