import { QuoteData } from '../../App.types';
export type QuotesProps = {
    data: QuoteData[];
    isError: boolean;
    isLoading: boolean;
    page: number;
};
