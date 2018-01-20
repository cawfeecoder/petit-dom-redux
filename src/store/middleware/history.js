export default function historyMiddleware(history) {
    return store => next => action => {
        let current = store.getState();
        let result = next(action);

        if (action.type === 'NAVIGATE' && (current.location.pathname != action.payload.pathname)) {
            history.push(action.payload);
        }

        return result;
    }
}