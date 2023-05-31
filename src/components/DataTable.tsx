import { Table } from 'react-bootstrap'

import { TableHead } from './TableHead'
import { TableBody } from './TableBody'

export const DataTable = () => (
  <Table className="w-50" bordered hover>
    <TableHead />
    <TableBody />
  </Table>
)
