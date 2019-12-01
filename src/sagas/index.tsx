import { all, fork } from 'redux-saga/effects';
import { watcherSaga } from './api-saga';

export const rootSaga = function* root() {
    yield all([fork(watcherSaga)]);
};