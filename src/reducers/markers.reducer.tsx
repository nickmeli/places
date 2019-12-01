import { MARKERS_LOADED } from '../constants';
import { MarkersAction } from '../actions';
import { MarkersState } from '../types';

const initialState: MarkersState = {
    markers: []
};

export function markers(state: MarkersState = initialState, action: MarkersAction) {
    if (action.type === MARKERS_LOADED) {
        return Object.assign({}, state, {
            markers: action.payload
        });
    }

    return state;
}