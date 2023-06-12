import { useGlobalContext } from "./context";
import sublinks from "./data";
import { useEffect, useRef, useState } from "react";

const Submenu = () => {
  const { pageId, setPageId } = useGlobalContext();
  const [textWidth, setTextWidth] = useState(0);
  const linkRef = useRef(null);
  const currentPage = sublinks.find((item) => item.pageId === pageId);

  const submenuContainerRef = useRef(null);

  const handleMouseLeave = (event) => {
    const submenu = submenuContainerRef.current;
    const { left, right, bottom } = submenu.getBoundingClientRect();
    const { clientX, clientY } = event;

    if (clientX < left - 1 || clientX > right - 1 || clientY > bottom - 1) {
      setPageId(null);
    }
  };

  const calculateTextWidth = (text) => {
    const dummyElement = document.createElement("span");
    dummyElement.style.whiteSpace = "nowrap";
    dummyElement.innerText = text;

    document.body.appendChild(dummyElement);

    const width = dummyElement.offsetWidth;

    document.body.removeChild(dummyElement);

    return width;
  };

  useEffect(() => {
    if (linkRef.current) {
      const text = linkRef.current.getBoundingClientRect();
      let width = calculateTextWidth(text);
      setTextWidth(width);
      console.log(width);
    }
  }, []);

  const linkStyle = {
    width: `${textWidth}px`,
  };

  return (
    <div
      className={currentPage ? "submenu show-submenu" : "submenu"}
      onMouseLeave={handleMouseLeave}
      ref={submenuContainerRef}
    >
      <h5>{currentPage?.page}</h5>
      <div
        className="submenu-links"
        style={{
          gridTemplate: currentPage?.links?.length > 3 ? "1fr 1fr" : "1fr",
        }}
        ref={linkRef}
      >
        {currentPage?.links?.map((link) => {
          const { id, url, label, icon } = link;
          return (
            <a key={id} href={url} style={linkStyle}>
              {icon}
              {label}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Submenu;
