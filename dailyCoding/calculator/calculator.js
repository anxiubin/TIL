const result = document.querySelector(".result");
const refresh = document.querySelector(".refresh");
const operator = document.querySelectorAll(".operator");
const number = document.querySelectorAll(".number");

let printedNum = "";
let numB = null;
let ClickedOp = false;
let middleValue = 0;
let preoperator = "="; // 이전 연산자
let curroperator = ""; // 현재 연산자
let repeatClick = 0; // 연산자 클릭 횟수

function print(event) {
  repeatClick = 0;
  if (ClickedOp === false) {
    printedNum += event.target.value;
    result.value = printedNum;
  } else {
    printedNum = event.target.value;
    result.value = printedNum;
    ClickedOp = false;
  }
}

function setValue(curr) {
  ClickedOp = true;
  preoperator = curr; // 현재 누른 연산자를 preoperator에 대입
  numB = null;
  result.value = middleValue; // 화면에 누적값 출력
}

function clickOperator(event) {
  console.log(repeatClick);
  curroperator = event.target.value;
  repeatClick++;
  if (repeatClick > 1) {
    //1회 이상 누를 경우 마지막 연산자 실행
    preoperator = curroperator;
    return false;
  }
  if (preoperator === "=") {
    // preoperator 초기값
    middleValue = result.value; // 처음 시작할때 누적값은 화면에 처음 입력한 숫자
  } else {
    numB = result.value; // 등호 연산자 안누르면 현재 입력한 숫자값 대입
  }
  if (middleValue !== null && numB !== null) {
    switch (
      preoperator //숫자1+연산자+숫자2 일때 숫자 2 전에 누른 연산자로 계산
    ) {
      case "+":
        middleValue = parseFloat(middleValue) + parseFloat(numB);
        break;
      case "-":
        middleValue = parseFloat(middleValue) - parseFloat(numB);
        break;
      case "*":
        middleValue = parseFloat(middleValue) * parseFloat(numB);
        break;
      case "/":
        middleValue = parseFloat(middleValue) / parseFloat(numB);
        break;
      default:
        break;
    }
  }
  setValue(curroperator); // 각종 값 설정
  if (curroperator === "=") {
    // 현재 등호 연산자를 눌렀을 경우 누적값 화면에 출력
    result.value = middleValue;
    repeatClick = 0; //클릭횟수 초기화
  }
}

function refreshed() {
  // c  누른 경우 초기화
  printedNum = "";
  numB = null;
  ClickedOp = false;
  middleValue = 0;
  preoperator = "=";
  curroperator = "";
  result.value = 0;
}

function init() {
  number.forEach(function(num) {
    num.addEventListener("click", print);
  });
  operator.forEach(function(key) {
    key.addEventListener("click", clickOperator);
  });
  refresh.addEventListener("click", refreshed);
}

init();
