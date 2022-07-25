import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faUpload,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
} from "../../api/apiSlice";

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
    const [deleteTodo] = useDeleteTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();

    const onAddTodo = (e) => {
        e.preventDefault();

        // ! We are only allowing 1 user, if this were to change
        // ! This must be updated
        addTodo({ userId: 1, title: newTitle, completed: false });

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
        content = todos.map((todo) => (
            <article key={todo.id}>
                <div className="todo">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        id={todo.id}
                        onChange={() =>
                            updateTodo({ ...todo, completed: !todo.completed })
                        }
                    />
                    <label htmlFor={todo.id}>{todo.title}</label>
                </div>
                <button className="trash" onClick={() => deleteTodo(todo)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </article>
        ));
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
