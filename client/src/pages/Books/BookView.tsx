import { useEffect, useState } from "react";
import { ReactReader } from "react-reader";
import { Document, Page, pdfjs } from "react-pdf";

import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { Button, Text } from "@nextui-org/react";
// import { ArrowCircleRight, ArrowCircleLeft } from "@icon-park/react";

import BOOKPDF from "../../assets/392e79679ccbdd0ea68833fe17ff288a.pdf";
import Cursor from "../../components/Cursor/Cursor";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: true,
};

const BookView = () => {
  const [document, setDocument] = useState("");
  // const [documentEpub, setDocumentEpub] = useState(null);
  const [mimetype, setMimetype] = useState<string>("");
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(100);
  const [isLeft, setIsLeft] = useState<boolean>(false);
  const [isNormal, setIsNormal] = useState<boolean>(true);
  const [location, setLocation] = useState<any | null>(null);
  const locationChanged = (epubcifi: any) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi);
  };

  // const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let isStaging = false;
    if (import.meta.env.VITE_APP_MODE === "staging") {
      isStaging = true;
    }
    const file = localStorage.getItem("contentId");
    const mt = localStorage.getItem("mimetype") || "";
    setMimetype(mt);
    setDocument(isStaging ? BOOKPDF : `"http://localhost:5000/uploads/books"/${file}`);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    if (pageNumber <= 1) {
      return;
    }
    changePage(-1);
  };

  const nextPage = () => {
    if (pageNumber >= numPages) {
      return;
    }
    changePage(1);
  };

  // const onItemClick = ({ pageNumber: itemPageNumber }: {pageNumber: number, itemPageNumber: number}) => {
  //   setPageNumber(itemPageNumber);
  // };

  if (mimetype === "application/epub+zip") {
    return (
      <div style={{ height: "100vh" }}>
        <ReactReader
          location={location}
          locationChanged={locationChanged}
          url={document}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          epubOptions={{
            allowScriptedContent: true,
          }}

          // url="https://react-reader.metabits.no/files/alice.epub"
        />
      </div>
    );
  } else if (mimetype === "application/pdf") {
    return (
      <div className="container">
        <Cursor isLeft={isLeft} isNormal={isNormal} />
        <div className="container__document">
          <TransformWrapper>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment
          @ts-ignore */}
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <>
                <TransformComponent>
                  <Document
                    file={document}
                    onLoadError={console.error}
                    onLoadSuccess={onDocumentLoadSuccess}
                    options={options}
                  >
                    {/* <Outline onItemClick={onItemClick} /> */}
                    <Page
                      pageNumber={pageNumber}
                      scale={scale * 0.01}
                      width={600}
                    />
                    <Page
                      pageNumber={pageNumber + 1}
                      scale={scale * 0.01}
                      width={600}
                    />
                  </Document>
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>
        <button
          // disabled={pageNumber >= numPages}
          onClick={nextPage}
          onMouseOver={() => {
            setIsLeft(true);
            setIsNormal(false);
          }}
          onMouseOut={() => {
            setIsNormal(true);
          }}
          className="container__document__next_btn "
        ></button>
        <button
          // disabled={pageNumber <= 1}
          onClick={previousPage}
          onMouseOver={() => {
            setIsLeft(false);
            setIsNormal(false);
          }}
          onMouseOut={() => {
            setIsNormal(true);
          }}
          className="container__document__prev_btn "
        ></button>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: 10,
            position: "fixed",
            top: "10px",
          }}
        >
          <Button auto onPress={() => navigate(-1)}>
            Close
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: 10,
            position: "fixed",
            bottom: "10px",
          }}
        >
          <Button auto onPress={() => setScale((prev) => prev - 20)}>
            -
          </Button>
          <Button auto onPress={() => setScale((prev) => prev + 20)}>
            +
          </Button>
          <Button auto disabled={pageNumber <= 1} onPress={previousPage}>
            Prev
          </Button>
          <Button auto disabled={pageNumber >= numPages} onPress={nextPage}>
            Next
          </Button>
          <Text>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </Text>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default BookView;
