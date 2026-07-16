# =====
# 1. 클래스 : 제품의 설계도
# 2. 생성자 : 객체를 만들 때 실행되는 함수
# 3. 속성 : 클래스 안의 변수
# 4. 매서드 : 클래스 안의 함수
# 5. 객체 : 설계도로 만든 제품
# =====

#클래스 정의
class World:
    # 생성자 - 객체 생성 시 자동 실행
    def __init__(self, name, day):
        #속성 - 객체의 데이터 저장
        self.name = name
        self.day = day
    def hello(self):  # name 출력 메서드
        print(f"Hello, {self.name}!!")
    def world_day(self):  # day 출력 메서드
        print(f"day, is {self.day}")

# 객체 생성 - World 클래스로 asia 객체 생성
asia = World("korea", 1)


# 매서드 호출
asia.hello()      # Hello, korea!! 출력
asia.world_day()  # day, is 1 출력

