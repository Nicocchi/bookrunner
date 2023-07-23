import { useEffect, useState } from "react";
import axios from "axios";
import { Text, Card, Button, Input } from "@nextui-org/react";
import { Close, Pencil, PeopleDeleteOne, Save } from "@icon-park/react";

function Settings() {
  const [authors, setAuthors] = useState([]);
  const [bookTypes, setBookTypes] = useState([]);
  const [artists, setArtists] = useState([]);
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [tagName, setTagName] = useState("");
  const [genreName, setGenreName] = useState("");
  const [typeName, setTypeName] = useState("");
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState("");
  const [fieldID, setFieldID] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/all", {})
      .then((res) => {
        setAuthors(res.data.authors);
        setBookTypes(res.data.booktypes);
        setArtists(res.data.artists);
        setTags(res.data.tags);
        setGenres(res.data.genres);

        setVisible(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const closeHandler = () => {
    setVisible(false);
  };

  const addAuthor = () => {
    axios
      .post(
        `http://localhost:5000/authors`,
        {
          name: authorName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setAuthorName("");
        setAuthors(res.data.authors);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addBookType = () => {
    axios
      .post(
        `http://localhost:5000/book-types`,
        {
          name: typeName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setTypeName("");
        setBookTypes(res.data.bookTypes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addArtist = () => {
    axios
      .post(
        `http://localhost:5000/artists`,
        {
          name: artistName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setArtistName("");
        setArtists(res.data.artists);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addTag = () => {
    axios
      .post(
        `http://localhost:5000/tags`,
        {
          name: tagName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setTagName("");
        setTags(res.data.tags);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addGenre = () => {
    axios
      .post(
        `http://localhost:5000/genres`,
        {
          name: genreName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setGenreName("");
        setGenres(res.data.genres);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const edit = (id) => {
    setFieldID(id);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setFieldID("");
    setIsEditing(false);
  };

  const updateAuthor = (id) => {
    if (name !== null || name !== "") {
      axios
        .put(
          `http://localhost:5000/authors/${id}`,
          {
            name,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setAuthors(res.data.authors);
          setIsEditing(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const updateBookType = (id) => {
    if (name !== null || name !== "") {
      axios
        .put(
          `http://localhost:5000/book-types/${id}`,
          {
            name,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setBookTypes(res.data.bookTypes);
          setIsEditing(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const updateArtist = (id) => {
    if (name !== null || name !== "") {
      axios
        .put(
          `http://localhost:5000/artists/${id}`,
          {
            name,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setArtists(res.data.artists);
          setIsEditing(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const updateTag = (id) => {
    if (name !== null || name !== "") {
      axios
        .put(
          `http://localhost:5000/tags/${id}`,
          {
            name,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setTags(res.data.tags);
          setIsEditing(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const updateGenre = (id) => {
    if (name !== null || name !== "") {
      axios
        .put(
          `http://localhost:5000/genres/${id}`,
          {
            name,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setGenres(res.data.genres);
          setIsEditing(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const deleteBookType = (id) => {
    axios
      .delete(`http://localhost:5000/book-types/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setBookTypes(res.data.bookTypes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteAuthor = (id) => {
    axios
      .delete(`http://localhost:5000/authors/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAuthors(res.data.authors);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteArtist = (id) => {
    axios
      .delete(`http://localhost:5000/artists/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setArtists(res.data.artists);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteTag = (id) => {
    axios
      .delete(`http://localhost:5000/tags/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTags(res.data.tags);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteGenre = (id) => {
    axios
      .delete(`http://localhost:5000/genres/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setGenres(res.data.genres);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onKeyPress = (e, type) => {
    if (e.key === "Enter") {
      switch (type) {
        case "tag":
          addTag();
          break;
        case "artist":
          addArtist();
          break;
        case "format":
          addBookType();
          break;
        case "author":
          addAuthor;
          break;
        case "genre":
          addGenre();
          break;
        default:
          return;
      }
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          padding: "10px",
          gap: 10,
        }}
      >
          {/** Authors */}
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text h2>Authors</Text>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <Input
                value={authorName}
                aria-label="Author Name"
                placeholder="Name"
                onChange={(e) => setAuthorName(e.target.value)}
                onKeyDown={(e) => onKeyPress(e, "author")}
              />
              <Button onPress={addAuthor} auto>
                Add
              </Button>
            </div>
          </div>
          {/** Authors Map */}
          <div style={{display: "flex", flexDirection: "column", overflowY: "auto", height: "640px", padding: "0px 10px"}}>
          {authors.map((author, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <Card css={{ mw: "350px" }} isHoverable variant="bordered">
                <Card.Body
                  css={{
                    display: "flex",
                    gap: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: 332,
                  }}
                >
                  {isEditing && fieldID === author?._id ? (
                    <Input
                      aria-label="Author Name"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      initialValue={author?.name}
                    />
                  ) : (
                    <Text>{author?.name}</Text>
                  )}
                  <div style={{ display: "flex", gap: 10 }}>
                    {isEditing && fieldID === author?._id ? (
                      <Button
                        auto
                        onPress={() => cancelEdit()}
                        icon={<Close size="1.3em" />}
                        css={{
                          backgroundColor: "transparent",
                          color: "#0073f0",
                        }}
                      />
                    ) : (
                      <Button
                        auto
                        onPress={() => edit(author?._id)}
                        icon={<Pencil size="1.3em" />}
                        css={{
                          backgroundColor: "transparent",
                          color: "#0073f0",
                        }}
                      />
                    )}
                    {isEditing && fieldID === author?._id ? (
                      <Button
                        auto
                        color="success"
                        onPress={() => updateAuthor(author?._id)}
                        icon={<Save size="1.3em" />}
                        css={{
                          backgroundColor: "transparent",
                          color: "#00c96a",
                        }}
                      />
                    ) : (
                      <Button
                        color="error"
                        auto
                        onPress={() => deleteAuthor(author?._id)}
                        icon={<PeopleDeleteOne size="1.3em" />}
                        css={{
                          backgroundColor: "transparent",
                          color: "#fd1462",
                        }}
                      />
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
          </div>
        </div>
        {/** Formats */}
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text h2>Formats</Text>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <Input
                aria-label="Format Name"
                value={typeName}
                placeholder="Name"
                onChange={(e) => setTypeName(e.target.value)}
                onKeyDown={(e) => onKeyPress(e, "format")}
              />
              <Button onPress={addBookType} auto>
                Add
              </Button>
            </div>
          </div>
          {/** Format Map*/}
          <div style={{display: "flex", flexDirection: "column", overflowY: "auto", height: "640px", padding: "0px 10px"}}>
          {bookTypes.map((bookType, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <Card css={{ mw: "350px" }} isHoverable variant="bordered">
                <Card.Body
                  css={{
                    display: "flex",
                    gap: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: 332,
                  }}
                >
                  {isEditing && fieldID === bookType?._id ? (
                    <Input
                      aria-label="Format Name"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      initialValue={bookType?.name}
                    />
                  ) : (
                    <Text>{bookType?.name}</Text>
                  )}
                  <div style={{ display: "flex", gap: 10 }}>
                    {isEditing && fieldID === bookType?._id ? (
                      <Button
                        auto
                        onPress={() => cancelEdit()}
                        icon={<Close size="1.3em" />}
                        css={{
                          backgroundColor: "transparent",
                          color: "#0073f0",
                        }}
                      />
                    ) : (
                      <Button
                        auto
                        onPress={() => edit(bookType?._id)}
                        icon={<Pencil size="1.3em" />}
                        css={{
                          backgroundColor: "transparent",
                          color: "#0073f0",
                        }}
                      />
                    )}
                    {isEditing && fieldID === bookType?._id ? (
                      <Button
                        auto
                        color="success"
                        onPress={() => updateBookType(bookType?._id)}
                        icon={<Save size="1.3em" />}
                        css={{
                          backgroundColor: "transparent",
                          color: "#00c96a",
                        }}
                      />
                    ) : (
                      <Button
                        color="error"
                        auto
                        onPress={() => deleteBookType(bookType?._id)}
                        icon={<PeopleDeleteOne size="1.3em" />}
                        css={{
                          backgroundColor: "transparent",
                          color: "#fd1462",
                        }}
                      />
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
          </div>
        </div>
        {/** Artists */}
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text h2>Artists</Text>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <Input
                aria-label="Artist Name"
                value={artistName}
                placeholder="Name"
                onChange={(e) => setArtistName(e.target.value)}
                onKeyDown={(e) => onKeyPress(e, "artist")}
              />
              <Button onPress={addArtist} auto>
                Add
              </Button>
            </div>
          </div>
          {/* Artist Map*/}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              height: "640px",
              padding: "0px 10px",
            }}
          >
            {artists.map((artist, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: 10, marginBottom: 20 }}
              >
                <Card css={{ mw: "350px" }} isHoverable variant="bordered">
                  <Card.Body
                    css={{
                      display: "flex",
                      gap: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: 332,
                    }}
                  >
                    {isEditing && fieldID === artist?._id ? (
                      <Input
                        aria-label="Artist Name"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        initialValue={artist?.name}
                      />
                    ) : (
                      <Text>{artist?.name}</Text>
                    )}
                    <div style={{ display: "flex", gap: 10 }}>
                      {isEditing && fieldID === artist?._id ? (
                        <Button
                          auto
                          onPress={() => cancelEdit()}
                          icon={<Close size="1.3em" />}
                          css={{
                            backgroundColor: "transparent",
                            color: "#0073f0",
                          }}
                        />
                      ) : (
                        <Button
                          auto
                          onPress={() => edit(artist?._id)}
                          icon={<Pencil size="1.3em" />}
                          css={{
                            backgroundColor: "transparent",
                            color: "#0073f0",
                          }}
                        />
                      )}
                      {isEditing && fieldID === artist?._id ? (
                        <Button
                          auto
                          color="success"
                          onPress={() => updateArtist(artist?._id)}
                          icon={<Save size="1.3em" />}
                          css={{
                            backgroundColor: "transparent",
                            color: "#00c96a",
                          }}
                        />
                      ) : (
                        <Button
                          color="error"
                          auto
                          onPress={() => deleteArtist(artist?._id)}
                          icon={<PeopleDeleteOne size="1.3em" />}
                          css={{
                            backgroundColor: "transparent",
                            color: "#fd1462",
                          }}
                        />
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
        {/** Tags */}
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text h2>Tags</Text>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <Input
                aria-label="Tag Name"
                placeholder="Name"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                onKeyDown={(e) => onKeyPress(e, "tag")}
              />
              <Button onPress={addTag} auto>
                Add
              </Button>
            </div>
          </div>
          {/** Tags Map */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              height: "640px",
              padding: "0px 10px",
            }}
          >
            {tags.map((tag, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: 10, marginBottom: 20 }}
              >
                <Card css={{ mw: "350px" }} isHoverable variant="bordered">
                  <Card.Body
                    css={{
                      display: "flex",
                      gap: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: 332,
                    }}
                  >
                    {isEditing && fieldID === tag?._id ? (
                      <Input
                        aria-label="Tag Name"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        initialValue={tag?.name}
                      />
                    ) : (
                      <Text>{tag?.name}</Text>
                    )}
                    <div style={{ display: "flex", gap: 10 }}>
                      {isEditing && fieldID === tag?._id ? (
                        <Button
                          auto
                          onPress={() => cancelEdit()}
                          icon={<Close size="1.3em" />}
                          css={{
                            backgroundColor: "transparent",
                            color: "#0073f0",
                          }}
                        />
                      ) : (
                        <Button
                          auto
                          onPress={() => edit(tag?._id)}
                          icon={<Pencil size="1.3em" />}
                          css={{
                            backgroundColor: "transparent",
                            color: "#0073f0",
                          }}
                        />
                      )}
                      {isEditing && fieldID === tag?._id ? (
                        <Button
                          auto
                          color="success"
                          onPress={() => updateTag(tag?._id)}
                          icon={<Save size="1.3em" />}
                          css={{
                            backgroundColor: "transparent",
                            color: "#00c96a",
                          }}
                        />
                      ) : (
                        <Button
                          color="error"
                          auto
                          onPress={() => deleteTag(tag?._id)}
                          icon={<PeopleDeleteOne size="1.3em" />}
                          css={{
                            backgroundColor: "transparent",
                            color: "#fd1462",
                          }}
                        />
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
        {/** Genres */}
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text h2>Genres</Text>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <Input
                aria-label="Genre Name"
                placeholder="Name"
                value={genreName}
                onChange={(e) => setGenreName(e.target.value)}
                onKeyDown={(e) => onKeyPress(e, "genre")}
              />
              <Button onPress={addGenre} auto>
                Add
              </Button>
            </div>
          </div>
          {/** Genres Map */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              height: "640px",
              padding: "0px 10px",
            }}
          >
            {genres.map((genre, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: 10, marginBottom: 20 }}
              >
                <Card css={{ mw: "350px" }} isHoverable variant="bordered">
                  <Card.Body
                    css={{
                      display: "flex",
                      gap: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: 332,
                    }}
                  >
                    {isEditing && fieldID === genre?._id ? (
                      <Input
                        aria-label="Genre Name"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        initialValue={genre?.name}
                      />
                    ) : (
                      <Text>{genre?.name}</Text>
                    )}
                    <div style={{ display: "flex", gap: 10 }}>
                      {isEditing && fieldID === genre?._id ? (
                        <Button
                          auto
                          onPress={() => cancelEdit()}
                          icon={<Close size="1.3em" />}
                          css={{
                            backgroundColor: "transparent",
                            color: "#0073f0",
                          }}
                        />
                      ) : (
                        <Button
                          auto
                          onPress={() => edit(genre?._id)}
                          icon={<Pencil size="1.3em" />}
                          css={{
                            backgroundColor: "transparent",
                            color: "#0073f0",
                          }}
                        />
                      )}
                      {isEditing && fieldID === genre?._id ? (
                        <Button
                          auto
                          color="success"
                          onPress={() => updateGenre(genre?._id)}
                          icon={<Save size="1.3em" />}
                          css={{
                            backgroundColor: "transparent",
                            color: "#00c96a",
                          }}
                        />
                      ) : (
                        <Button
                          color="error"
                          auto
                          onPress={() => deleteGenre(genre?._id)}
                          icon={<PeopleDeleteOne size="1.3em" />}
                          css={{
                            backgroundColor: "transparent",
                            color: "#fd1462",
                          }}
                        />
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
