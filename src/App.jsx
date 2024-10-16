import { useMemo, useRef, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";
import { useAppContext } from "./context/AppProvider";

function App() {
  const inputRef = useRef();
  const { selectedCategoryId, todoList, setTodoList } = useAppContext();

  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTodoItemId, setActiveTodoItemId] = useState();
  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const [searchText, setSearchText] = useState("");

  // const [todoList, setTodoList] = useState([
  //   {
  //     id: "1",
  //     name: "task 1",
  //     isImportant: false,
  //     isCompleted: true,
  //     isDeleted: false,
  //     category: "personal",
  //   },
  //   {
  //     id: "2",
  //     name: "Task 02",
  //     isImportant: true,
  //     isCompleted: false,
  //     isDeleted: false,
  //     category: "personal",
  //   },
  //   {
  //     id: "3",
  //     name: "Task 03",
  //     isImportant: false,
  //     isCompleted: false,
  //     isDeleted: false,
  //     category: "travel",
  //   },
  // ]);

  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

  const handleTodoItemClick = (todoId) => {
    setShowSidebar(true);
    setActiveTodoItemId(todoId);
  };

  const handleCompleteCheckbox = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const handleChangeTodo = (todo) => {
    const newTodoList = todoList.map((item) => {
      if (item.id === todo.id) {
        return { ...todo };
      } else {
        return item;
      }
    });
    setTodoList(newTodoList);
  };

  const filterTodoList = useMemo(() => {
    return todoList.filter((todo) => {
      // ---search text
      if (!todo.name.includes(searchText)) {
        return false;
      }

      // ---selected category
      if (selectedCategoryId && selectedCategoryId !== todo.category) {
        return false;
      }

      // ---filter
      // if (selectedFilterId === "all") return true;
      // if (selectedFilterId === "important") return todo.isImportant;
      // if (selectedFilterId === "completed") return todo.isCompleted;
      // if (selectedFilterId === "deleted") return todo.isDeleted;
      switch (selectedFilterId) {
        case "all":
          return true;
        case "important":
          return todo.isImportant;
        case "completed":
          return todo.isCompleted;
        case "deleted":
          return todo.isDeleted;
        default:
          return true;
      }
    });
  }, [todoList, selectedFilterId, searchText, selectedCategoryId]);

  return (
    <div className="container">
      <FilterPanel
        selectedFilterId={selectedFilterId}
        setSelectedFilterId={setSelectedFilterId}
        // todoList={todoList}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <div className="main-container">
        <input
          ref={inputRef}
          type="text"
          name="add-new-task"
          placeholder="Add Task"
          className="task-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = e.target.value;
              console.log(value);
              setTodoList([
                ...todoList,
                {
                  id: crypto.randomUUID(),
                  name: value,
                  isCompleted: false,
                  isImportant: false,
                  isDeleted: false,
                  category: "personal",
                },
              ]);
              inputRef.current.value = "";
            }
          }}
        />
        <div>
          {filterTodoList.map((todo) => {
            return (
              <TodoItem
                id={todo.id}
                name={todo.name}
                key={todo.id}
                isImportant={todo.isImportant}
                isCompleted={todo.isCompleted}
                handleCompleteCheckboxChange={handleCompleteCheckbox}
                handleTodoItemClick={handleTodoItemClick}
              />
            );
          })}
        </div>
        {showSidebar && (
          <Sidebar
            todoItem={activeTodoItem}
            onChangeTodo={handleChangeTodo}
            onShowSidebar={setShowSidebar}
            key={activeTodoItemId}
          />
        )}
      </div>
    </div>
  );
}

export default App;
