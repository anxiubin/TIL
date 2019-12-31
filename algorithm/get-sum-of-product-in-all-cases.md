# JavaScript
get sum of product of all pairs in all cases


### Precondition

1. 주어진 숫자들에 대해 서로 다른 두 숫자의 모든 경우의 곱의 합을 구하라
2. 파라미터 갯수는 정해져있지 않다


```js
function sumOfProductOfAll(...array) {
  let sum = 0;
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    if (i !== 0) {
      result += sum * array[i];
console.log('result :'+ result)
console.log('sum :'+ sum)
console.log('array[i] :'+ array[i])
    }
    sum += array[i];
  }
  return result;
}


let output = sumOfProductOfAll(4,5,6,7,8);
console.log(output);

// result :20
// sum :4
// array[i] :5
// result :74
// sum :9
// array[i] :6
// result :179
// sum :15
// array[i] :7
// result :355
// sum :22
// array[i] :8
// output is 355
```


### Pseudocode
1. 파라미터가 1,2,3,4 로 주어질 경우

1*2
+ (1+2)*3
+ (1+2+3)*4

이와 같이 계산 가능

2. for 반목문으로 (1+2+3)와 같이 인덱스 요소의 합을 누적시킨다 : sum
3. 누적된 합에 배열 요소를 곱한다 
4. 곱한 값은 누적해서 더해준다 : result


### Codes

```js
function sumOfProductOfAll(...array) {
  let sum = 0;
  let result;
  for (let i = 0; i < array.length; i++) {
    if (i !== 0) {
      result += sum * array[i];
    }
    sum += array[i];
  }
  return result;
}
```

