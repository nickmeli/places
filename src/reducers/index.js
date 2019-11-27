import { combineReducers } from 'redux';

import { markers } from './markers.reducer';
import { center } from './center.reducer';
import { filter } from './filter.reducer';

const rootReducer = combineReducers({
    markers,
    center,
    filter
});

export default rootReducer;