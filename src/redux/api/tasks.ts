import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL_TASKS } from '../../const/tasks_url'
import { Task } from '../../types/Task'

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL_TASKS
    }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getTasks: builder.query<Task[], null>({
            query: () => '',
            transformResponse: (res: Task[]) => res.sort((a, b) => Number(b.id) - Number(a.id)),
            providesTags: ['Tasks']
        }),
        getTaskById: builder.query<Task, string | undefined>({
            query: (id) => ({
                url: `/${id}`
            }),
            providesTags: ['Tasks']
        }),
        createTask: builder.mutation({
            query: task => ({
                url: '',
                method: 'POST',
                body: task
            }),
            invalidatesTags: ['Tasks']
        }),
        updateTask: builder.mutation({
            query: task => ({
                url: `/${task.id}`,
                method: 'PUT',
                body: task
            }),
            invalidatesTags: ['Tasks']
        }),
        deleteTask: builder.mutation({
            query: ({ id }) => ({
                url: `/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Tasks']
        })
    })
})

export const {
    useGetTasksQuery,
    useGetTaskByIdQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation
} = tasksApi
