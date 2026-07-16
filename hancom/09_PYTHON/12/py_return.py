from termcolor import colored  # termcolor에서 colored 함수만 불러오기

def highlight(text:str, color:str) -> str:  # 문자열과 색상을 받아 색상 적용된 문자열 반환
    """
    text, color를 입력받아서 text
    """

    color_text = colored(text, color)  # 텍스트에 색상 적용
    return color_text  # 색상 적용된 텍스트 반환
print(highlight("GOOD", "yellow"))  # 함수 호출 후 결과 출력

# GOOD