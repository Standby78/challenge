export type QuoteData = {
    author: string;
    quote: string;
    id: string;
};

export type ChangeFunction = {
    quoteData: string | boolean;
    key: string;
    id?: string;
    editing?: boolean;
};

export interface Quote {
    id: string;
    author: string;
    quote: string;
    [key: string]: string | boolean;
}

export type QuotesResponse = Quote[];
