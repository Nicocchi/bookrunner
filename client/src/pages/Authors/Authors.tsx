import { useEffect, useState } from "react";
import axios from "axios";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [newName, setNewName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [authorID, setAuthorID] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/authors", {})
      .then((res) => {
        setAuthors(res.data.authors);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // always executed/
      });
  }, []);

  const editAuthor = (id) => {
    if (isEditing) {
        setAuthorID(id);
    } else {
        setNewName("");
    }
    setIsEditing(!isEditing);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/authors/${authorID}`,
        {
          name: newName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setNewName("");
        setIsEditing(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteAuthor = (e) => {
    axios
      .delete(`http://localhost:5000/authors/${e}`, {
        headers: {
          "Content-Type": "application/json",
        },
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
      <div>
        {authors.map((b, i) => (
          <div>
            <p key={i}>{b?.name}</p>
            {isEditing && authorID === b?._id ? (
              <div>
                <input
                  name="newName"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button onClick={onSubmit}>submit</button>
              </div>
            ) : null}
            <button onClick={() => editAuthor(b?._id)}>
              {isEditing ? "cancel" : "edit"}
            </button>
            <button onClick={() => deleteAuthor(b?._id)}>delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Authors;
