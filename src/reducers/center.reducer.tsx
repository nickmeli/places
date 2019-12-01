import { CENTER_CHANGED } from '../constants';
import { CenterAction } from '../actions';
import { CenterState } from '../types';

const initialState: CenterState = {
    center: {lng: 0, lat: 0},
    radius: 0
};

export function center(state: CenterState = initialState, action: CenterAction) {
    if (action.type === CENTER_CHANGED) {
        return {
            center: action.payload.center,
            radius: action.payload.radius
        };
    }

    return state;
}