from ultralytics import solutions
import cv2

stream_url = "http://210.99.70.120:1935/live/cctv001.stream/playlist.m3u8"

# 1. CCTV 연결
cap = cv2.VideoCapture(stream_url)

# 2. 모델 로드
heatmap = solutions.Heatmap(
    model="yolo11n.pt",
    show=True,
    colormap=cv2.COLORMAP_MAGMA
)

# 3. 비디오 프레임 처리
while cap.isOpened():
    success, frame = cap.read()
    if not success:
        print("비디오 읽기 실패")
        break

    # 3-1. 누적 히트맵 갱신
    results = heatmap(frame)

    # 3-2. 결과 이미지 저장
    results_frame = results.plot_im

    # 3-3. 윈도우 창
    if cv2.waitKey(1) & 0xFF == ord('q'):
        print("q키를 눌러서 종료")
        break

# 4. 자원 해제

cap.release()
cv2.destroyAllWindows()