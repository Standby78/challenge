import React, { useState } from 'react';
import styles from './QuoteChild.module.css';
import { Quote } from '../../App.types';

export function QuoteChild({
    quoteData,
    setVisible,
    apiHandler
}: {
    quoteData: Quote;
    setVisible: (visible: boolean) => void;
    apiHandler: ({ author, quote }: Quote) => void;
}) {
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
                        rows={5}
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
                        onClick={() => setVisible(false)}
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
                                setVisible(false);
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
