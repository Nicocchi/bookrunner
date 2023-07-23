import React, { useEffect, useState } from "react";
// import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import axios from "../../utils/axios.config";
import {
  Text,
  Card,
  Col,
  Row,
  Button,
  Input,
  Switch,
  Modal,
  Textarea,
  Grid,
  Tooltip,
  Badge,
} from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
// import { BookOpen } from "@icon-park/react";
import Select from "react-select";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import getAllDb from "../../api/common";
import {getAllBooks} from "../../api/books/books";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType
);

// const selectStyle = {
//   control: (base, state) => ({
//     ...base,
//     width: "170px"
//   })
// }

const selectStyle = {
  control: (base: any) => ({
    ...base,
    // background: "#16181a",
    color: "#16181a",
    border: "none",
    cursor: "pointer",
    boxShadow: "none",
    width: 170,
  }),
  option: (base: any) => ({
    ...base,
    // background: "#16181a",
    marginTop: 0,
    zIndex: 1000,
  }),
  menu: (base: any) => ({
    ...base,
    // background: "#16181a",
    width: 170,
    zIndex: 1000,
  }),
  menuList: (base: any) => ({
    ...base,
    // background: "#16181a",
    padding: 0,
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    border: "none",
    visibility: "hidden",
  }),
};

const BookDetailsCard = ({
  css,
  onClick,
  title,
  author,
  format,
  description,
  ...props
}: {
  css: any;
  onClick: any;
  title: any;
  author: any;
  format: any;
  description: any;
}) => {
  // const [following, setFollowing] = React.useState(false);

  return (
    <Grid.Container
      css={{
        mw: "350px",
        borderRadius: "$lg",
        padding: "$sm",
        ...css,
      }}
      onClick={onClick}
      {...props}
    >
      <Row justify="space-between" align="center">
        <Col span={12}>
          <Row>
            <Grid xs={12} direction="column">
              <Text b size={17}>
                {title}
              </Text>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {author.map((a: any, i: number) => (
                  <Text key={i} size={14} color="#ec4f85" b>
                    {a?.name}
                  </Text>
                ))}
              </div>
              <Text
                size={13}
                // css={{ mt: "-$3" }}
                b
                color="#1380e6"
              >
                {format}
              </Text>
            </Grid>
          </Row>
        </Col>
      </Row>
      <Grid.Container>
        <Grid
          xs={12}
          style={{
            maxHeight: "100px",
            overflowY: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Text size={14} css={{ mt: "$1" }} color="#888888">
            {description}
          </Text>
        </Grid>
      </Grid.Container>

      <Grid.Container
        justify="flex-start"
        alignContent="center"
        style={{ paddingTop: "10px" }}
      >
        <Badge css={{ backgroundColor: "#ec4f85" }}>Detective</Badge>
        <Badge css={{ backgroundColor: "#ec4f85" }}>Comedy</Badge>
      </Grid.Container>
    </Grid.Container>
  );
};

function Library() {
  const [books, setBooks] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [authors, setAuthors] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [formats, setFormats] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState<any[]>([]);
  const [bookArtist, setBookArtist] = useState<any[]>([]);
  // const [bookGenre, setBookGenre] = useState<any[]>([]);
  const [bookPublishDate, setBookPublishDate] = useState(new Date());
  const [bookPageCount, setBookPageCount] = useState(1);
  const [bookDescription, setBookDescription] = useState("");
  const [bookType, setBookType] = useState({ value: "" });
  const [files, setFiles] = useState<any[]>([]);
  const [bookFile, setBookFile] = useState<any[]>([]);
  const [bookPublic, setBookPublic] = useState(false);
  const [isStaging, setIsStaging] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.search !== "") {
      axios
        .get(`/books${location.search}`, {})
        .then((res: any) => {
          setBooks(res.data.books);
          setBookType({ value: "" });
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      if (import.meta.env.VITE_APP_MODE === "staging") {
        setIsStaging(true);
        getAllBooks().then((res: any) => {
          getAllDb().then((allRes: any) => {
            const bkTypes = allRes.data.formats.map((bb: any) => {
              return { value: bb._id, label: bb.name };
            });
            const auths = allRes.data.authors.map((aa: any) => {
              return { value: aa._id, label: aa.name };
            });
            const arts = allRes.data.artists.map((aa: any) => {
              return { value: aa._id, label: aa.name };
            });
            const gnrs = allRes.data.genres.map((aa: any) => {
              return { value: aa._id, label: aa.name };
            });
  
            setAuthors(auths);
            setFormats(bkTypes);
            setArtists(arts);
            setGenres(gnrs);
            setBooks(res.data.books);
          });
        })
      } else {
        axios
          .get("http://localhost:5000/books", {})
          .then((res: any) => {
            axios
              .get("http://localhost:5000/all", {})
              .then((allRes: any) => {
                const bkTypes = allRes.data.booktypes.map((bb: any) => {
                  return { value: bb._id, label: bb.name };
                });
                const auths = allRes.data.authors.map((aa: any) => {
                  return { value: aa._id, label: aa.name };
                });
                const arts = allRes.data.artists.map((aa: any) => {
                  return { value: aa._id, label: aa.name };
                });
                const gnrs = allRes.data.genres.map((aa: any) => {
                  return { value: aa._id, label: aa.name };
                });

                setAuthors(auths);
                setFormats(bkTypes);
                setArtists(arts);
                setGenres(gnrs);
                setBooks(res.data.books);
              })
              .catch((err: any) => {
                console.error(err);
              });
            // setBooks(res.data.books);
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    }
  }, [location]);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const openModel = () => {
    axios
      .get("http://localhost:5000/all", {})
      .then((res: any) => {
        const bkTypes = res.data.booktypes.map((bb: any) => {
          return { value: bb._id, label: bb.name };
        });
        const auths = res.data.authors.map((aa: any) => {
          return { value: aa._id, label: aa.name };
        });
        const arts = res.data.artists.map((aa: any) => {
          return { value: aa._id, label: aa.name };
        });

        setAuthors(auths);
        setFormats(bkTypes);
        setArtists(arts);

        setVisible(true);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const onAddBook = async () => {
    let coverImg, imgBlob, bookFle, bookBlob, fileExt;
    if (files.length > 0) {
      coverImg = files[0].getFileEncodeDataURL();
      imgBlob = await fetch(coverImg).then((r) => r.blob());
    }

    if (bookFile.length > 0) {
      bookFle = bookFile[0].getFileEncodeDataURL();
      fileExt = bookFile[0].fileExtension;
      bookBlob = await fetch(bookFle).then((r) => r.blob());
    }

    const authors = bookAuthor.map((a) => a.value);
    const arts = bookArtist.map((a) => a.value);

    axios
      .post(
        `http://localhost:5000/books`,
        {
          title: bookTitle,
          author: authors,
          artist: arts,
          bookType: bookType.value,
          mimetype: fileExt,
          publishDate: bookPublishDate,
          pageCount: bookPageCount,
          description: bookDescription,
          bookcover: imgBlob,
          bookfile: bookBlob,
          public: bookPublic,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res: any) => {
        setBooks(res.data.books);
      })
      .catch((err: any) => {
        console.error("onAddBook error =>", err);
      });
  };

  // const viewBook = (id: string, mimetype: string) => {
  //   localStorage.setItem("contentId", id);
  //   localStorage.setItem("mimetype", mimetype);
  //   window.open(`/book/viewer`, "_blank");
  // };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          maxWidth: "1400px",
          padding: "0 20px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexFlow: "wrap",
            justifyContent: "center",
            gap: 20,
            paddingBottom: "20px",
          }}
        >
          <Input
            aria-label="Search"
            shadow={false}
            placeholder="Search"
            width="170px"
          />
          <Select
            aria-label="Authors"
            styles={selectStyle}
            // onChange={setBookAuthor}
            // value={bookAuthor}
            placeholder="Authors"
            options={authors}
          />
          <Select
            aria-label="Artists"
            styles={selectStyle}
            // onChange={setBookAuthor}
            // value={bookAuthor}
            placeholder="Artists"
            options={artists}
          />
          <Select
            aria-label="Genres"
            isMulti
            styles={selectStyle}
            // onChange={setBookAuthor}
            // value={bookAuthor}
            placeholder="Genres"
            options={genres}
          />
          <Select
            aria-label="Year"
            styles={selectStyle}
            // onChange={setBookAuthor}
            // value={bookAuthor}
            placeholder="Year"
            // options={authors}
          />
          <Select
            aria-label="Format"
            styles={selectStyle}
            // onChange={setBookAuthor}
            // value={bookAuthor}
            placeholder="Format"
            options={formats}
          />
          <Select
            aria-label="Status"
            styles={selectStyle}
            // onChange={setBookAuthor}
            // value={bookAuthor}
            placeholder="Status"
            // options={authors}
          />
          <Button onPress={openModel} color="secondary" auto disabled={isStaging}>
            Add Book
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            flexFlow: "wrap",
          }}
        >
          {books.map((b: any, i) => (
            <Tooltip
              key={i}
              placement="rightStart"
              leaveDelay={0.05}
              offset={30}
              content={
                <BookDetailsCard
                  title={b?.title}
                  author={b?.author}
                  description={b?.description}
                  format={b?.bookType?.name}
                  css=""
                  onClick={() => {}}
                />
              }
              css={undefined}
              color={undefined}
              contentColor={undefined}
            >
              <div style={{ width: "185px" }}>
                <Card
                  key={i}
                  isPressable
                  variant="flat"
                  onPress={() => navigate(`/book/${b?._id}`)}
                  css={{ w: "185px", h: "265px", borderRadius: "5px" }}
                >
                  <Card.Header
                    css={{ position: "absolute", zIndex: 1, top: 5 }}
                  ></Card.Header>
                  <Card.Body css={{ p: 0 }}>
                    <Card.Image
                      src={`http://localhost:5000/uploads/bookCovers/${b?.coverImage}`}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      alt="Card example background"
                    />
                  </Card.Body>
                </Card>
                <Text h6 color="#000" size={12} css={{ paddingTop: "10px" }}>
                  {b?.title}
                </Text>
              </div>
            </Tooltip>
          ))}
        </div>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
          width="600px"
        >
          <Modal.Header>
            <Text aria-label="Edit Book" id="modal-title" b size={18}>
              Add Book
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Input
              aria-label="Book Title"
              type="text"
              placeholder="Title"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
            />
            <Text aria-label="Author">Author</Text>
            <Select
              aria-label="Book Author"
              onChange={(value) => setBookAuthor([...value])}
              isMulti
              value={bookAuthor}
              placeholder="Authors"
              options={authors}
            />
            <Text aria-label="Artist">Artist</Text>
            <Select
              aria-label="Book Artist"
              isMulti
              onChange={(value) => setBookArtist([...value])}
              value={bookArtist}
              placeholder="Artists"
              options={artists}
            />
            <Text aria-label="book Type">Type</Text>
            <Select
              aria-label="Book Type"
              name="bookType"
              isSearchable={true}
              onChange={(value) => setFormats([...[value]])}
              value={bookType}
              placeholder="Book Type"
              options={formats}
            />
            <Input
              aria-label="Published Date"
              type="date"
              placeholder="Published Date"
              value={bookPublishDate.toDateString()}
              onChange={(e) => setBookPublishDate(new Date(e.target.value))}
            />
            <Input
              aria-label="Page Count"
              type="number"
              placeholder="Page Count"
              value={bookPageCount}
              onChange={(e) => setBookPageCount(Number(e.target.value))}
            />
            <Textarea
              aria-label="Book Description"
              placeholder="Description"
              value={bookDescription}
              onChange={(e) => setBookDescription(e.target.value)}
            />
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              maxFiles={1}
              instantUpload={false}
              name="bookcover" /* sets the file input name, it's filepond by default */
              labelIdle='Drag & Drop cover image (jpeg, png, gif) or <span class="filepond--label-action">Browse</span>'
              allowFileTypeValidation={true}
              acceptedFileTypes={["image/jpeg", "image/png", "image/gif"]}
            />

            <FilePond
              files={bookFile}
              onupdatefiles={setBookFile}
              allowMultiple={false}
              maxFiles={1}
              instantUpload={false}
              name="bookfile" /* sets the file input name, it's filepond by default */
              labelIdle='Drag & Drop book file (pdf, epub) or <span class="filepond--label-action">Browse</span>'
              allowFileTypeValidation={true}
              acceptedFileTypes={[
                "application/pdf",
                "application/epub",
                "application/epub+zip",
              ]}
            />
            <Text aria-label="Is a public book?">Public?</Text>
            <Switch
              checked={bookPublic}
              onChange={(e: any) => setBookPublic(e.target.checked)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onPress={closeHandler}>
              Cancel
            </Button>
            <Button auto onPress={onAddBook}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Library;
