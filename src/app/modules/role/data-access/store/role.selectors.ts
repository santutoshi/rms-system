import { createSelector } from '@ngxs/store';
import {  RoleStates } from './role.states';
import { RoleStateModel } from './role-state.model';

/* Feature state selector for Role module */
export class RoleStateSelector {
    static SliceOf<K extends keyof RoleStateModel>(stateKey: K): any {
        return createSelector([RoleStates], (state: RoleStateModel) => {
            /**
             * NOTE: if you want to mutate it's origin from a component, please clone the value an return.
             * If you want to reflect your changes from the UI, use action to perform mutation on the state.
             */
            return state[stateKey]; // by doing so, we can have its type when selecting.
        });
    }
}
