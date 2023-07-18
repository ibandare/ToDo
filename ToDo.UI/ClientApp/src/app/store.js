import { configureStore } from '@reduxjs/toolkit'
import { api } from './services/api';
import toastsReducer from '../features/toasts/toastsSlice';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        toasts: toastsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})
