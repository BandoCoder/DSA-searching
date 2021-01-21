const sorted = [3, 5, 6, 8, 11, 12, 14, 15, 17, 18];

function binarySearch(array, value, start, end) {
  start = start === undefined ? 0 : start;
  end = end === undefined ? array.length : end;

  if (start > end) {
    return -1;
  }

  const index = Math.floor((start + end) / 2);
  const item = array[index];

  if (item == value) {
    return;
  } else if (item < value) {
    console.log(array.slice(index + 1, end));
    return binarySearch(array, value, index + 1, end);
  } else if (item > value) {
    console.log(array.slice(start, index - 1));
    return binarySearch(array, value, start, index - 1);
  }
}

function main() {
  binarySearch(sorted, 8);
}

main();
