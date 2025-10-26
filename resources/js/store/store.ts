// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { localesSlice } from "./features/locales-slice";

const localesPersistConfig = {
    key: "locales",
    storage,
};

const localesPersistedReducer = persistReducer(localesPersistConfig, localesSlice.reducer);

export const store = configureStore({
    reducer: {
        locales: localesPersistedReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);
