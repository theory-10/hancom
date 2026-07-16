x = 10                                     #int
y = 3.14                                   #float
name = "python"                            #str
is_fun = True                              #bool 
colors = ["r","g","b"]                     #list
coords = (10, 20)                          #tuple
person = { "name": "Tom", "age": 30}       #dict 
nums = {1, 2, 3}                           #set
nothing =None                              #NoneType

# 네이밍 스타일 (Python)
# snake_case => 변수명, 함수명
# PascalCase => 클래스 명
# CamelCase => JS

print(type(name))
print(type(is_fun))
# <class 'bool'>
print(isinstance(x, int))
# True
print(isinstance(x, str))
# False