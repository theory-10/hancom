import pyfiglet  # pyfiglet 라이브러리 전체 불러오기
from termcolor import colored  # termcolor 라이브러리에서 colored 함수만 불러오기

#sentence = "Hello"
# print(sentence)

py_text = pyfiglet.figlet_format("hello")

color_text = colored(py_text, "green")
print(color_text)

#sentence = pyfiglet.figlet_format(sentence)  # 아스키 아트 글자로 변환
#sentence = colored(sentence,"red")  # 글자 색상을 빨간색으로 지정
# print(sentence)

# | | | | ___| | | ___  
# | |_| |/ _ \ | |/ _ \ 
# |  _  |  __/ | | (_) |
# |_| |_|\___|_|_|\___/ 
                      