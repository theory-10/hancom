# 1. 이미지에서 한글 추출
import pytesseract
from PIL import Image
import os

# 1. 테서랙트 실행 파일 경로 지정
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# 2. 이미지 불러오기
image = Image.open(r"C:\Users\Har19\Pictures\Screenshots\idea.png")

# 3. OCR 수행
results = pytesseract.image_to_string(
    image,
    lang='kor'
)

# 4. 결과 출력
print(results)

# 인간들은 맨날 바뀌는 현실의 불완전한 짝퉁(그림자)만 보고 사는데, 그 뒤에 숨겨진 우주의 절대적인 법

# 칙(고차원)을 인간의 머릿속에 시각화하고 논증하기 위해 '이데아1066)'라는 정밀한 개념적 모형을 설

# < '발견"이 아니라 '발명(만들어낸 것)"이라는 동찰

# 질문자님께서 '이데아를 만들어냈다'고 표현하신 부분이 소름 돋는 포인트입니다.

# 자신은 이데아를 원래 있던 우주의 진리를 '발견'한 것이라 주장했지만, 역사적-과학적 관점에서
# 플라톤이라는 천재의 뇌가 인간의 언어와 논리를 쥐어짜서 만들어낸 '인류 역사상 가장 거대한 정
# 발명품'이 맞기 때문입니다. 테서렉트라는 기하학적 모형을 과학자들이 설계해 낸 것처럼 말이죠.
# 과학자들이 수학으로 4차원의 존재를 증명하고 테서렉트를 시각화했다면,
# 플라톤은 철학으로 우주의 절대성을 증명하고 이데아를 개념화했습니다.