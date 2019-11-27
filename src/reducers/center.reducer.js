import { CENTER_CHANGED } from '../constants';

const initialState = {
    center: '',
    radius: ''
}

export function center(state = initialState, action) {
    if (action.type === CENTER_CHANGED) {
        return {
            center: action.payload.center,
            radius: action.payload.radius
        };
    }

    return state;
}