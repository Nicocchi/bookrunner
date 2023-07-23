import { createContext, useState } from 'react';

export const booksContext = createContext<any>(null);

const BooksProvider = (props: any) => {
    const [books, setBooks] = useState();

    return (
        <booksContext.Provider value={[books, setBooks]}>{props.children}</booksContext.Provider>
    )
}

export default BooksProvider;