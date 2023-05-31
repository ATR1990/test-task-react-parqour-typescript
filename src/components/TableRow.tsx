import { useState, useEffect, useRef } from 'react'

import { BsPencilSquare, BsTrash } from 'react-icons/bs'
import { Button } from 'react-bootstrap'

import { useDeleteTaskMutation } from '../redux/api/tasks'
import { DataModal } from './DataModal'
import { Task } from '../types/Task'

export const TableRow = (props: { tasks: Task[] }) => {
  const {tasks} = props

  const [show, setShow] = useState(false)
  const [id, setId] = useState('')
  const [list, setList] = useState(tasks)

  useEffect(() => {
    setList(tasks)
  }, [tasks])

  const [deleteTask] = useDeleteTaskMutation()

  const dragItem = useRef<number | null>(null)
  const dragOverItem = useRef<number | null>(null)

  const dragStart = (position: number) => () => dragItem.current = position

  const dragEnter = (position: number) => () => dragOverItem.current = position

  const drop = () => {
    const copyListItems = [...list]
    // @ts-ignore
    const dragItemContent = copyListItems[dragItem.current]

    if (typeof dragItem.current === "number") {
      copyListItems.splice(dragItem.current, 1)
    }
    if (typeof dragOverItem.current === "number") {
      copyListItems.splice(dragOverItem.current, 0, dragItemContent)
    }

    dragItem.current = null
    dragOverItem.current = null

    setList(copyListItems)
  }

  const handleShow = (i: string) => () => {
    setShow(true)
    setId(i)
  }

  return (
    <>
      <tbody onDragEnd={drop}>
        {list?.map((task: Task, index: number) => (
          <tr
            className="cursor"
            key={task?.id}
            draggable
            onDragStart={dragStart(index)}
            onDragEnter={dragEnter(index)}
          >
            <td>{task?.title}</td>
            <td>{task?.description}</td>
            <td className="text-capitalize">{task?.status}</td>
            <td>
              <div className="d-flex justify-content-around">
                <Button variant="outline-warning" onClick={handleShow(task?.id)}>
                  <BsPencilSquare></BsPencilSquare>
                </Button>

                <Button
                  variant="outline-danger"
                  onClick={() => deleteTask({ id: task?.id })}
                >
                  <BsTrash></BsTrash>
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>

      {show && <DataModal
        show={show}
        setShow={setShow}
        id={id}
      />}
    </>
  )
}
