import { LLStr } from "../common/ll";

/** return average (mean) of list values.
 *
 * Returns 0 for empty list.
 **/

function average(lst: LLStr): number {
  if (lst.length === 0) return 0;

  let current = lst.head;
  let total = 0;

  while (current) {
    total += Number(current.val);
    current = current.next;
  }

  return total / lst.length;
}

export { average };
