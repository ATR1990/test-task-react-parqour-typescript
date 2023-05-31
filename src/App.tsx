import { useState } from 'react'

import { BsPlusLg } from 'react-icons/bs'
import { Button } from 'react-bootstrap'

import { DataModal } from './components/DataModal'
import { DataTable } from './components/DataTable'
export const App = () => {
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h1 className="display-5 fw-bold text-center">My Task List</h1>

        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleShow}>
            <BsPlusLg></BsPlusLg>
          </Button>
        </div>

        {show && <DataModal
          show={show}
          setShow={setShow}
        />}

        <DataTable />
      </div>
    </div>
  )
}
