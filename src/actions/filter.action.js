import { FILTER_CHANGED } from '../constants';

export function setFilter(filter) {
    return { 
        type: FILTER_CHANGED,
        payload: filter
    }
}