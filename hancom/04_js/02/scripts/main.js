// const title = document.querySelecter("#title");
const title = document.querySelector("#title");
const btn = document.querySelector("#btn");

// 3. btn을 클릭하면 안쪽 함수 실행 (이벤트 연결)
btn.addEventListener("click", () => {
  // 4. 제목 글자를 "Hello world!"로 교체 (화살표 함수 안에서)
  title.textContent = "Hello world!";
});