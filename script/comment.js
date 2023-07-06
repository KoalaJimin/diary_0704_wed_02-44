let comments = JSON.parse(sessionStorage.getItem("comments"));
comments = comments ?? [];

//게시물Id 가져오기
const urlParams = new URLSearchParams(window.location.search);
const memoId = urlParams.get("id");
comments[memoId] = comments[memoId] ?? [];

//배열에 댓글 저장
function saveComment() {
  const newComment = document.getElementById("writeInput").value;

  comments[memoId].push(newComment);

  sessionStorage.setItem("comments", JSON.stringify(comments));

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
  // 수정된 부분: commentBox를 추가하는 대신, commentBoxArea에 마지막 자식으로 추가
  const commentBoxArea = document.getElementById("commentBoxArea");
  commentBoxArea.appendChild(commentBox);

  // 입력 필드 비우기
  document.getElementById("writeInput").value = "";
  updateCommentCount();
}

const elements = document.getElementById("commentBoxArea"); // Document 대문자로 수정
elements.innerHTML = "";

//댓글 생성
for (let i = comments[memoId].length - 1; i >= 0; i--) {
  let commentBox = document.createElement("div");
  commentBox.classList.add("commentBox");

  let profileImg = document.createElement("img");
  profileImg.setAttribute("src", "/images/profile.png");
  profileImg.setAttribute("id", "profile");

  let name = document.createElement("img");
  name.setAttribute = ("src", "/images/미영.png");
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
