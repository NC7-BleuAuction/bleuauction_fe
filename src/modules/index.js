import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loading from "./loading";
import object, { objectSaga } from "./exampleAction";

const rootReducer = combineReducers({
  loading,
  object,
});

export function* rootSaga() {
  yield all([objectSaga()]);
}

export default rootReducer;
