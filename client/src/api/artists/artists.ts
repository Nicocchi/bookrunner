const mockedArtists = [
    {
        "_id": "644bcf4ea62e8627001fed5b",
        "name": "moso",
        "createdAt": "2023-04-28T13:51:10.899Z",
        "updatedAt": "2023-04-28T13:51:10.899Z",
        "__v": 0
    }
];

export const getAllArtists = async () => mockedArtists;

export const getAuthorById = async (id: string) => {
  const artist = mockedArtists.filter((u) => u._id === id);
  return artist[0];
};


export default getAllArtists;