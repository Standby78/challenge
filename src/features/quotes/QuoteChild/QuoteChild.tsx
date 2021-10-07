import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { hide } from '../quotesSlice';
import styles from './QuoteChild.module.css';
import { QuoteData } from '../../../App.types';

export function QuoteChild({
    quoteData,
    apiHandler
}: {
    quoteData: QuoteData;
    apiHandler: ({ author, quote }: QuoteData) => void;
}) {
    const dispatch = useDispatch();
    const [status, setStatus] = useState('');
    const [newQuoteData, setNewQuoteData] = useState(quoteData);

    const changeHandler = ({ value, key }: { value: string; key: string }) => {
        setNewQuoteData({ ...newQuoteData, [key]: value });
    };
    const { author, quote } = newQuoteData;
    return (
        <div className={styles.overlay}>
            <div className={styles.editQuoteHolder}>
                <span>{newQuoteData.id ? 'Edit Quote' : 'New Quote'}</span>
                {status && <p>{status}</p>}
                <form>
                    <label className={styles.label}>Author: </label>{' '}
                    <input
                        className={styles.input}
                        type="text"
                        value={author}
                        onChange={(e) =>
                            changeHandler({
                                value: e.currentTarget.value,
                                key: 'author'
                            })
                        }
                    />
                    <label className={styles.label}>Quote: </label>{' '}
                    <textarea
                        className={styles.input}
                        value={quote}
                        rows={3}
                        onChange={(e) =>
                            changeHandler({
                                value: e.currentTarget.value,
                                key: 'quote'
                            })
                        }
                    />
                    <button
                        type="button"
                        className={styles.cancel}
                        onClick={() => {
                            console.log('hello');
                            dispatch(hide());
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className={styles.submit}
                        onClick={async () => {
                            if (!author || !quote) {
                                setStatus('Please enter both author and quote!');
                                return;
                            }
                            try {
                                await apiHandler(newQuoteData);
                            } catch {
                                console.log('error while saving data');
                            } finally {
                                dispatch(hide());
                            }
                        }}
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}
