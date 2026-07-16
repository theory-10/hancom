# 람다 공식
# 함수명 = lambda 매개변수(파라미터) : 반환값

# def add(a, b):
#     return a + b
# print(add(7, 3))
# 10

# add = lambda a, b : a + b
# print(add(7, 3))
# 10

# 글자를 넣으면 큰 그림 글시로 출력(pyfiglet)해주는 lambda 함수

import pyfiglet

def decorate_text(text):
    return pyfiglet.figlet_format(text)
print(decorate_text("how"))

# decorate_text = lambda text: pyfiglet.figlet_format(text)
# py_text = decorate_text("HI")
# print(py_text) 

#  _   _ ___ 
# | | | |_ _|
# | |_| || | 
# |  _  || | 
# |_| |_|___|