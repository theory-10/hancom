from transformers import pipeline
from deep_translator import GoogleTranslator

def trans_en_to_ko(sentence):
    translated_sen = GoogleTranslator(source='en', target='ko').translate(sentence)
    return translated_sen


# 1. 요약 파이프라인 생성
summarizer = pipeline(
    "summarization",
    model="t5-small"
)

# 2. 요약할 원문
text = """the theory of forms, founded by the ancient Greek philosopher Plato, 
argues that the physical world is merely an imperfect shadow of a higher, eternal reality .
at the core of his philosophy is the Theory of Forms .
"""

# 3. 요약 실행
summary = summarizer(
    text,
    min_length=20,
    max_length=200,
    do_sample=False

)
# 4. 결과 확인
sum_text = summary[0]['summary_text']
print (f"요약된 문장 : {sum_text}")

# 5. 번역 실행 (영어 -> 한국어)
kr_sum_text = trans_en_to_ko(sum_text)
print(f"번역된 한국어 문장 : {kr_sum_text}")

# 번역된 한국어 문장 : 
# 고대 그리스 철학자 플라톤이 창시한 형태 이론은 
# 물리적 세계가 단지 더 높고 영원한 현실의 불완전한 그림자일 뿐이라고 주장합니다.