import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "../reducers/authReducer";
import { extranjerosReducer } from "../reducers/extranjerosReducer";
import { vistasPublicasReducer } from "../reducers/vistasPublicasReducer";
import { vistaActivaReducer } from "../reducers/ActivaPublicReducer";
import { ServicesReducer } from "../reducers/ServicesReducer";

const reducers = combineReducers({
  auth: authReducer,
  getExtranjeros: extranjerosReducer,
  getPublicVist: vistasPublicasReducer,
  getActiveVist: vistaActivaReducer,
  getServices: ServicesReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
