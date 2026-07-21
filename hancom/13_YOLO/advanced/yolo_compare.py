import os

from ultralytics import YOLO
import cv2
import time

# 0. OpenVINO 모델이 없으면 먼저 내보내기
if not os.path.isdir("yolo11n_openvino_model"):
    YOLO("yolo11n.pt").export(format="openvino")

# 1. 모델 선택
# model = YOLO("yolo11n.pt")
model = YOLO("yolo11n_openvino_model/")

# 2. 비디오 경로 설정
cap = cv2.VideoCapture("http://210.99.70.120:1935/live/cctv013.stream/playlist.m3u8")

# 3. 프레임 처리
while cap.isOpened():
    success, frame = cap.read()
    if not success:
        break

    # 3-1. 추론 시간 측정
    start_time = time.perf_counter()
    results = model(frame, verbose=False)
    end_time = time.perf_counter()

    # 3-2 FPS 계산
    model_time = end_time - start_time
    fps = 1 / model_time

    #3-3 결과 그리고 FPS 표시
    annotated_frame = results[0].plot()
    cv2.putText(annotated_frame, f"{fps:.1f} FPS", (10,30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    
    cv2.imshow("YOLO FPS", annotated_frame)

    # 3-4 q 키로 종료
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# 4. 자원 해제
cap.release()
cv2.destroyAllWindows()    