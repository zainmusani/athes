// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";
import {
  GET_ATHLETES,
} from "../actions/ActionTypes";
import { Images } from "../theme";

const initialState = Immutable({
  data: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
