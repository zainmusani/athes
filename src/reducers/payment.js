// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  ADD_CREDIT_CARD,
  DELETE_CARD,
  GET_CARD_LIST,
  USER_SIGNOUT,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  cardsList: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CARD_LIST.SUCCESS: {
      return Immutable.merge(state, {
        cardsList: action.data,
      });
    }
    case ADD_CREDIT_CARD.SUCCESS: {
      const stateCards = util.cloneDeepArray(state.cardsList);
      const actionData = util.cloneDeep(action.data);
      stateCards.unshift(actionData);
      return Immutable.merge(state, {
        cardsList: stateCards,
      });
    }
    case DELETE_CARD.SUCCESS: {
      const stateCards = util.cloneDeepArray(state.cardsList);
      const actionData = util.cloneDeep(action.data);

      const afterRemoveCard = util.excludeIdFromArray(
        stateCards,
        actionData?.card_id,
      );
      return Immutable.merge(state, {
        cardsList: afterRemoveCard,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    default:
      return state;
  }
};
