export const createSubject = () => {
  const set = new Set();

  return {
    notify: (value) => {
      set.forEach(observer => observer(value))
    },
    subscribe: (observer) => {
      set.add(observer)
    },
    unsubscribe: (observer) => {
      set.remove(observer)
    }
  };
};
