import React, { useMemo } from "react";
import "./CategoryList.css";
import { useAppContext } from "../context/AppProvider";

export const CATEGORY_ITEMS = [
  { id: "personal", label: "Personal" },
  { id: "company", label: "Company" },
  { id: "travel", label: "Travel" },
  { id: "idea", label: "Idea" },
];

const CategoryList = () => {
  const { selectedCategoryId, setSelectedCategoryId, todoList } =
    useAppContext();

  const countByCategory = useMemo(() => {
    return todoList.reduce(
      (acc, cur) => {
        return { ...acc, [cur.category]: acc[cur.category] + 1 };
      },
      {
        personal: 0,
        company: 0,
        travel: 0,
        idea: 0,
      }
    );
  }, [todoList]);

  return (
    <div>
      <p>Categories</p>
      <div>
        {CATEGORY_ITEMS.map((item) => {
          return (
            <div
              key={item.id}
              className={`category-item ${
                item.id === selectedCategoryId ? "selected" : ""
              }`}
              onClick={() => setSelectedCategoryId(item.id)}
            >
              <p className="category-name">{item.label}</p>
              <p>{countByCategory[item.id]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CategoryList.propTypes = {
  // todoList: PropTypes.array,
};

export default CategoryList;
