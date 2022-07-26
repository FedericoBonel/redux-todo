import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the todos api slice
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
    tagTypes: ["Todos"], // Set the cache tag
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => "/tasks",
            transformResponse: (response) =>
                response.data.sort((todo1, todo2) => todo2.id - todo1.id),
            providesTags: ["Todos"], // Set what type of data provides to cache
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: "/tasks",
                method: "POST",
                body: todo,
            }),
            invalidatesTags: ["Todos"], // Whenever this tags changes, those caches should be invalidated and re fetched hence re rendering
        }),
        deleteTodo: builder.mutation({
            query: (todo) => ({
                url: `/tasks/${todo._id}`,
                method: "DELETE",
                body: todo.id,
            }),
            invalidatesTags: ["Todos"],
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/tasks/${todo._id}`,
                method: "PATCH",
                body: todo,
            }),
            invalidatesTags: ["Todos"],
        }),
    }),
});

// export the auto-generated hooks
export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
} = apiSlice;
