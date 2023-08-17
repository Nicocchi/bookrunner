import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import axios from "../../utils/axios.config"
import {
  Image,
  Text,
  Button,
  Input,
  Modal,
  Textarea,
  Badge,
  Spacer,
  Switch,
} from "@nextui-org/react";
import { Pencil } from "@icon-park/react";
import Select from "react-select";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import {getBookByID} from "../../api/books/books";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType
);

function BookOverview() {
  const [book, setBook] = useState<any | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [authors, setAuthors] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [bookTypes, setBookTypes] = useState<any[]>([]);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState<any[]>([]);
  const [bookArtist, setBookArtist] = useState<any[]>([]);
  const [bookPublishDate, setBookPublishDate] = useState(new Date());
  const [bookPageCount, setBookPageCount] = useState(1);
  const [bookDescription, setBookDescription] = useState("");
  const [bookType, setBookType] = useState({value: "", label: ""});
  const [files, setFiles] = useState<any[]>([]);
  const [bookFile, setBookFile] = useState<any[]>([]);
  const [bookPublic, setBookPublic] = useState(false);
  const [isStaging, setIsStaging] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const base_url = "http://localhost:5000/uploads/bookCovers"

  useEffect(() => {
    if (import.meta.env.VITE_APP_MODE === "staging") {
      setIsStaging(true);
      getBookByID(params?.id).then((res: any) => {
        const bk = res.data.book;
        setBook(res.data.book);
        setBookTitle(bk.title);
      })
    } else {
      axios
      .get(`/books/${params?.id}`, {})
      .then((res: any) => {
        const bk = res.data.book;
        setBook(res.data.book);
        setBookTitle(bk.title);
        const selectedAuthors = bk?.author.map((at: any) => {
          return { value: at._id, label: at.name };
        });

        if (bk?.artist !== null && bk?.artist.length > 0) {
          console.log("IS NOT NULL");
          const selectedArtists = bk?.artist.map((at: any) => {
            return { value: at._id, label: at.name };
          });

          setBookArtist(selectedArtists);
        }

        setBookAuthor(selectedAuthors);
        setBookType({ value: bk.bookType._id, label: bk.bookType.name });
        setBookPublishDate(
          new Date(bk.publishDate)
            // .toISOString("mm/dd/yyyy")
            // .toString()
            // .slice(0, 10)
        );
        setBookPageCount(bk.pageCount);
        setBookDescription(bk.description);
        setBookPublic(bk.public);
      })
      .catch((err: any) => {
        console.log(err);
      });
    }
    
  }, [location]);

  const closeHandler = () => {
    setVisible(false);
  };

  const openModel = () => {
    axios
      .get("/all", {})
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
        setBookTypes(bkTypes);
        setArtists(arts);

        setVisible(true);

        setBookTitle(book.title);
        const selectedAuthors = book.author.map((at: any) => {
          return { value: at._id, label: at.name };
        });

        setBookAuthor(selectedAuthors);

        console.log(selectedAuthors);

        if (book?.artist !== null && book?.artist.length > 0) {
          const selectedArtists = book.artist.map((at: any) => {
            return { value: at._id, label: at.name };
          });

          setBookArtist(selectedArtists);
        }

        setBookType({
          value: book.bookType._id,
          label: book.bookType.name,
        });

        setBookPublishDate(
          new Date(book.publishDate)
            // .toISOString("mm/dd/yyyy")
            // .toString()
            // .slice(0, 10)
        );

        setBookPageCount(book.pageCount);
        setBookDescription(book.description);
        setBookPublic(book.public);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const onEditBook = async () => {
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
      .put(
        `/books/${params?.id}`,
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
        // const bk = res.data.book;
        setBook(res.data.book);
      })
      .catch((err: any) => {
        console.error("onEditBook error =>", err);
      });
  };

  const viewBook = (id: string) => {
    localStorage.setItem("contentId", id);
    localStorage.setItem("mimetype", book.mimetype);
    window.open("/bookrunner/book/viewer", "_blank");
  };

  const deleteBook = () => {
    axios
      .delete(`/books/${book._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        navigate("/library");
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  if (book === null) {
    return <div></div>;
  }

  return (
    <>
      <div
        style={{
          margin: "50px auto",
          width: "1024px",
          gap: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <Badge color="primary" variant="flat">
            {book?.bookType?.name?.charAt(0).toUpperCase() +
              book?.bookType?.name?.slice(1)}
          </Badge>
          <Text h1 aria-label="Book title">
            {book?.title}
          </Text>
        </div>
        <div style={{ display: "flex", gap: 50 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Image
              src={isStaging ? book?.coverImage : `${base_url}/${book?.coverImage}`}
              width={240}
              height={341}
              objectFit="cover"
            />
            <Spacer y={0.5} />
            <Badge color="secondary" variant="flat">
              {book?.public ? "Public" : "Private"}
            </Badge>
            <Spacer y={0.5} />
            <div style={{ display: "flex", gap: 10 }}>
              <Button
                disabled={isStaging}
                onPress={openModel}
                style={{ backgroundColor: "#fff", paddingTop: "14px" }}
                size="sm"
                auto
                icon={<Pencil theme="outline" size="24" fill="#000" />}
              />
              <Button size="sm" auto onPress={() => viewBook(book?.file)}>
                Read
              </Button>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                borderBottom: "1px dashed",
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                gap: 30,
                marginBottom: 20,
              }}
            >
              <Text aria-label="Author">
                Author:{" "}
                {book?.author?.map((at: any, i: number) => {
                  if (i >= book?.author.length - 1) {
                    return at.name;
                  } else {
                    return at.name + ", ";
                  }
                })}
              </Text>
              {book?.artist ? (
                <Text aria-label="Artist">
                  Artist:{" "}
                  {book?.artist?.map((at: any, i: number) => {
                    if (i >= book?.artist.length - 1) {
                      return at.name;
                    } else {
                      return at.name + ", ";
                    }
                  })}
                </Text>
              ) : null}
              <Spacer y={2} />
            </div>
            <Text aria-label="Book Summary">Summary:</Text>
            <Text aria-label="Summary">{book?.description}</Text>
          </div>
        </div>
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
            Edit Book
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
            isMulti
            onChange={(value) => setBookAuthor([...value])}
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
            // onChange={(value) => setBookType([...value])}
            value={bookType}
            placeholder="Book Type"
            options={bookTypes}
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
            acceptedFileTypes={["application/pdf", "application/epub+zip"]}
          />
          <Text aria-label="Is a public book?">Public?</Text>
          <Switch
            checked={bookPublic}
            onChange={(e: any) => setBookPublic(e.target.checked)}
          />
        </Modal.Body>
        <Modal.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <Button auto color="error" onPress={deleteBook}>
              Delete
            </Button>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Button auto flat color="error" onPress={closeHandler}>
              Cancel
            </Button>
            <Button auto onPress={onEditBook}>
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookOverview;
