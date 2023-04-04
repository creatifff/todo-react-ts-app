const DEFAULT_TODO_LIST = [
    {
        id: 1,
        name: 'task1',
        description: 'sample text',
        checked: false,
        created_at: new Date().toISOString().slice(0,10),
        deadline: '',
    },
    {
        id: 2,
        name: 'task2',
        description: 'sample text',
        checked: false,
        created_at: new Date().toISOString().slice(0,10),
        deadline: '',
    },
    {
        id: 3,
        name: 'task3',
        description: 'large sample text for completed task',
        checked: true,
        created_at: new Date().toISOString().slice(0,10),
        deadline: '',
    }
]

export default DEFAULT_TODO_LIST;


