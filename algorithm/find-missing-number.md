# JavaScript
find missing number

### Precondition

1. 1부터 n까지의 숫자가 공백 한 칸으로 구분된 문자열이 인자로 주어진다
2. n까지의 숫자 중 하나의 숫자가 생략된다
3. 그 숫자를 찾아라

```js
findMissingNumber('1 6 2 4 3') // => 5
```

### Pseudocode

1. 공백을 제외한 문자열을 모두 숫자로 바꾸고 배열로 변환
2. n까지 for 문을 돌리면서 빠진 숫자가 있는지 includes로 확인
3. 빠진 숫자 리턴


### Codes

```js
function findMissingNumber(str) {
  let arr = str.split(' ').map(Number);
  let result;
  for(let i=1; i<=arr.length+1; i++){
    if(!arr.includes(i)){
      result = i
    }
  }
  return result;
}

```
