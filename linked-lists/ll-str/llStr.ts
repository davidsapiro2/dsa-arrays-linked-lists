/** IndexError: raised when index not found. */

class IndexError extends Error { }

/**
 * NodeStr: node for a singly-linked list of string.
 *
 * - val
 * - next: next NodeStr or null
 */

class NodeStr {
  val: string;
  next: NodeStr | null;

  constructor(val: string) {
    this.val = val;
    this.next = null;
  }
}

/**
 * Linked list of numbers.
 */

class LLStr {
  head: NodeStr | null;
  tail: NodeStr | null;
  length: number;

  constructor(vals: string[] = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (const val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val: string): void {
    const newNode = new NodeStr(val);

    if (this.head === null) this.head = newNode;
    if (this.tail !== null) this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val: string): void {
    const newNode = new NodeStr(val);

    if (this.head !== null) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  /** pop(): return & remove last item.
   *
   * Throws IndexError on empty list.
   **/

  pop(): string {
    if (this.head === null || this.tail === null)
      throw new IndexError("List is empty.");

    const poppedVal = this.tail.val;
    this.length--;

    let current: NodeStr | null = this.head;
    for (let i = 0; i < this.length - 1; i++) {
      current = current!.next;
    }
    this.tail = current;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return poppedVal;
  }

  /** shift(): return & remove first item.
   *
   * Throws IndexError on empty list.
   **/

  shift(): string {
    if (this.head === null) throw new IndexError("List is empty.");

    const shiftNode = this.head;
    this.head = shiftNode.next;

    this.length--;
    if (this.length === 0) this.tail = null;

    return shiftNode.val;
  }

  /** getAt(idx): get val at idx.
   *
   * Throws IndexError if not found.
   **/

  getAt(idx: number): string {
    let current = this.head;
    let i = 0;

    while (current !== null) {
      if (i === idx) {
        return current.val;
      }
      current = current.next;
      i++;
    }
    throw new IndexError("No item at index.");
  }

  /** setAt(idx, val): set val at idx to val.
   *
   * Throws IndexError if not found.
   **/

  setAt(idx: number, val: string): void {
    if (this.head === null) {
      const newNode = new NodeStr(val);
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return;
    }

    let current: NodeStr | null = this.head;
    let i = 0;

    while (current !== null) {
      if (i === idx) {
        current.val = val;
        return;
      }
      current = current.next;
      i++;
    }
    throw new IndexError("No item at index.");
  }

  /** insertAt(idx, val): add node w/val before idx.
   *
   * Throws IndexError if not found.
   **/

  insertAt(idx: number, val: string): void {
    if (idx > this.length || idx < 0) {
      throw new IndexError("Index not found.");
    }

    // if list is empty
    if (this.head === null) {
      const newNode = new NodeStr(val);
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return;
    }

    // if adding at end of list
    if (this.length === idx) {
      const newNode = new NodeStr(val);
      this.tail = newNode;
      this.length++;
      return;
    }

    const newNode = new NodeStr(val);

    let current = this.head;
    for (let i = 0; i < idx - 1; i++) {
      current = current.next as NodeStr;
    }

    newNode.next = current.next;
    current.next = newNode;

    if (idx === 0) {
      this.head = newNode;
    }
    this.length++;
  }

  /** removeAt(idx): return & remove item at idx,
   *
   * Throws IndexError if not found.
   **/

  removeAt(idx: number): string {
    if (idx >= this.length || idx < 0 || this.head === null) {
      throw new IndexError("Index not found.");
    }

    if (idx === this.length - 1) {
      return this.pop();
    }

    let current: NodeStr | null = this.head;
    for (let i = 0; i < idx; i++) {
      current = current!.next;
    }
    const removedNext = current!.next;
    const removedVal = current!.val;
    current = null;

    current = this.head;
    for (let i = 0; i < idx - 1; i++) {
      current = current!.next;
    }
    current!.next = removedNext;

    this.length--;

    return removedVal;
  }

  /** toArray (useful for tests!) */

  toArray(): string[] {
    const out = [];
    let current = this.head;

    while (current) {
      out.push(current.val);
      current = current.next;
    }

    return out;
  }
}

export { IndexError, LLStr, NodeStr };
