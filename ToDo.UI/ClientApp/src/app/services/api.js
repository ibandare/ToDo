import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        prepareHeaders: (headers) => {
            headers.set("x-csrf", '1')
            return headers
        }
    }),
    tagTypes: ['ToDo'],
    endpoints: (build) => ({
        getToDos: build.query({
            query: () => 'api/todo',
            // Provides a list of `ToDos` by `id`.
            // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
            // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `ToDos` element was added.
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map(({id}) => ({type: 'ToDo', id})),
                        {type: 'ToDo', id: 'LIST'},
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'ToDos', id: 'LIST' }` is invalidated
                    [{type: 'ToDo', id: 'LIST'}],
        }),
        addToDo: build.mutation({
            query(body) {
                return {
                    url: `api/todo`,
                    method: 'POST',
                    body,
                }
            },
            // Invalidates all ToDo-type queries providing the `LIST` id - after all, depending of the sort order,
            // that newly created ToDo could show up in any lists.
            invalidatesTags: [{type: 'ToDo', id: 'LIST'}],
        }),
        getToDo: build.query({
            query: (id) => `api/todo/${id}`,
            providesTags: (result, error, id) => [{type: 'ToDo', id}],
        }),
        updateToDo: build.mutation({
            query(data) {
                const {id} = data;
                return {
                    url: `api/todo/${id}`,
                    method: 'PUT',
                    body: data,
                }
            },
            // Invalidates all queries that subscribe to this ToDo `id` only.
            // In this case, `getToDo` will be re-run. `getToDos` *might*  rerun, if this id was under its results.
            invalidatesTags: (result, error, {id}) => [{type: 'ToDo', id}],
        }),
        deleteToDo: build.mutation({
            query(id) {
                return {
                    url: `api/todo/${id}`,
                    method: 'DELETE',
                }
            },
            // Invalidates all queries that subscribe to this ToDo `id` only.
            invalidatesTags: (result, error, id) => [{type: 'ToDo', id}],
        }),

        getCurrentUser: build.query({
            query: () => `bff/user`
        }),

        getUsers: build.query({
            query: (params) => ({url: `api/user`, params})
        }),
    }),
});

export const {
    useGetToDosQuery,
    useGetToDoQuery,
    useAddToDoMutation,
    useUpdateToDoMutation,
    useDeleteToDoMutation,
    useGetUsersQuery,
    useGetCurrentUserQuery
} = api;
