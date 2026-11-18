// Allowing only one request at a time
class ConcurrencyLock {
  private locked = false;
  private requestQueue: Array<() => void> = [];

  // Acquire the lock and return a function to release it
  async lock(): Promise<() => void> {
    if (!this.locked) {
      this.locked = true;
    } else {
      await new Promise<void>((resolve) => {
        this.requestQueue.push(resolve);
      });
    }

    let released = false;

    return () => {
      if (released) return; 
      released = true;
      const next = this.requestQueue.shift();

      if (next) {
        next();
      } else {
        this.locked = false;
      }
    };
  }
}

export default ConcurrencyLock;
