import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [todoList, setTodoList] = useState([
    {
      id: "1",
      name: "task 1",
      isImportant: false,
      isCompleted: true,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "2",
      name: "Task 02",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "3",
      name: "Task 03",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
      category: "travel",
    },
  ]);
  return (
    <AppContext.Provider
      value={{
        selectedCategoryId,
        setSelectedCategoryId,
        todoList,
        setTodoList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.element,
};

export default AppProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};
