import cv2
from ultralytics import solutions

# 1. 비디오 경로 설정
cap = cv2.VideoCapture("http://210.99.70.120:1935/live/cctv013.stream/playlist.m3u8")

# 2. 속도 추정 객체 생성 및 모델 로드
yolo_speed = solutions.SpeedEstimator(
    model="yolo11n.pt",
    show=True,
    max_speed=120,
    meter_per_pixel=0.5,
    classes=[2],
    line_width=2
)
# 3. 프레임 처리 루프
while cap.isOpened():
    success, frame = cap.read()
    if not success:
        print("프레임 읽기 실패")
        break
    # 3-1. 속도 계산 및 추적 수행
    results = yolo_speed(frame)

    # 3-2. 처리된 프레임 표시
    if  cv2.waitKey(1) & 0xFF == ord('q'):
        print("q 키를 눌러서 종료합니다.")
        break

# 4. 자원 해제
cap.release    