export type Status = 'unassigned' | 'pending' | 'completed'

export type Task = {
	id: string,
	title: string,
	description: string,
	status: Status
}
