import React from 'react';

import { QuoteChild } from './QuoteChild';
import { useUpdateQuoteMutation, useGetQuoteQuery } from './quotesApi';
import { QuoteData } from '../../App.types';

type NewQuoteProps = {
    quoteData: QuoteData;
};
export function EditQuote({ quoteData }: NewQuoteProps) {
    const { data } = useGetQuoteQuery(quoteData.id);
    const [updateQuote] = useUpdateQuoteMutation();

    if (typeof data === 'undefined') return null;
    return (
        <>
            <QuoteChild quoteData={data} apiHandler={updateQuote} />
        </>
    );
}
