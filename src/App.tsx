import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { useGetQuotesQuery } from './features/quotes/quotesApi';
import { showNewQuote } from './features/quotes/quotesSlice';
import { Quotes } from './features/quotes/Quotes';
import { NewQuote } from './features/quotes/NewQuote';
import { EditQuote } from './features/quotes/EditQuote';
import { QUOTES_PER_PAGE, PAGE_BUTTONS } from './constants';

import './App.css';

function App() {
    const dispatch = useDispatch();
    const { data = [], isError, isLoading } = useGetQuotesQuery();
    const { newQuoteVisible, editQuoteVisible, quote } = useSelector(
        (state: RootState) => state.blur
    );
    const [page, setPage] = useState(0);

    useEffect(() => {
        const pages = Math.ceil(data.length / QUOTES_PER_PAGE);
        const lastPage = pages - 2 < 0 ? 0 : pages - 1;
        if (page >= pages) setPage(lastPage);
    }, [data]);
    const pages = Math.ceil(data.length / QUOTES_PER_PAGE);

    let maxPageOffset = page + PAGE_BUTTONS > pages ? pages - PAGE_BUTTONS : page;
    if (maxPageOffset < 0) maxPageOffset = 0;
    const pageButtons = Array.from(Array(pages))
        .map((item, index) => (
            <button
                className={`Pagination-button${page === index ? ' active' : ''}`}
                type="button"
                key={`pbut-${index}`}
                onClick={() => setPage(index)}
            >
                {index + 1}
            </button>
        ))
        .slice(maxPageOffset, maxPageOffset + PAGE_BUTTONS);

    return (
        <div className="App">
            <div className={`holder${newQuoteVisible || editQuoteVisible ? ' blur' : ''}`}>
                <header className="App-header">
                    <h1>All Quotes</h1>
                    <button className="add-quote-button" onClick={() => dispatch(showNewQuote())}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            aria-labelledby="title"
                            aria-describedby="desc"
                            role="img"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                            <circle
                                data-name="layer2"
                                cx="32"
                                cy="32"
                                r="30"
                                fill="none"
                                stroke="#202020"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            ></circle>
                            <path
                                data-name="layer1"
                                fill="none"
                                stroke="#202020"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                                d="M32 16v32m16-16H16"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            ></path>
                        </svg>
                    </button>
                </header>
                <Quotes data={data} isError={isError} isLoading={isLoading} page={page} />
                <div className="Pagination">
                    <button
                        className="Pagination-button"
                        disabled={page - 1 < 0}
                        type="button"
                        onClick={() => setPage(page - 1)}
                    >
                        ←
                    </button>
                    {pageButtons}
                    <button
                        className="Pagination-button"
                        disabled={page + 1 === pages}
                        type="button"
                        onClick={() => setPage(page + 1)}
                    >
                        →
                    </button>
                </div>
            </div>

            {newQuoteVisible && <NewQuote />}
            {editQuoteVisible && <EditQuote quoteData={quote} />}
        </div>
    );
}

export default App;
