# JavaScript
find the third greatest element in array

### Precondition

1. 문자열로 이뤄진 배열에서 3번째로 긴 단어 리턴
2. 동률일 경우 배열에서 뒤쪽에 나온 단어 리턴

```js
let words = ["hello", "world", "before", "all"];
let ouput = thirdGreatest(words);
console.log(ouput);
//output is 'world'
```


◆ reduce 사용

### Pseudocode

1. 새로운 배열 생성
2. reduce로 배열 순회하면서 가장 긴 단어는 새로운 배열에 push
3. 가장 긴 단어는 원본 배열에서 인덱스 조회하고 indexOf 삭제하기 splice
4. 긴 단어들을 차례로 삭제하면서 원본 배열 내 단어들 길이 비교
5. 새로운 배열의 2번 인덱스 리턴


### Codes

```js
function thirdGreatest(arr) {
  let result = [];
  while(arr.length > 0){
    let el = arr.reduce(function(acc,curr){
          if(acc.length >= curr.length){
              return acc;
          } return curr;
      })
      result.push(el);
      let index = arr.indexOf(el);
      arr.splice(index,1);
  }
  return result[2];
}
```


◆ array.sort 사용

### Pseudocode 

1. 원본 배열에서 정렬 sort
2. compare함수는 단어 길이 비교하며 내림차순 정렬
3. 원본 배열의 2번 인덱스 리턴


### Codes

```js
function thirdGreatest(arr) {
  arr = arr.sort(function(a, b) {
    return b.length - a.length;
  });
  return arr[2];
}
```
