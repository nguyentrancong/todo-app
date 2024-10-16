import React, { useState } from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
import { CATEGORY_ITEMS } from "./CategoryList";

const Sidebar = (props) => {
  const [item, setItem] = useState(props.todoItem);

  const handleSave = () => {
    props.onChangeTodo(item);
    props.onShowSidebar(false);
  };

  return (
    <div className="sidebar">
      <form className="sb-form">
        <div className="sb-form-field">
          <label htmlFor="sb-name">Todo Name</label>
          <input
            type="text"
            id="sb-name"
            name="name"
            value={item.name}
            onChange={(e) => {
              setItem({ ...item, name: e.target.value });
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-important">Is Important</label>
          <input
            type="checkbox"
            id="sb-name"
            name="name"
            checked={item.isImportant}
            onChange={() => {
              setItem({ ...item, isImportant: !item.isImportant });
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-completed">Is Completed</label>
          <input
            type="checkbox"
            id="sb-completed"
            name="name"
            checked={item.isCompleted}
            onChange={() => {
              setItem({ ...item, isCompleted: !item.isCompleted });
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-category" className="sb-category">
            Category
          </label>
          <select
            id="sb-category"
            value={item.category}
            onChange={(e) => {
              setItem({ ...item, category: e.target.value });
            }}
          >
            {CATEGORY_ITEMS.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.label}
                </option>
              );
            })}
          </select>
        </div>
      </form>
      <div className="sb-footer">
        <button onClick={handleSave}>Save</button>
        <button onClick={() => props.onShowSidebar(false)}>Cancel</button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  todoItem: PropTypes.shape({
    name: PropTypes.string,
    isImportant: PropTypes.bool,
    isCompleted: PropTypes.bool,
  }),
  onChangeTodo: PropTypes.func,
  onShowSidebar: PropTypes.func,
};

export default Sidebar;
