import { fromJS, Map } from 'immutable';
import { combineReducers } from 'redux';

import {
  RECIPE_RECEIVE,
  RECIPE_FILTERS_RECEIVE,
  RECIPE_HISTORY_RECEIVE,
} from '../action-types';


function filters(state = new Map(), action) {
  switch (action.type) {
    case RECIPE_FILTERS_RECEIVE:
      return fromJS(action.filters);

    default:
      return state;
  }
}


function history(state = new Map(), action) {
  switch (action.type) {
    case RECIPE_HISTORY_RECEIVE:
      return state.set(action.recipeId, fromJS(action.revisions.map(revision => revision.id)));

    default:
      return state;
  }
}


function items(state = new Map(), action) {
  let recipe;

  switch (action.type) {
    case RECIPE_RECEIVE:
      recipe = fromJS(action.recipe);
      recipe.set('action_id', action.recipe.action.id);
      recipe.remove('action');

      recipe.set('latest_revision_id', action.recipe.latest_revision.id);
      recipe.remove('latest_revision');

      if (action.recipe.approved_revision) {
        recipe.set('approved_revision_id', action.recipe.approved_revision.id);
      } else {
        recipe.set('approved_revision_id', null);
      }
      recipe.remove('approved_revision');

      return state.set(action.recipe.id, recipe);

    default:
      return state;
  }
}


export default combineReducers({
  filters,
  history,
  items,
});
