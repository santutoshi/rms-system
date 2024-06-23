import { createSelector } from '@ngxs/store';
import { StaffStateModel } from './staff-state.model';
import { StaffStates } from './staff.states';

/* Feature state selector for Role module */
export class StaffStateSelector {
  static SliceOf<K extends keyof StaffStateModel>(stateKey: K): any {
    return createSelector([StaffStates], (state: StaffStateModel) => {
      /**
       * NOTE: if you want to mutate it's origin from a component, please clone the value an return.
       * If you want to reflect your changes from the UI, use action to perform mutation on the state.
       */
      return state[stateKey]; // by doing so, we can have its type when selecting.
    });
  }
}
