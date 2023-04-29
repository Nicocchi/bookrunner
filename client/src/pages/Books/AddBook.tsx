import { useEffect, useState } from "react";
import axios from "axios";

function AddBooks() {
  const [authors, setAuthors] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishDate, setPublishDate] = useState(new Date());
  const [pageCount, setPageCount] = useState(1);
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/authors", {})
      .then((res) => {
        console.log(res.data);
        setAuthors(res.data.authors);
        setAuthor(res.data.authors[0]._id)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({
        title,
        author,
        publishDate,
        pageCount,
        description,
        coverImage
    })
    axios
      .post("http://localhost:5000/books", {
        title,
        author,
        publishDate,
        pageCount,
        description,
        cover: coverImage,
      }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const setAuth = (e) => {
    console.log("AUTH", e);
  }

  return (
    <>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        />
        <select name="author" value={author} onChange={(e) => setAuth(e)}>
          {authors.map((author) => (
            <option value={author?._id}>{author?.name}</option>
          ))}
        </select>
        <input
          type="date"
          name="publishDate"
          placeholder="publishDate"
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
        />
        <input
          type="number"
          name="pageCount"
          min="1"
          placeholder="pageCount"
          value={pageCount}
          onChange={(e) => setPageCount(e.target.value)}
        />
        <textarea
          name="description"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          name="cover"
          placeholder="coverImage"
          onChange={(e) => setCoverImage(e.target.files[0])}
        />
        <button onClick={onSubmit}>submit</button>
      </form>
    </>
  );
}

export default AddBooks;
