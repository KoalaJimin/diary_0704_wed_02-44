let comments = JSON.parse(sessionStorage.getItem("comments"));
comments = comments ?? [];

//게시물Id 가져오기
const urlParams = new URLSearchParams(window.location.search);
const memoId = urlParams.get("id");
comments[memoId] = comments[memoId] ?? [];

//배열에 댓글 저장
function saveComment() {
  const newComment = document.getElementById("commentInput").value;

  comments[memoId].push(newComment);

  sessionStorage.setItem("comments", JSON.stringify(comments));

  const commentBox = document.createElement("div");
  commentBox.classList.add("commentBox");

  const profileImg = document.createElement("img");
  profileImg.setAttribute("src", "/images/profile.png");
  profileImg.setAttribute("id", "profile");

  const name = document.createElement("div");
  name.textContent = sessionStorage.getItem("userName");
  name.classList.add("name");

  const commentContent = document.createElement("div");
  commentContent.textContent = newComment;
  commentContent.classList.add("commentContent");

  commentBox.append(profileImg, name, commentContent);
  elements.prepend(commentBox);
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

  let name = document.createElement("div");
  name.textContent = sessionStorage.getItem("userName");
  name.classList.add("name");

  let commentContent = document.createElement("div");
  commentContent.textContent = comments[memoId][i];
  commentContent.classList.add("commentContent");

  commentBox.append(profileImg, name, commentContent);
  elements.append(commentBox);
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const commentId = urlParams.get("id");

    const commentCount = comments[commentId].length;

    document.getElementById("count").innerHTML = "댓글(" + commentCount + ")";
  });