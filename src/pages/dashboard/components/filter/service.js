const NUM_OF_SELECTED = 8;

export function checkIndeterminate(filter) {
  const numOfSelected = Object.values(filter).reduce((acc, value) => {
    return [...acc, ...value];
  }, []).length;
  
  if (numOfSelected === 0 || numOfSelected === NUM_OF_SELECTED) {
    return false;
  }
  return true;
}

export function checkIsCheckAll(filter) {
  const numOfSelected = Object.values(filter).reduce((acc, value) => {
    return [...acc, ...value];
  }, []).length;
  
  return numOfSelected === NUM_OF_SELECTED;
}
