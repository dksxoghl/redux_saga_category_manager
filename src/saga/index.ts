import { categorySaga } from "./categorySaga";
import {all} from 'redux-saga/effects';


export function* rootSaga(){
    yield all([categorySaga()]);
}