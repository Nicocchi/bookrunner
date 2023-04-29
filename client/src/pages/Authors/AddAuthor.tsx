import { useState } from "react";
import axios from "axios";

function AddAuthor() {
  const [name, setName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/authors", {
        name,
      }, {
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <button onClick={onSubmit}>submit</button>
      </form>
    </>
  );
}

export default AddAuthor;
