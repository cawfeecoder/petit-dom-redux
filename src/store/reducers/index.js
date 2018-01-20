import { combineReducers } from 'redux';

const initialStateCount = 0

const count = (state = initialStateCount, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

const todos = (state = [], action) => {
    switch (action.type){
        case 'ADD_TODO':
            console.log(action.payload);
            state.push(action.payload);
            return state;
        default:
            return state;
    }
}

const location = (state = {}, action) => {
    if(action.type == 'NAVIGATE') {
        return Object.assign({}, action.payload);
    }

    return state;
};

export default combineReducers({
    count,
    todos,
    location
})
