import { useEffect, useState } from "react";
// import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import axios from "../../utils/axios.config"

function Authors() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [newName, setNewName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [authorID, setAuthorID] = useState("");

  useEffect(() => {
    axios
      .get("/authors", {})
      .then((res: any) => {
        setAuthors(res.data.authors);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        // always executed/
      });
  }, []);

  const editAuthor = (id: string) => {
    if (isEditing) {
        setAuthorID(id);
    } else {
        setNewName("");
    }
    setIsEditing(!isEditing);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    axios
      .put(
        `/authors/${authorID}`,
        {
          name: newName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: any) => {
        console.log(res.data);
        setNewName("");
        setIsEditing(false);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const deleteAuthor = (e: any) => {
    axios
      .delete(`/authors/${e}`, {
        headers: {
          "Content-Type": "application/json",
        },
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
