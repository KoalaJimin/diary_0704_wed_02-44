//오늘 날짜 생성
let today = new Date();

let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
let day = today.getDay();

function getTodayLabel(num) {
  var week = new Array("일", "월", "화", "수", "목", "금", "토");
  var todayLabel = week[num];

  return todayLabel;
}

document.getElementById("date").innerHTML =
  year + "년 " + month + "월 " + date + "일 ";

// 일기 작성 페이지로 이동
function goToInputPage() {
  window.location.href = "input.html";
}

// 리스트 탭으로 변경
function goToListPage() {
  window.location.href = "mainList.html";
}

// 받아온 값으로 새로운 화이트박스 생성
let memos = JSON.parse(sessionStorage.getItem("memos"));
memos = memos ?? [];

document.addEventListener("DOMContentLoaded", function () {
  const elements = document.getElementById("whiteBoxArea");

  if (elements === null) {
    console.error("content-list element not found");
    return;
  }

  elements.innerHTML = ""; // 기존의 메모들을 초기화

  // memos 배열이 비어있는 경우 "No memos found"라는 메시지를 출력하고 함수를 종료
  if (!memos || memos.length === 0) {
    console.log("No memos found");
    return;
  }

  // 화이트박스 생성
  for (let i = memos.length - 1; i >= 0; i--) {
    let whiteBox = document.createElement("div");
    whiteBox.classList.add("white-box");
    whiteBox.dataset.id = i; // 데이터셋에 id 속성 추가

    let box = document.createElement("div");
    box.classList.add("whiteBox");

    let date = document.createElement("div");
    date.textContent = memos[i].date;
    date.classList.add("boxDate");

    let line = document.createElement("div");
    line.classList.add("line");

    let content = document.createElement("div");
    content.setAttribute("id", "content" + (i + 1));
    content.textContent = memos[i].content;
    content.classList.add("whiteBoxContent");

    // box에 date, line, content 요소를 추가
    // whiteBox에 box를 추가
    // whiteBox를 elements에 추가
    box.append(date, line, content);
    whiteBox.append(box);
    elements.append(whiteBox);
  }

  // white-box 클래스를 가지는 화이트박스에 대해 클릭 이벤트를 추가
  const whiteBoxes = document.querySelectorAll(".white-box");
  whiteBoxes.forEach(function (whiteBox) {
    whiteBox.addEventListener("click", onWhiteBoxClick);
  });
});

// 클릭이 발생하면 onWhiteBoxClick 함수가 호출
// 해당 화이트박스의 데이터셋에 저장된 인덱스 값을 사용하여 "check.html"로 페이지를 이동
function onWhiteBoxClick() {
  const whiteBoxId = this.dataset.id;
  window.location.href = "/pages/check.html?id=" + whiteBoxId;
}

// 로그아웃
function goToLoginPage() {
  window.location.href = "login.html";
}
