import { CENTER_CHANGED } from '../constants';

export function setCenter(center) {
    return { 
        type: CENTER_CHANGED,
        payload: center
    }
}