import { createSelector } from '@ngxs/store';
import { PermissionStateModel } from './permission-state.model';
import { PermissionState } from './permission.states';

/* Feature state selector for user module */
export class PermissionStateSelector {
  static SliceOf<K extends keyof PermissionStateModel>(stateKey: K): any {
    return createSelector([PermissionState], (state: PermissionStateModel) => {
      /**
       * NOTE: if you want to mutate it's origin from a component, please clone the value an return.
       * If you want to reflect your changes from the UI, use action to perform mutation on the state.
       */
      return state[stateKey]; // by doing so, we can have its type when selecting.
    });
  }
}
