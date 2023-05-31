import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

import { useGetTaskByIdQuery, useCreateTaskMutation, useUpdateTaskMutation } from '../redux/api/tasks'
import { useGetStatusesQuery } from '../redux/api/statuses'
import { Status } from '../types/Task'

type ModalPops = {
  show: boolean,
  setShow: Dispatch<SetStateAction<boolean>>,
  id?: string
}

export const DataModal = (props: ModalPops) => {
  const  { show, setShow, id} = props

  const { data: statuses } = useGetStatusesQuery(null)
  const { data: taskById } = useGetTaskByIdQuery(id, { skip: !id })

  const [createTask] = useCreateTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('unassigned')

  useEffect(() => {
    taskById && setTitle(taskById?.title)
    taskById && setDescription(taskById?.description)
    taskById && setStatus(taskById?.status)
  }, [
    taskById?.title,
    taskById?.description,
    taskById?.status
  ])

  const handleClose = () => setShow(false)
  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)
  const handleChangeDescription = (event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)
  const handleChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => setStatus(event.target.value)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    id
      ? updateTask({ title, description, status, id })
      : createTask({ title, description, status })

    handleClose()

    setTitle('')
    setDescription('')
    setStatus('unassigned')
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {`${id ? 'Edit' : 'Create'} task`}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              id="title"
              value={title}
              onChange={handleChangeTitle}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
              id="description"
              value={description}
              onChange={handleChangeDescription}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="status">Status</Form.Label>
            <Form.Select
              id="status"
              className="text-capitalize"
              value={status}
              onChange={handleChangeStatus}
            >
              {statuses?.map(
                (status: Status, index: number) => <option key={index}>{status}</option>
              )}
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
