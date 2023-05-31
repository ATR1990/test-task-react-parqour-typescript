import { configureStore } from '@reduxjs/toolkit'

import { tasksApi } from './api/tasks'
import { statusesApi } from './api/statuses'

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    [statusesApi.reducerPath]: statusesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      tasksApi.middleware,
      statusesApi.middleware
    )
})
