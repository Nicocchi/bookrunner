const formats = [
    {
        "_id": "644973de54c436d52366f2b7",
        "name": "light novel",
        "createdAt": "2023-04-26T18:56:30.511Z",
        "updatedAt": "2023-04-26T18:56:30.511Z",
        "__v": 0
    },
    {
        "_id": "64493fc3fcb7c48f64a579ef",
        "name": "manga",
        "createdAt": "2023-04-26T15:14:11.016Z",
        "updatedAt": "2023-04-26T18:31:29.801Z",
        "__v": 0
    },
    {
        "_id": "644973e654c436d52366f2be",
        "name": "novel",
        "createdAt": "2023-04-26T18:56:38.416Z",
        "updatedAt": "2023-04-26T18:56:38.416Z",
        "__v": 0
    },
    {
        "_id": "644ab0d7502b0c5b052e441f",
        "name": "picture book",
        "createdAt": "2023-04-27T17:28:55.824Z",
        "updatedAt": "2023-04-27T17:28:55.824Z",
        "__v": 0
    }
];

export const getAllFormats = async () => formats;

export const getAuthorById = async (id: string) => {
  const format = formats.filter((u) => u._id === id);
  return format[0];
};


export default getAllFormats;