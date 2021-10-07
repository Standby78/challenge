import React from 'react';
import { useDispatch } from 'react-redux';

import { showEditQuote, setQuoteData } from './quotesSlice';
import { useDeleteQuoteMutation } from './quotesApi';

import { QuotesProps } from './Quotes.types';
import { Quote } from '../../App.types';
import styles from './Quotes.module.css';

import { QUOTES_PER_PAGE } from '../../constants';

export function Quotes({ data, isError, isLoading, page }: QuotesProps) {
    const dispatch = useDispatch();
    const [deleteQuote] = useDeleteQuoteMutation();

    if (isError) return <div> Error while accessing data</div>;

    if (isLoading) return <div>Loading...</div>;

    const pageIndex = page * QUOTES_PER_PAGE;

    const quotesList = data
        .map((quote: Quote, index: number) => (
            <div key={`quote-${index}`} className={styles.quoteWrapper}>
                <div className={styles.quoteBox}>
                    <span className={styles.author}>From: {quote.author}</span>
                    <button
                        type="button"
                        className={styles.deleteQuote}
                        onClick={() => deleteQuote(quote.id)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            aria-labelledby="title"
                            aria-describedby="desc"
                            role="img"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                            <title>Exit</title>
                            <desc>A solid styled icon from Orion Icon Library.</desc>
                            <path
                                data-name="layer1"
                                fill="#202020"
                                fillOpacity="0.35"
                                d="M51 17.25L46.75 13 32 27.75 17.25 13 13 17.25 27.75 32 13 46.75 17.25 51 32 36.25 46.75 51 51 46.75 36.25 32 51 17.25z"
                            ></path>
                        </svg>
                    </button>
                    <blockquote>{quote.quote}</blockquote>
                    <button
                        type="button"
                        className={styles.editQuote}
                        onClick={() => {
                            dispatch(showEditQuote());
                            dispatch(setQuoteData(quote));
                        }}
                    >
                        <svg
                            viewBox="0 0 64 64"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-labelledby="title"
                            aria-describedby="desc"
                            role="img"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                            <title>Edit Button</title>
                            <desc>A line styled icon from Orion Icon Library.</desc>
                            <path
                                strokeWidth="2"
                                strokeMiterlimit="10"
                                stroke="#202020"
                                fill="none"
                                strokeOpacity="0.35"
                                d="M44.889 26.138l1.882-1.883c1.941-1.94 1.439-4.584-.5-6.524s-4.584-2.442-6.525-.5l-1.882 1.883"
                                data-name="layer2"
                            ></path>
                            <path
                                d="M41.814 29.212l3.075-3.074-7.027-7.027-3.074 3.074M18.164 38.809l7.026 7.026"
                                strokeWidth="2"
                                strokeMiterlimit="10"
                                stroke="#202020"
                                fill="none"
                                strokeOpacity="0.35"
                                data-name="layer2"
                            ></path>
                            <circle
                                strokeWidth="2"
                                strokeMiterlimit="10"
                                stroke="#202020"
                                strokeOpacity="0.35"
                                fill="none"
                                r="30"
                                cy="32"
                                cx="32"
                                data-name="layer1"
                            ></circle>
                            <path
                                d="M25.19 45.835l16.624-16.623-7.026-7.027-16.624 16.624L16 47.999l9.19-2.164z"
                                strokeWidth="2"
                                strokeMiterlimit="10"
                                stroke="#202020"
                                strokeOpacity="0.35"
                                fill="none"
                                data-name="layer2"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        ))
        .slice(pageIndex, pageIndex + QUOTES_PER_PAGE);
    return <div className={styles.quotesWrapper}>{quotesList}</div>;
}
