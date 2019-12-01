import { FILTER_CHANGED } from '../constants';
import { FilterAction } from '../actions';
import { FilterState } from '../types';

const initialState: FilterState = {
    type: '',
    name: ''
};

export function filter(state: FilterState = initialState, action: FilterAction) {
    if (action.type === FILTER_CHANGED) {
        return {
            type: action.payload.type,
            name: action.payload.name
        };
    }

    return state;
}