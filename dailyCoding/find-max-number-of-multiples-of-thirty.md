# JavaScript
How to find Max number of multiples of thirty


### Precondition

1. 주어진 숫자를 섞어 30배수의 가장 큰 수 찾기
2. 그 수가 존재하지 않는다면 -1 리턴

```js
MaxMultiplesOfThirty(4095) // 9540 
MaxMultiplesOfThirty(1023) // 3210 
MaxMultiplesOfThirty(4800) // 8400
```


### Pseudocode

1. 3의 배수 판정법을 이용한다: 모든 자리의 수의 합이 3의 배수이면 그 숫자는 3의 배수이다
2. 30의 배수를 찾아야 하므로 무조건 1의 자리는 0이다
3. if 문 => 모든 자릿수 합이 3의 배수 && 1의 자리 === 0  충족 못하면 -1 리턴
4. 위 조건이 맞으면 가장 큰 수를 찾기 위해 내림차순으로 숫자 정렬 : array.sort
5. 정렬한 배열을 다시 숫자로 변환 : Number


### Codes

```js
function MaxMultiplesOfThirty(num) {
  let sum = 0;
  let str = String(num)
  let word = str.split('');
  for(let i = 0; i < str.length; i++) {
    sum = sum + Number(str[i]);
  }
  if(str.includes(0) === false || (sum % 3 !== 0)) {
    return -1;
  }
  else if(str.includes(0) === true && (sum % 3 === 0)) {
    word.sort(function(a,b) {
      return b - a;
    })
    return Number(word.join(''));
  }
}
```


#### need to study

* Divisibility rule

