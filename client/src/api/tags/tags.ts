const tags = [{
    "_id": "644973fe54c436d52366f2b7",
    "name": "horror",
    "createdAt": "2023-04-26T18:56:30.511Z",
    "updatedAt": "2023-04-26T18:56:30.511Z",
    "__v": 0
}];

export const getAllTags = async () => tags;

export const getAuthorById = async (id: string) => {
  const tag = tags.filter((u) => u._id === id);
  return tag[0];
};


export default getAllTags;