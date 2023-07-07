/* 세션 스토리지에 저장된 "comments"라는 키로 저장된 데이터 가져오기
 가져온 데이터가 존재하지 않는 경우, 빈 배열로 초기화 */
let comments = JSON.parse(sessionStorage.getItem("comments"));
comments = comments ?? [];

// 게시물Id 가져오기
// 현재 URL에서 쿼리 매개변수를 가져와서 memoId 변수에 할당
const urlParams = new URLSearchParams(window.location.search);
const memoId = urlParams.get("id");
comments[memoId] = comments[memoId] ?? [];

// 배열에 댓글 저장
function saveComment() {
  // 사용자가 입력한 새로운 댓글을 가져와서 comments 배열의 memoId에 해당하는 배열에 추가
  const newComment = document.getElementById("writeInput").value;

  comments[memoId].push(newComment);

  // 업데이트된 comments 배열을 다시 세션 스토리지에 저장
  sessionStorage.setItem("comments", JSON.stringify(comments));

  // 새로운 댓글을 표시하기 위해 HTML 요소를 동적으로 생성
  const commentBox = document.createElement("div");
  commentBox.classList.add("commentBox");

  const profileImg = document.createElement("img");
  profileImg.setAttribute("src", "/images/profile.png");
  profileImg.setAttribute("id", "profile");

  const name = document.createElement("img");
  name.setAttribute("src", "/images/미영.png");
  name.setAttribute("id", "name");

  const commentContent = document.createElement("div");
  commentContent.textContent = newComment;
  commentContent.classList.add("commentContent");

  commentBox.append(profileImg, name, commentContent);

  // commentBoxArea라는 id를 가진 요소의 마지막 자식으로 추가
  // 새로운 댓글이 원래 있던 댓글 아래에 표시되도록
  const commentBoxArea = document.getElementById("commentBoxArea");
  commentBoxArea.appendChild(commentBox);

  // 입력 필드 비우기
  document.getElementById("writeInput").value = "";

  // 댓글 추가 시 댓글 개수 업데이트
  updateCommentCount();
}

const elements = document.getElementById("commentBoxArea");
elements.innerHTML = "";

//댓글 생성
for (let i = comments[memoId].length - 1; i >= 0; i--) {
  let commentBox = document.createElement("div");
  commentBox.classList.add("commentBox");

  let profileImg = document.createElement("img");
  profileImg.setAttribute("src", "/images/profile.png");
  profileImg.setAttribute("id", "profile");

  let name = document.createElement("img");
  name.setAttribute("src", "/images/미영.png");
  name.setAttribute("id", "name");

  let commentContent = document.createElement("div");
  commentContent.textContent = comments[memoId][i];
  commentContent.classList.add("commentContent");

  commentBox.append(profileImg, name, commentContent);
  elements.prepend(commentBox);
}

function updateCommentCount() {
  const urlParams = new URLSearchParams(window.location.search);
  const commentId = urlParams.get("id");

  const commentCount = comments[commentId].length;

  document.getElementById("commentCount").textContent = commentCount;
}

document.addEventListener("DOMContentLoaded", function () {
  updateCommentCount();
});
