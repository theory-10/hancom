from transformers import pipeline

# 1. 텍스트 생성 파이프 라인
generator = pipeline(
    "text-generation",
    model="skt/kogpt2-base-v2"
)
# 2. 시드 문장 입력
answer = input("생성 문장을 입력해주세요:")

# 3. 텍스트 생성 실행
result = generator(
    answer,
    max_new_tokens=50, # 추가 생성할 토큰 수
    num_return_sequences=1,
    truncation=True
)

# 4. 결과 확인
print(result[0]["generated_text"])