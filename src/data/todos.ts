const DEFAULT_TODO_LIST = [
    {
        id: 1,
        name: 'task1',
        description: 'sample text',
        checked: true,
        created_at: new Date('2023-04-07').toISOString().slice(0,10),
        deadline: new Date('2023-04-10').toISOString().slice(0,10),
    },
    {
        id: 2,
        name: 'task2',
        description: 'sample text',
        checked: false,
        created_at: new Date('2023-04-04').toISOString().slice(0,10),
        deadline: new Date('2023-12-31').toISOString().slice(0,10),
    },
    {
        id: 3,
        name: 'task3',
        description: 'large sample text for completed task',
        checked: true,
        created_at: new Date('2023-04-12').toISOString().slice(0,10),
        deadline: new Date('2023-04-12').toISOString().slice(0,10),
    },
    {
        id: 4,
        name: 'task4',
        description: 'one more task for tests',
        checked: false,
        created_at: new Date('2023-04-01').toISOString().slice(0,10),
        deadline: new Date('2023-11-30').toISOString().slice(0,10),
    }
]

export default DEFAULT_TODO_LIST;


