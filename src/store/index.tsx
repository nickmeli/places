import { createStore, applyMiddleware, compose } from "redux";
import rootReducer, { RootState } from '../reducers';
import createSagaMiddleware from "redux-saga";
import { rootSaga } from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer =
    (process.env.NODE_ENV !== 'production' &&
        (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) ||
    compose;

export const store = createStore<RootState, any, any, any>(
    rootReducer,
    {},
    composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);