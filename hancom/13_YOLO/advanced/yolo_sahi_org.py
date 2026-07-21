from ultralytics import YOLO
import cv2
import os

# 1. 모델 로드
model = YOLO("yolo11n.pt")

# 2. 이미지 경로
input_image_path = "demo_data/image_2.png"

# 3. 결과 시각화
results = model(input_image_path)

# 4. 결과 저장
annotated_frame = results[0].plot()

os.makedirs("sahi", exist_ok=True)
output_image_path = "sahi/result.jpg"
cv2.imwrite(output_image_path, annotated_frame)

# 5. 탐지 개수 출력
detected = len(results[0].boxes)

print("=============")
print(f"기본 YOLO 추론 완료")
print(f"탐지 수: {detected}")