import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import { useGetTodosQuery, useAddTodoMutation } from "../../api/apiSlice";
import TodoExcerpt from "../TodoExcerpt/TodoExcerpt";

const TodoList = () => {
    const [newTitle, setNewTitle] = useState("");

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetTodosQuery();
    
    const [addTodo] = useAddTodoMutation();

    const onAddTodo = (e) => {
        e.preventDefault();

        addTodo({ description: newTitle, completed: false });

        setNewTitle("");
    };

    let content;

    if (isLoading) {
        content = (
            <div className="loading-spinner">
                <FontAwesomeIcon icon={faSpinner} spin size="3x" />
            </div>
        );
    } else if (isSuccess) {
        content = todos.map((todo) => <TodoExcerpt todo={todo} key={todo._id}/>);
    } else if (isError) {
        content = <p>{error}</p>;
    } else {
        content = <p>Unknown state in apiSlice</p>;
    }

    const addTodoForm = (
        <form onSubmit={onAddTodo}>
            <label htmlFor="todo-title">Enter new todo item</label>
            <div className="new-todo">
                <input
                    type="text"
                    id="todo-title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
            </div>
            <button type="submit" className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>
    );

    return (
        <div>
            {addTodoForm}
            {content}
        </div>
    );
};

export default TodoList;
