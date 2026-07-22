import pytesseract
from PIL import Image
import os

# 1. 테서랙트 실행 파일 경로 지정
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# 2. 이미지 불러오기
image = Image.open("tesseract.png")

# 3. OCR 수행
results = pytesseract.image_to_string(
    image,
    lang='eng'
)

# 4. 결과 출력
print(results)

# This is a lot of 12 point text to test the
# ocr code and see if it works on all types
# of file format.

# The quick brown dog jumped over the
# lazy fox. The quick brown dog jumped
# over the lazy fox. The quick brown dog
# jumped over the lazy fox. The quick
# brown dog jumped over the lazy fox.