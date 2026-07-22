from transformers import pipeline


# 1. 요약 파이프라인 생성
summarizer = pipeline(
    "summarization",
    model="t5-small"
)

# 2. 요약할 원문
text = """Platonism, founded by the ancient Greek philosopher Plato, 
asserts that the physical world is merely an imperfect shadow of a higher, 
eternal reality. At the core of his philosophy is the Theory of Forms, 
which posits that non-physical, abstract ideals represent the most accurate reality. 
Through works like The Republic, Plato argued that true knowledge is attained not through bodily senses,
but through rational philosophical inquiry.
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