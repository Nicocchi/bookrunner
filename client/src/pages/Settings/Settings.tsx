import { useEffect, useState } from "react";
// import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import axios from "../../utils/axios.config";
import { Text, Card, Button, Input } from "@nextui-org/react";
import { Close, Pencil, PeopleDeleteOne, Save } from "@icon-park/react";
import getAllDb from "../../api/common";

function Settings() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [bookTypes, setBookTypes] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [tagName, setTagName] = useState("");
  const [genreName, setGenreName] = useState("");
  const [typeName, setTypeName] = useState("");
  // const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [fieldID, setFieldID] = useState("");
  const [isStaging, setIsStaging] = useState(false);

  useEffect(() => {
    if (import.meta.env.VITE_APP_MODE === "staging") {
      setIsStaging(true);
      getAllDb().then((res: any) => {
        setAuthors(res.data.authors);
        setBookTypes(res.data.formats);
        setArtists(res.data.artists);
        setTags(res.data.tags);
        setGenres(res.data.genres);
      });
    } else {
      axios
        .get("/all", {})
        .then((res: any) => {
          setAuthors(res.data.authors);
          setBookTypes(res.data.booktypes);
          setArtists(res.data.artists);
          setTags(res.data.tags);
          setGenres(res.data.genres);

          // setVisible(true);
        })
        .catch((err: any) => {
          console.error(err);
        });
    }
  }, []);

  // const closeHandler = () => {
  //   setVisible(false);
  // };

  const addAuthor = () => {
    axios
      .post(
        `/authors`,
        {
          name: authorName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: any) => {
        setAuthorName("");
        setAuthors(res.data.authors);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const addBookType = () => {
    axios
      .post(
        `/book-types`,
        {
          name: typeName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: any) => {
        setTypeName("");
        setBookTypes(res.data.bookTypes);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const addArtist = () => {
    axios
      .post(
        `/artists`,
        {
          name: artistName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: any) => {
        setArtistName("");
        setArtists(res.data.artists);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const addTag = () => {
    axios
      .post(
        `/tags`,
        {
          name: tagName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: any) => {
        setTagName("");
        setTags(res.data.tags);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const addGenre = () => {
    axios
      .post(
        `/genres`,
        {
          name: genreName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: any) => {
        setGenreName("");
        setGenres(res.data.genres);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const edit = (id: string) => {
    setFieldID(id);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setFieldID("");
    setIsEditing(false);
  };

  const updateAuthor = (id: string) => {
    if (name !== null || name !== "") {
      axios
        .put(
          `/authors/${id}`,
          {
            name,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res: any) => {
          setAuthors(res.data.authors);
          setIsEditing(false);
        })
        .catch((err: any) => {
          console.error(err);
        });
    }
  };

  const updateBookType = (id: string) => {
    if (name !== null || name !== "") {
      axios
        .put(
          `/book-types/${id}`,
          {
            name,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res: any) => {
          setBookTypes(res.data.bookTypes);
          setIsEditing(false);
        })
        .catch((err: any) => {
          console.error(err);
        });
    }
  };

  const updateArtist = (id: string) => {
    if (name !== null || name !== "") {
      axios
        .put(
          `/artists/${id}`,
          {
            name,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res: any) => {
          setArtists(res.data.artists);
          setIsEditing(false);
        })
        .catch((err: any) => {
          console.error(err);
        });
    }
  };

  const updateTag = (id: string) => {
    if (name !== null || name !== "") {
      axios
        .put(
          `/tags/${id}`,
          {
            name,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res: any) => {
          setTags(res.data.tags);
          setIsEditing(false);
        })
        .catch((err: any) => {
          console.error(err);
        });
    }
  };

  const updateGenre = (id: string) => {
    if (name !== null || name !== "") {
      axios
        .put(
          `/genres/${id}`,
          {
            name,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res: any) => {
          setGenres(res.data.genres);
          setIsEditing(false);
        })
        .catch((err: any) => {
          console.error(err);
        });
    }
  };

  const deleteBookType = (id: string) => {
    axios
      .delete(`/book-types/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        setBookTypes(res.data.bookTypes);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const deleteAuthor = (id: string) => {
    axios
      .delete(`/authors/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        setAuthors(res.data.authors);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const deleteArtist = (id: string) => {
    axios
      .delete(`/artists/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        setArtists(res.data.artists);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const deleteTag = (id: string) => {
    axios
      .delete(`/tags/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        setTags(res.data.tags);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const deleteGenre = (id: string) => {
    axios
      .delete(`/genres/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        setGenres(res.data.genres);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const onKeyPress = (e: any, type: any) => {
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
                disabled={isStaging}
              />
              <Button onPress={addAuthor} auto disabled={isStaging}>
                Add
              </Button>
            </div>
          </div>
          {/** Authors Map */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              height: "640px",
              padding: "0px 10px",
            }}
          >
            {authors.map((author, i) => (
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
                          disabled={isStaging}
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
                          disabled={isStaging}
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
                disabled={isStaging}
              />
              <Button onPress={addBookType} auto disabled={isStaging}>
                Add
              </Button>
            </div>
          </div>
          {/** Format Map*/}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              height: "640px",
              padding: "0px 10px",
            }}
          >
            {bookTypes.map((bookType, i) => (
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
                          disabled={isStaging}
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
                          disabled={isStaging}
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
                disabled={isStaging}
              />
              <Button onPress={addArtist} auto disabled={isStaging}>
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
                          disabled={isStaging}
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
                          disabled={isStaging}
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
                disabled={isStaging}
              />
              <Button onPress={addTag} auto disabled={isStaging}>
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
                          disabled={isStaging}
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
                          disabled={isStaging}
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
                disabled={isStaging}
              />
              <Button onPress={addGenre} auto disabled={isStaging}>
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
                          disabled={isStaging}
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
                          disabled={isStaging}
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
