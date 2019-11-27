import { MARKERS_LOADED } from '../constants';

const initialState = {
    markers: []
};

export function markers(state = initialState, action) {
    if (action.type === MARKERS_LOADED) {
        return Object.assign({}, state, {
            markers: action.payload
        });
    }

    return state;
}