const genres = [
    {
        "_id": "644d237e8a14a0a6744981fe",
        "name": "Action",
        "createdAt": "2023-04-29T14:02:38.069Z",
        "updatedAt": "2023-04-29T14:02:38.069Z",
        "__v": 0
    },
    {
        "_id": "644d23808a14a0a674498201",
        "name": "Adventure",
        "createdAt": "2023-04-29T14:02:40.221Z",
        "updatedAt": "2023-04-29T14:02:40.221Z",
        "__v": 0
    },
    {
        "_id": "644d23828a14a0a674498204",
        "name": "Comedy",
        "createdAt": "2023-04-29T14:02:42.070Z",
        "updatedAt": "2023-04-29T14:02:42.070Z",
        "__v": 0
    },
    {
        "_id": "644d23838a14a0a674498207",
        "name": "Detective",
        "createdAt": "2023-04-29T14:02:43.789Z",
        "updatedAt": "2023-04-29T14:02:43.789Z",
        "__v": 0
    },
    {
        "_id": "644d23858a14a0a67449820a",
        "name": "Drama",
        "createdAt": "2023-04-29T14:02:45.133Z",
        "updatedAt": "2023-04-29T14:02:45.133Z",
        "__v": 0
    },
    {
        "_id": "644d23868a14a0a67449820d",
        "name": "Ecchi",
        "createdAt": "2023-04-29T14:02:46.453Z",
        "updatedAt": "2023-04-29T14:02:46.453Z",
        "__v": 0
    },
    {
        "_id": "644d238b8a14a0a674498210",
        "name": "Fantasy",
        "createdAt": "2023-04-29T14:02:51.733Z",
        "updatedAt": "2023-04-29T14:02:51.733Z",
        "__v": 0
    },
    {
        "_id": "644d238d8a14a0a674498213",
        "name": "Horror",
        "createdAt": "2023-04-29T14:02:53.156Z",
        "updatedAt": "2023-04-29T14:02:53.156Z",
        "__v": 0
    },
    {
        "_id": "644d238f8a14a0a674498216",
        "name": "Mahou Shoujo",
        "createdAt": "2023-04-29T14:02:55.589Z",
        "updatedAt": "2023-04-29T14:02:55.589Z",
        "__v": 0
    },
    {
        "_id": "644d23918a14a0a674498219",
        "name": "Mecha",
        "createdAt": "2023-04-29T14:02:57.435Z",
        "updatedAt": "2023-04-29T14:02:57.435Z",
        "__v": 0
    },
    {
        "_id": "644d23928a14a0a67449821c",
        "name": "Music",
        "createdAt": "2023-04-29T14:02:58.804Z",
        "updatedAt": "2023-04-29T14:02:58.804Z",
        "__v": 0
    },
    {
        "_id": "644d23948a14a0a67449821f",
        "name": "Mystery",
        "createdAt": "2023-04-29T14:03:00.587Z",
        "updatedAt": "2023-04-29T14:03:00.587Z",
        "__v": 0
    },
    {
        "_id": "644d23998a14a0a674498222",
        "name": "Psychological",
        "createdAt": "2023-04-29T14:03:05.954Z",
        "updatedAt": "2023-04-29T14:03:05.954Z",
        "__v": 0
    },
    {
        "_id": "644d239c8a14a0a674498225",
        "name": "Romance",
        "createdAt": "2023-04-29T14:03:08.140Z",
        "updatedAt": "2023-04-29T14:03:08.140Z",
        "__v": 0
    },
    {
        "_id": "644d239e8a14a0a674498228",
        "name": "Sci-Fi",
        "createdAt": "2023-04-29T14:03:10.377Z",
        "updatedAt": "2023-04-29T14:03:10.377Z",
        "__v": 0
    },
    {
        "_id": "644d23a38a14a0a67449822b",
        "name": "Slice of Life",
        "createdAt": "2023-04-29T14:03:15.189Z",
        "updatedAt": "2023-04-29T14:03:15.189Z",
        "__v": 0
    },
    {
        "_id": "644d23a48a14a0a67449822e",
        "name": "Sports",
        "createdAt": "2023-04-29T14:03:16.360Z",
        "updatedAt": "2023-04-29T14:03:16.360Z",
        "__v": 0
    },
    {
        "_id": "644d23a68a14a0a674498231",
        "name": "Supernatural",
        "createdAt": "2023-04-29T14:03:18.791Z",
        "updatedAt": "2023-04-29T14:03:18.791Z",
        "__v": 0
    },
    {
        "_id": "644d23aa8a14a0a674498234",
        "name": "Thriller",
        "createdAt": "2023-04-29T14:03:22.082Z",
        "updatedAt": "2023-04-29T14:03:22.082Z",
        "__v": 0
    }
];

export const getAllGenres = async () => genres;

export const getGenreById = async (id: string) => {
  const genre = genres.filter((u) => u._id === id);
  return genre[0];
};


export default getAllGenres;