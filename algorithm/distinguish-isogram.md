# JavaScript
Distinguish whether a string is "isogram" or not


### Precondition

1. 빈문자열은 true 리턴
2. 같은 문자가 반복되지 않는 단어라면 true 리턴
3. 반복되는 문자가 있다면 false 리턴



```js
isIsogram("Dermatoglyphics"); // true
isIsogram("aba"); // false
isIsogram("moseE"); // false 
```

### Pseudocode

1. 빈문자열이면 true 리턴
2. 대소문자 무시하기 위해 lowercase
3. 새로운 객체 생성
4. for 반복문 돌리면서 객체에 각 문자를 키값으로 넣기
5. 이미 객체에 있는 키라면 false 리턴
6. 겹치지 않고 모든 문자열이 객체에 들어간다면 true 리턴


### Codes

```js
function isIsogram(str) {
  if(str.length === 0) {
    return true;
  }

  let obj = {};
  let lowerStr = str.toLowerCase();

  for(let i = 0; i < lowerStr.length; i++) {
    if(obj[lowerStr[i]]) {
      return false;
    }
    obj[lowerStr[i]] = 1;
  }

  return true;
}
```
