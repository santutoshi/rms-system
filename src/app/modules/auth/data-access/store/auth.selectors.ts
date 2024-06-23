import { createSelector } from '@ngxs/store';
import { AuthStateModel } from './auth-state.model';
import { AuthStates } from './auth.states';

/* Feature state selector for user module */
export class AuthStateSelector {
    static SliceOf<K extends keyof AuthStateModel>(stateKey: K): any {
        return createSelector([AuthStates], (state: AuthStateModel) => {
            /**
             * NOTE: if you want to mutate it's origin from a component, please clone the value an return.
             * If you want to reflect your changes from the UI, use action to perform mutation on the state.
             */
            return state[stateKey]; // by doing so, we can have its type when selecting.
        });
    }
}
