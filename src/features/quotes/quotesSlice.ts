import { createSlice } from '@reduxjs/toolkit';

export const quotesSlice = createSlice({
    name: 'blur',
    initialState: {
        newQuoteVisible: false,
        editQuoteVisible: false,
        quote: { author: '', quote: '', id: '' }
    },
    reducers: {
        showNewQuote: (state) => {
            state.newQuoteVisible = true;
        },
        showEditQuote: (state) => {
            state.editQuoteVisible = true;
        },
        hide: (state) => {
            state.editQuoteVisible = false;
            state.newQuoteVisible = false;
        },
        setQuoteData: (state, action) => {
            state.quote = action.payload;
        }
    }
});

export const { showNewQuote, showEditQuote, hide, setQuoteData } = quotesSlice.actions;

export default quotesSlice.reducer;
