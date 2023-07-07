document.addEventListener("DOMContentLoaded", function () {
  // 현재 URL에서 쿼리 매개변수를 가져와 memoId 변수에 할당
  const urlParams = new URLSearchParams(window.location.search);
  const memoId = urlParams.get("id");
  console.log(memoId);

  // 세션 스토리지에서 "memos"라는 키로 저장된 데이터를 가져와 memos 변수에 할당
  let memos = JSON.parse(sessionStorage.getItem("memos")) || [];

  // memos.forEach를 사용하여 memos 배열을 반복하면서 memo.id.toString() === memoId 조건을 만족하는 메모를 찾기
  memos.forEach((memo) => {
    if (memo.id.toString() === memoId) {
      document.getElementById("date").textContent = memo.date;
      document.getElementById("content").value = memo.content;
    }
  });
});

// 메모를 수정하고 수정 버트늘 클릭했을 때 호출
function correctionContent() {
  // 현재 URL에서 쿼리 매개변수를 가져와 memoId 변수에 할당
  const urlParams = new URLSearchParams(window.location.search);
  const memoId = urlParams.get("id");

  // 세션 스토리지에서 "memos"라는 키로 저장된 데이터를 가져와 memos 변수에 할당
  let memos = JSON.parse(sessionStorage.getItem("memos")) || [];

  memos.forEach((memo) => {
    if (memo.id.toString() === memoId) {
      memo.content = document.getElementById("content").value;
      sessionStorage.setItem("memos", JSON.stringify(memos));
      window.location.href = "main.html";
    }
  });
}

// 삭제
function deleteContent() {
  const urlParams = new URLSearchParams(window.location.search);
  const memoId = urlParams.get("id");

  if (!memoId) {
    // memoId가 없을 경우 바로 메인 페이지로 이동
    window.location.href = "main.html";
    return;
  }

  let memos = JSON.parse(sessionStorage.getItem("memos")) || [];

  // 해당 memoId에 대한 메모 삭제
  for (let i = 0; i < memos.length; i++) {
    if (memos[i].id.toString() === memoId) {
      memos.splice(i, 1);
      i--; // 요소가 삭제되면 인덱스를 하나 줄여야 다음 요소를 올바르게 처리할 수 있음
    } else if (parseInt(memos[i].id) > parseInt(memoId)) {
      memos[i].id = (parseInt(memos[i].id) - 1).toString();
    }
  }

  // 해당 memoId에 대한 comments 배열 삭제
  let comments = JSON.parse(sessionStorage.getItem("comments")) || [];
  delete comments[memoId];

  sessionStorage.setItem("memos", JSON.stringify(memos));
  sessionStorage.setItem("comments", JSON.stringify(comments));

  window.location.href = "main.html";
}
