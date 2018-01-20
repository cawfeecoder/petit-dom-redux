const increment = () => ({
    type: 'INCREMENT'
})

const decrement = () => ({
    type: 'DECREMENT'
})

const navigate = (location) => ({
    type: 'NAVIGATE',
    payload: history.createLocation(location)
})

const add_todo = (todo) => ({
    type: 'ADD_TODO',
    payload: todo
})

module.exports = {
    increment,
    decrement,
    navigate,
    add_todo
}