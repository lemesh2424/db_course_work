import { combineReducers } from "redux";
import action, { ActionState } from "./action";

export type StoreState = {
  action: Partial<ActionState>,
};

const reducers = combineReducers<Partial<StoreState>>({
  action
});

export default reducers;
