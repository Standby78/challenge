import { Quote } from '../../App.types';
export type QuotesProps = {
    data: Quote[];
    isError: boolean;
    isLoading: boolean;
    page: number;
};
