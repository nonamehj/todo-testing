import React from "react";
import useHomeData from "./useHomeData";

const PreviewList = () => {
  const { filterListItems } = useHomeData();
  return (
    <div className="preview-center">
      <ul className="preview-todo-list">
        {filterListItems.slice(0, 6).map((item, index) => {
          const { id, title } = item;
          return (
            <li key={id}>
              <p className="todo-mini-contents">
                {title.length > 70 ? `${title.slice(0, 70)} ...` : title}
              </p>
              {/* <p>{title}</p> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PreviewList;
