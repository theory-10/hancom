import streamlit as st
from ultralytics import YOLO
import cv2
import pandas as pd
import plotly.express as px
import time

# 1. 화면 구성 / 화면을 좌우 2칸 분할
col1, col2 = st.columns(2)

with col1:
    frame_placeholder = st.empty()

with col2:
    chart_placeholder = st.empty()    

# 2. 비디오 경로 설정
cap = cv2.VideoCapture("http://210.99.70.120:1935/live/cctv013.stream/playlist.m3u8")

# 3. 모델 로드 / 캐시로 1회만 로드
@st.cache_resource
def load_model():
    return YOLO("yolo11n.pt")

model = load_model()

# 4. 비디오 프레임 처리 / 영상 한장씩 분석 + 그래프 동시 갱신
while cap.isOpened():
    success, frame = cap.read()
    if not success:
        st.warning("CCTV FRAME ERROR")
        break

    # 4-1. yolo 모델 객체 탐지 수행 / ai에게 사진 보여주기
    results = model(frame)

    # 4-2. 탐지 결과가 그려진 프레임 이미지 생성
    annoted_frame = results[0].plot()

    # 4-3. 탐지된 객체의 클래스 이름 추출
    labels = [model.names[int(c)] for c in results[0].boxes.cls]

    # 4-4. 탐지 객체 수 시각화
    if labels:
        df_count = pd.DataFrame({"Object" : labels})
        df_count = df_count.value_counts().reset_index(name="Count")

        fig = px.bar(
            df_count,
            x="Object",
            y="Count",
            title="탐지 객체 수",
            color="Object",
            text="Count"
        )
    else:
        df_count = pd.DataFrame({"Object": [], "Count": []})    

        fig = px.bar(
            df_count,
            x="Object",
            y="Count",
            title="탐지 객체 수"
        )

    # 4-5. Streamlit에 결과 표시 / 왼쪽 영상 + 오른쪽 그래프 동시 갱신
    frame_placeholder.image(annoted_frame, channels="BGR")
    chart_placeholder.plotly_chart(fig, use_container_width=True, key=f"chart_{time.time()}")    

    # 5. 자원 해제
cap.release()
cv2.destroyAllWindows()