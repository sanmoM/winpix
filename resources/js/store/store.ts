// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { localesSlice } from "./features/locales-slice";
import { wishlistSlice } from "./features/wishlist";

const localesPersistConfig = {
    key: "locales",
    storage,
};
const wishlistPersistConfig = {
    key: "wishlist",
    storage,
};

const localesPersistedReducer = persistReducer(localesPersistConfig, localesSlice.reducer);
const wishlistPersistedReducer = persistReducer(wishlistPersistConfig, wishlistSlice.reducer);

export const store = configureStore({
    reducer: {
        locales: localesPersistedReducer,
        wishlist: wishlistPersistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);
