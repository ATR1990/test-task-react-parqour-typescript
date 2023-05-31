import { Spinner } from 'react-bootstrap'

import { TableRow } from './TableRow'
import { useGetTasksQuery } from '../redux/api/tasks'

export const TableBody = () => {
  const {
    data: tasks,
    isLoading,
    isSuccess
  } = useGetTasksQuery(null)

  let content

  if (isLoading) {
    content = (
      <tbody>
        <tr>
          <td colSpan={4} className="text-center">
            <Spinner animation="border" />
          </td>
        </tr>
      </tbody>
    )
  } else if (isSuccess) {
    content = <TableRow tasks={tasks} />
  } else {
    content = null
  }

  return content
}
