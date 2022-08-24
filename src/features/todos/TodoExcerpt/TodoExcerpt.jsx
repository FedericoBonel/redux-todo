import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
    useDeleteTodoMutation,
    useUpdateTodoMutation,
} from "../../api/apiSlice";

const TodoExcerpt = ({ todo }) => {
    const [deleteTodo] = useDeleteTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();

    return (
        <article>
            <div className="todo">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    id={todo._id}
                    onChange={() =>
                        updateTodo({ ...todo, completed: !todo.completed })
                    }
                />
                <label htmlFor={todo.id}>{todo.description}</label>
            </div>
            <button className="trash" onClick={() => deleteTodo(todo)}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </article>
    );
};

export default TodoExcerpt;
