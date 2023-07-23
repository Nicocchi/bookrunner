import { useEffect, useState } from "react";
import axios from "axios";
import { Text, Card, Col, Row, Button } from "@nextui-org/react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { Bookshelf } from "@icon-park/react";
import { BookOpen } from "@icon-park/react";
import { getAllBooks } from "./api/books/books";

function App() {
  const [books, setBooks] = useState<any[]>([]);
  const [isStaging, setIsStaging] = useState(false);

  const navigate = useNavigate();
  const base_url = isStaging ? "" : "http://localhost:5000/uploads/bookCovers"

  useEffect(() => {
    if (import.meta.env.VITE_APP_MODE === "staging") {
      setIsStaging(true);
      getAllBooks().then((res: any) => {
        setBooks(res.data.books);
      });
    } else {
      axios
        .get("http://localhost:5000/books", {})
        .then((res) => {
          setBooks(res.data.books);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          // always executed/
        });
    }
  }, [books]);

  const viewBook = (id: string, mimetype: string) => {
    localStorage.setItem("contentId", id);
    localStorage.setItem("mimetype", mimetype);
    window.open(`/book/viewer`, "_blank");
  };

  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Bookshelf size="24px" />
          <Text h3>Recently Added Books</Text>
        </div>
        <div style={{ display: "flex", gap: 20, flexFlow: "wrap" }}>
          {books.map((b, i) => (
            <Card key={i} css={{ w: "250px", h: "400px" }}>
              <Card.Header
                css={{ position: "absolute", zIndex: 1, top: 5 }}
              ></Card.Header>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={`${base_url}/${b?.coverImage}`}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  alt="book cover"
                />
              </Card.Body>
              <Card.Footer
                isBlurred
                css={{
                  position: "absolute",
                  bgBlur: "#ffffff66",
                  borderTop:
                    "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                  bottom: 0,
                  zIndex: 1,
                }}
              >
                <Row>
                  <Col style={{ maxHeight: 20 }}>
                    <Text h6 color="#000" size={12}>
                      {b?.title}
                    </Text>
                    <Text color="#000" size={12}>
                      {b?.author?.name}
                    </Text>
                  </Col>
                  <Col>
                    <Row justify="flex-end">
                      <Button
                        flat
                        auto
                        rounded
                        onPress={() => navigate(`/book/${b?._id}`)}
                        color="secondary"
                      >
                        <Text
                          css={{ color: "inherit" }}
                          size={12}
                          weight="bold"
                          transform="uppercase"
                        >
                          View
                        </Text>
                      </Button>
                      <Button
                        flat
                        auto
                        rounded
                        onPress={() => viewBook(b?.file, b?.mimetype)}
                        // color="secondary"
                        style={{
                          paddingTop: "15px",
                          backgroundColor: "transparent",
                        }}
                        icon={
                          <BookOpen theme="outline" size="24" fill="#333" />
                        }
                      />
                    </Row>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
