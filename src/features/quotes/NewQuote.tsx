import React from 'react';

import { QuoteChild } from './QuoteChild';
import { useAddQuoteMutation } from './quotesApi';

type NewQuoteProps = {
    setVisible: (visible: boolean) => void;
};
export function NewQuote({ setVisible }: NewQuoteProps) {
    const [addQuote] = useAddQuoteMutation();
    return (
        <QuoteChild
            quoteData={{ quote: '', author: '', id: '' }}
            setVisible={setVisible}
            apiHandler={addQuote}
        />
    );
}
