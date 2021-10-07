import React, { useState, useEffect } from 'react';

import { useGetQuotesQuery } from './features/quotes/quotesApi';

import { Quotes } from './features/quotes/Quotes';
import { NewQuote } from './features/quotes/NewQuote';
import { QUOTES_PER_PAGE, PAGE_BUTTONS } from './constants';

import './App.css';

function App() {
    const { data = [], isError, isLoading } = useGetQuotesQuery();

    const [newQuoteVisible, setNewQuoteVisible] = useState(false);
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
            <div className={`holder${newQuoteVisible ? 'blur' : ''}`}>
                <header className="App-header">
                    <h1>All Quotes</h1>
                    <button className="add-quote-button" onClick={() => setNewQuoteVisible(true)}>
                        +
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

            {newQuoteVisible && <NewQuote setVisible={setNewQuoteVisible} />}
        </div>
    );
}

export default App;
