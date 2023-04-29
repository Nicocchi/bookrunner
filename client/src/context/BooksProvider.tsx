import { createContext, useState } from 'react';

export const booksContext = createContext();

const BooksProvider = (props) => {
    const [books, setBooks] = useState();

    return (
        <booksContext.Provider value={[books, setBooks]}>{props.children}</booksContext.Provider>
    )
}

export default BooksProvider;