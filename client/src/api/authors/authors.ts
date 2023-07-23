const authors = [
    {
        "_id": "644b91731017395a723b793b",
        "name": "Harumi Madoka",
        "createdAt": "2023-04-28T09:27:15.428Z",
        "updatedAt": "2023-04-28T09:27:15.428Z",
        "__v": 0
    },
    {
        "_id": "644ab176502b0c5b052e4433",
        "name": "Ikeda Akitsu",
        "createdAt": "2023-04-27T17:31:34.853Z",
        "updatedAt": "2023-04-27T17:31:34.853Z",
        "__v": 0
    },
    {
        "_id": "644ab1bb502b0c5b052e443c",
        "name": "Nakagoshi Naomi",
        "createdAt": "2023-04-27T17:32:43.207Z",
        "updatedAt": "2023-04-27T17:32:43.207Z",
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
    }
];

export const getAllAuthors = async () => authors;

export const getAuthorById = async (id: string) => {
  const author = authors.filter((u) => u._id === id);
  return author[0];
};


export default getAllAuthors;