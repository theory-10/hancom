def meters_to_feet(meters):  # 미터를 피트로 변환하는 함수
    feet = meters * 3.28084
    return feet

while True:  # 올바른 값이 입력될 때까지 반복
    # 사용자 입력
    user_input = input("미터 값을 입력해주세요: ")

    # 예외 처리
    try:
        meters = float(user_input)  # 문자열을 실수로 변환
        feet = meters_to_feet(meters)  # 미터 → 피트 변환
        print(f"{meters}m는 {feet}ft 입니다.")
        break  # 정상 입력 시 반복 종료
    except ValueError:
        print("숫자를 입력해주세요.")  # 숫자가 아닌 값 입력 시 재입력 요청    