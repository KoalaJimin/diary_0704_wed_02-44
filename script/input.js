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
  year + "년 " + month + "월 " + date + "일 " + getTodayLabel(day) + "요일";

//저장, 메인페이지에 넘겨주기
let memos = JSON.parse(sessionStorage.getItem("memos"));
memos = memos ?? [];

function saveDiary() {
  // 새로운 일기 객체 newMemo를 생성
  let newMemo = {};
  // 일기 날짜
  let memoDate =
    year + "년 " + month + "월 " + date + "일 " + getTodayLabel(day) + "요일";
  // 일기 내용
  let memoText = document.getElementById("content").value;

  // 세션 스토리지에서 "memos"라는 키로 저장된 데이터를 가져오기
  let memosL = JSON.parse(sessionStorage.getItem("memos")) || [];
  let id = memosL.length;
  id = id ?? 0;

  let memos = JSON.parse(sessionStorage.getItem("memos"));
  memos = memos ?? [];

  // newMemo 객체에 일기 정보 설정
  newMemo.id = id;
  newMemo.date = memoDate;
  newMemo.content = memoText;

  // memos 배열에 newMemo를 추가
  memos.push(newMemo);

  // 업데이트된 memos 배열을 세션 스토리지에 저장
  sessionStorage.setItem("memos", JSON.stringify(memos));

  // 현재 페이지를 메인 페이지로 이동시키면서 일기 객체를 URL 매개변수로 전달
  window.location.href = `/pages/main.html?memo=${encodeURIComponent(
    JSON.stringify(newMemo)
  )}`;
}
