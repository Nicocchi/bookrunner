const mockedBooks = [
    {
        "tags": [],
        "_id": "64480d561d88a98b8f5e2dfa",
        "title": "あっ、まるい",
        "description": "「ぼくのボールぼーるがない！」犬いぬは、大好だいすきな丸まるいボールぼーるを探さがしに町まちへ出でかけます。「あっ、まるい」と丸まるいものを見みつけて近ちかづくと・・・。 NPO多言語たげんご多読たどくの会員かいいんが読よみもの作成さくせいワークわーくショップしょっぷで作つくりました。",
        "publishDate": "2023-03-01T00:00:00.000Z",
        "pageCount": 17,
        "coverImage": "2ada56947dc3dfc4c9e047c4aff5835e",
        "author": [
            {
                "_id": "644ab176502b0c5b052e4433",
                "name": "Ikeda Akitsu",
                "createdAt": "2023-04-27T17:31:34.853Z",
                "updatedAt": "2023-04-27T17:31:34.853Z",
                "__v": 0
            },
            {
                "_id": "644ab191502b0c5b052e4436",
                "name": "Tanaka Mami",
                "createdAt": "2023-04-27T17:32:01.113Z",
                "updatedAt": "2023-04-27T17:32:01.113Z",
                "__v": 0
            },
            {
                "_id": "644ab1a1502b0c5b052e4439",
                "name": "Tanaka Ruriko",
                "createdAt": "2023-04-27T17:32:17.822Z",
                "updatedAt": "2023-04-27T17:32:17.822Z",
                "__v": 0
            },
            {
                "_id": "644ab1bb502b0c5b052e443c",
                "name": "Nakagoshi Naomi",
                "createdAt": "2023-04-27T17:32:43.207Z",
                "updatedAt": "2023-04-27T17:32:43.207Z",
                "__v": 0
            }
        ],
        "createdAt": "2023-04-25T17:26:46.522Z",
        "updatedAt": "2023-04-28T14:42:08.429Z",
        "__v": 1,
        "bookType": {
            "_id": "644ab0d7502b0c5b052e441f",
            "name": "picture book",
            "createdAt": "2023-04-27T17:28:55.824Z",
            "updatedAt": "2023-04-27T17:28:55.824Z",
            "__v": 0
        },
        "file": "392e79679ccbdd0ea68833fe17ff288a.pdf",
        "public": true,
        "mimetype": "application/pdf",
        "artist": []
    }
]

export const getAllBooks = async () => {
    const data = {
        data: {books: mockedBooks}
    }
    
    return data;
};

export const getBookByID = async (id: string | undefined) => {
  const books = mockedBooks.filter((u) => u._id === id);
  const data = {
    data: {book: books[0]}
}

return data;
};


// export default getAllBooks;