from ultralytics import solutions
import cv2

# 1. 비디오 경로 설정
cap =cv2.VideoCapture(0)

# 2. 모델 로드 및 블러 객체 설정
blurrer = solutions.ObjectBlurrer(
    model="yolo11n.pt",
    show=True,
    blur_ratio=0.3     # 블러 강도 (0.0~1.0, 높을수록 더 흐림)
)

# 3. 비디오 프레임 처리
while cap.isOpened():
    success, frame = cap.read()
    if not success:
        print("웹캠 읽기 실패")
        break

    # 3-1. 탐지 => 박스 영역 자동 블러 (show=True라 라이브러리가 창을 자동으로 띄움)
    results = blurrer(frame)

    # 3-2. q 키를 눌러서 종료
    if cv2.waitKey(1) & 0xFF == ord('q'):
        print("q를 눌러서 종료")
        break

# 4. 자원 해제
cap.release()
cv2.destroyAllWindows()