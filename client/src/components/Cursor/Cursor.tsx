import { useEffect, useRef } from "react";
// import "/arrow-circle-left.svg"
// import "/arrow-circle-right.svg"
import "../../assets/arrow-circle-left.svg"
import "../../assets/arrow-circle-right.svg"

const Cursor = ({ isLeft, isNormal }) => {
  const dot = useRef(null);
  const dotOutline = useRef(null);

  const cursorVisible = useRef(true);
  const cursorEnlarged = useRef(false);

  const endX = useRef(window.innerWidth / 2);
  const endY = useRef(window.innerHeight / 2);
  const _x = useRef(0);
  const _y = useRef(0);

  const requestRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", mouseOverEvent);
    document.addEventListener("mouseup", mouseOutEvent);
    document.addEventListener("mousemove", mouseMoveEvent);
    document.addEventListener("mouseenter", mouseEnterEvent);
    document.addEventListener("mouseleave", mouseLeaveEvent);

    return () => {
      document.removeEventListener("mousedown", mouseOverEvent);
      document.removeEventListener("mouseup", mouseOutEvent);
      document.removeEventListener("mousemove", mouseMoveEvent);
      document.removeEventListener("mouseenter", mouseEnterEvent);
      document.removeEventListener("mouseleave", mouseLeaveEvent);
    };
  }, []);

  const toggleCursorVisibility = () => {
    if (cursorVisible) {
      dot.current.style.opacity = 1;
      dotOutline.current.style.opacity = 1;
    } else {
      dot.current.style.opacity = 0;
      dotOutline.current.style.opacity = 0;
    }
  };

  const toggleCursorSize = () => {
    // if (cursorEnlarged.current) {
    //   dot.current.style.transform = "translate(-50%, -50%) scale(0.7)";
    //   dotOutline.current.style.transform = "translate(-50%, -50%) scale(1.5)";
    // } else {
    //   dot.current.style.transform = "translate(-50%, -50%) scale(1)";
    //   dotOutline.current.style.transform = "translate(-50%, -50%) scale(1)";
    // }
  };

  const mouseOverEvent = () => {
    cursorEnlarged.current = true;
    toggleCursorSize();
  };

  const mouseOutEvent = () => {
    cursorEnlarged.current = false;
    toggleCursorSize();
  };

  const mouseEnterEvent = () => {
    cursorVisible.current = true;
    toggleCursorVisibility();
  };

  const mouseLeaveEvent = () => {
    cursorVisible.current = false;
    toggleCursorVisibility();
  };

  const mouseMoveEvent = (e) => {
    cursorVisible.current = true;
    toggleCursorVisibility();

    endX.current = e.pageX;
    endY.current = e.pageY;

    dot.current.style.top = endY.current + "px";
    dot.current.style.left = endX.current + "px";
    dotOutline.current.style.top = endY.current + "px";
    dotOutline.current.style.left = endX.current + "px";
  };

  const bg = isLeft && !isNormal ? "url('/images/arrow-circle-left.svg')" : !isLeft && !isNormal ? "url('/images/arrow-circle-right.svg')" : ""
  const op = isLeft && !isNormal ? "visible" : !isLeft && !isNormal ? "visible" : "hidden"

  return (
    <>
      <div
        ref={dotOutline}
        className="cursor-dot-outline"
        style={{
          backgroundImage: bg,
          visibility: op
        }}
      ></div>
      <div
        ref={dot}
        className="cursor-dot"
        style={{
          backgroundImage: bg,
          visibility: op
        }}
      ></div>
    </>
  );
};

export default Cursor;
