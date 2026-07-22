from transformers import pipeline  # 허깅페이스에서 미리 학습된 AI 모델을 쉽게 불러다 쓰게 해주는 라이브러리

# 1. 감정 분석 파이프라인 생성
# pipeline("sentiment-analysis")는 텍스트가 긍정(POSITIVE)인지 부정(NEGATIVE)인지 판별해주는
# 사전학습 모델을 자동으로 다운로드하고 불러온다 (처음 실행 시 인터넷 연결 필요, 모델 다운로드로 시간이 걸릴 수 있음)
classifier = pipeline("sentiment-analysis")

# 2. 감정 분석할 문장 입력
text = "I'm hard time today"
results = classifier(text)  # classifier에 문장을 넣으면 분석 결과를 리스트 형태로 반환 (예: [{'label': 'NEGATIVE', 'score': 0.99}])

# 3. 결과 확인
print(f"감정 분석 결과 : {results[0]['label']}")  # results는 리스트라서 [0]으로 첫 번째(유일한) 결과 딕셔너리를 꺼냄, label = POSITIVE 또는 NEGATIVE
print(f"감정 분석 점수 : {results[0]['score']:.4f}")  # score = 그 판단에 대한 신뢰도(확률), 0~1 사이 값. 1에 가까울수록 확신이 높음

# 텍스트 입력 결과
# 감정 분석 결과 : POSITIVE
# 감정 분석 점수 : 0.9999

# 감정 분석 결과 : NEGATIVE
# 감정 분석 점수 : 0.9960