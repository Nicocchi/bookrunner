import { useState } from "react";
// import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import axios from "../../utils/axios.config"

function AddAuthor() {
  const [name, setName] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(`/authors`, {
        name,
      }, {
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then((res: any) => {
        console.log(res.data);
      })
      .catch((err: any) => {
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
