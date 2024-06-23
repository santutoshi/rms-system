import { Observable } from 'rxjs';

/** Method to return Observable to array  */
export function subscribeObservables(
  observable: Observable<Array<unknown>>
): Array<unknown> {
  let array: Array<unknown> = [];
  observable.subscribe((res) => {
    array = res;
  });
  return array;
}
