import { FILTER_CHANGED } from '../constants';

const initialState = {
    type: '',
    name: ''
}

export function filter(state = initialState, action) {
    if (action.type === FILTER_CHANGED) {
        return {
            type: action.payload.type,
            name: action.payload.name
        };
    }

    return state;
}