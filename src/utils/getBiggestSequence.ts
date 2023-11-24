function getBiggestSequence(array: boolean[]) {
  let currentCount: number = 0;
  let maxCount: number = 0;

  array.forEach((el) => {
    if (el == true) {
      currentCount++;
    } else {
      currentCount = 0;
    }
    if (currentCount > maxCount) {
      maxCount = currentCount;
    }
  });

  return maxCount;
}

export default getBiggestSequence;
