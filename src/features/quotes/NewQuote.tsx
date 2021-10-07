import React from 'react';

import { QuoteChild } from './QuoteChild';
import { useAddQuoteMutation } from './quotesApi';

export function NewQuote() {
    const [addQuote] = useAddQuoteMutation();
    return <QuoteChild quoteData={{ quote: '', author: '', id: '' }} apiHandler={addQuote} />;
}
