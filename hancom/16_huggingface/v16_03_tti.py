import os
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="fal-ai",
    api_key=os.environ["HF_TOKEN"],
)

# 사용자 입력 받기
answer = input("생성할 이미지를 설명해주세요. ")

# output is a PIL.Image object
image = client.text_to_image(
    
    answer,
    model="black-forest-labs/FLUX.1-dev",
)

# 생성된 이미지 저장
image.save(tti_result.jpg)

# 완료 메세지 출력
print("전체 코드가 잘 실행됐습니다.")