import { fromJS } from 'immutable';
import * as matchers from 'jasmine-immutable-matchers';

import {
  ACTION_RECEIVE,
  REVISION_RECEIVE,
} from 'control_new/state/action-types';
import actionsReducer from 'control_new/state/app/actions/reducers';
import revisionsReducer from 'control_new/state/app/revisions/reducers';
import { getRevision } from 'control_new/state/app/revisions/selectors';

import {
  RevisionFactory,
} from '.';

import {
  INITIAL_STATE,
} from '..';


describe('getRevision', () => {
  const revision = new RevisionFactory();

  const STATE = {
    ...INITIAL_STATE,
    app: {
      ...INITIAL_STATE.app,
      actions: actionsReducer(undefined, {
        type: ACTION_RECEIVE,
        action: revision.recipe.action,
      }),
      revisions: revisionsReducer(undefined, {
        type: REVISION_RECEIVE,
        revision: revision.toObject(),
      }),
    },
  };

  beforeEach(() => {
    jasmine.addMatchers(matchers);
  });

  it('should return the revision', () => {
    expect(getRevision(STATE, revision.id)).toEqualImmutable(revision.toImmutable());
  });

  it('should return `null` for invalid ID', () => {
    expect(getRevision(STATE, 'invalid')).toEqual(null);
  });

  it('should return default value for invalid ID with default provided', () => {
    expect(getRevision(STATE, 'invalid', 'default')).toEqual('default');
  });
});
