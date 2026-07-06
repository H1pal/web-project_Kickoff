const reportForm = document.querySelector("#report_form form");

reportForm.addEventListener("submit", () => { // 제출 이벤트 발생 시 익명 함수가 실행
  alert("신고 접수가 성공적으로 완료되었습니다."); // 알림창 띄우기
});

/* 아래에 보이는 코드는 제출이벤트는 감지하지 못하고 클릭 시에만
 이벤트가 발생하기 때문에 폼 제출 조건이 완충되지 않음
 */
// const submitButton = document.querySelector('.bt_submit');

// submitButton.addEventListener("click", () => {
//   alert("신고 접수가 성공적으로 완료되었습니다.")
// });


/* '약도 보기' 버튼 클릭 시 일반 알알러트 동작 */
let coordination;
const mapButton = document.getElementById("map_bt");

mapButton.addEventListener("click", () => {
  prompt('좌표 값: ', coordination);
  alert("@@ 지도 @@");
});

const inputFile = document.getElementById("report_file");
const fileUploadBox = document.querySelector(".file_upload_box");


/* 파일로 불러온 이미지를 화면에 보이게 하기 (AI 활용) */
inputFile.addEventListener('change', function(e) {
    const file = e.target.files[0]; // 사용자가 선택한 첫 번째 파일

    // 만약 선택된 파일이 있다면
    if (file) {
        const reader = new FileReader(); // 파일을 읽어줄 리더 객체 생성(객체 지향형 프로그램)

        // 파일을 성공적으로 다 읽었을 때 실행할 작업 지정
        reader.onload = function(event) {
            // 박스 내부의 기존 텍스트("여기를 클릭하여...")를 지우고 이미지를 집어넣음
            fileUploadBox.innerHTML = `<img src="${event.target.result}" class="file_preview_img" alt="미리보기">`;
        };

        // 파일을 데이터 URL(이미지 주소)로 읽어옵니다.
        reader.readAsDataURL(file);
    } else {
        // 만약 취소해서 파일이 없어졌다면 원래 텍스트로 복구
        fileUploadBox.innerHTML = `<span class="upload_text">여기를 클릭하여 사진을 첨부하세요.</span>`;
    }
});