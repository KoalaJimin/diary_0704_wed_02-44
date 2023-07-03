//회원가입 페이지로 이동
function goToJoinPage() {
  window.location.href = "join.html";
}

//엔터키를 누르면 로그인
$("#loginForm").keypress(function (e) {
  if (e.keyCode === 13) {
    login();
  }
});
function login() {
  const userName = document.getElementById("userNameInput").value;
  console.log(userName);
  sessionStorage.setItem("userName", userName);

  window.location.href = "main.html";
}
