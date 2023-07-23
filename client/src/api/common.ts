import getAllArtists from "./artists/artists";
import getAllAuthors from "./authors/authors";
import getAllFormats from "./formats/formats";
import getAllGenres from "./genres/genres";
import getAllTags from "./tags/tags";

export const getAllDb = async () => {
  let artists = await getAllArtists();
  let authors = await getAllAuthors();
  let formats = await getAllFormats();
  let genres = await getAllGenres();
  let tags = await getAllTags();

  const data = {
    artists,
    authors,
    formats,
    genres,
    tags,
  };

  return { data };
};

export default getAllDb;
