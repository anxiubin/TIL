# JavaScript
Each element is bigger than sum of previous elements in array


### Precondition 

1. 배열의 모든 요소들이 해당 요소들 앞에 있는 요소들의 합보다 커야한다
2. 위 조건을 만족하면 true, 아니면 false 리턴

```js
let output = maxEl([1, 3, 6, 13, 54]);
console.log(output); // true
```


### Pseudocode

1. for 반복문으로 배열 순회하며 요소들의 합 비교
2. 합이 해당 인덱스보다 작다면 false리턴
3. 아니면 true 리턴


### Codes

```js
function maxEl(arr) {
  let sum = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= sum) {
      return false;
    }
    sum = sum + arr[i];
  }
  return true;
}
```