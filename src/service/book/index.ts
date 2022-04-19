import axios from "axios";

const axiosInstance = axios.create();

const isDevelopment = process.env.NODE_ENV === 'development';

interface IBookDetails {
    id: string;
    volumeInfo: {
        title: string;
        subtitle?: string;
        authors: string[];
        language: string;
        pageCount: number;
        imageLinks?: {
            thumbnail: string;
        }
        averageRating: number;
        publishedDate: string;
        publisher: string;
        infoLink: string;
        [key: string]: any;
    }
    saleInfo: {
        buyLink: string;
        [key: string]: any;
    }
    [key: string]: any

}

interface IBooksResult {
    data: IBookDetails[];
    total: number;
}

export const getAllBooks = async (keyword?: string, startIndex?: number, maxResults?: number) => {
    try {
        const { data } = await axiosInstance.get(isDevelopment ? 'http://localhost:4000/api/v1/book/all' : '/api/v1/book/all', {
            params: {
                keyword,
                startIndex,
                maxResults
            }
        });
        return data as IBooksResult;
    } catch (err: any) {
        throw Error(err.message)
    }
}

export const getBookDetailsById = async (id: string) => {
    try {
        const { data } = await axiosInstance.get(isDevelopment ? `http://localhost:4000/api/v1/book/details/${id}` : `/api/v1/book/details/${id}`)
        return data as { data: IBookDetails, total: number }
    } catch (err: any) {
        throw Error(err.message)

    }
}