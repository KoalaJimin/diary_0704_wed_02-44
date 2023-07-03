//오늘 날짜 받아오기
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
  year + "년 " + month + "월 " + date + "일 " + getTodayLabel(day) + "요일";

//저장, 메인페이지에 넘겨주기
let memos = JSON.parse(sessionStorage.getItem("memos"));
memos = memos ?? [];

function saveDiary() {
  let newMemo = {};
  let memoDate =
    year + "년 " + month + "월 " + date + "일 " + getTodayLabel(day) + "요일";
  let memoText = document.getElementById("content").value;
  let memosL = JSON.parse(sessionStorage.getItem("memos")) || [];
  let id = memosL.length;
  id = id ?? 0;

  let memos = JSON.parse(sessionStorage.getItem("memos"));
  memos = memos ?? [];

  newMemo.id = id;
  newMemo.date = memoDate;
  newMemo.content = memoText;

  memos.push(newMemo);

  sessionStorage.setItem("memos", JSON.stringify(memos));

  window.location.href = `/pages/main.html?memo=${encodeURIComponent(
    JSON.stringify(newMemo)
  )}`;
}
