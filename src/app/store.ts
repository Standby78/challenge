import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '../features/quotes/quotesApi';
import quotesSlice from '../features/quotes/quotesSlice';

export const store = configureStore({
    reducer: { [api.reducerPath]: api.reducer, blur: quotesSlice },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
