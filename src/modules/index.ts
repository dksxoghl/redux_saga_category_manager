import { combineReducers } from 'redux';
import category_reducer from './category';
const rootReducer = combineReducers({
    category_reducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;