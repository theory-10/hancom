from ultralytics import YOLO
import cv2

# 1. 모델 로드
model = YOLO("yolo11n.pt")

# 2. 모델 파라미터
model(
"input_params.jpg", # 추론할 이미지 경로
save=True,          # 결과 이미지 저장 여부
conf=0.3,           # 신뢰도
max_det=3,           # 탐지할 최대 개수
classes=[60],
save_crop=True,     # 탐지된 객체 폴더 및 이미지 저장
save_txt=True,      # 좌표 텍스트 저장 
save_conf=True      # 신뢰도 저장
)