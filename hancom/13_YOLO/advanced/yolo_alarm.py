import types
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from ultralytics import solutions
import cv2

# 1. 비디오 경로 설정
stream_url = "http://210.99.70.120:1935/live/cctv001.stream/playlist.m3u8"
cap = cv2.VideoCapture(stream_url)

# 2. 이메일 인증
from_email = "theory10010@gmail.com"
password = ""
to_email = "theory10010@gmail.com"
# 3. 모델 로드 및 알람 객체 생성
google_alarm = solutions.SecurityAlarm(
    model="yolo11n.pt",
    records=2,   # 경로 이메일을 전송하기 위한 최소 감지 수
    classes=[2]

)

# 3-1. 이메일 제목 커스텀 (몽키 패치)
def custom_send_email(self, im0, records=5):
    img_bytes = cv2.imencode(".jpg", im0)[1].tobytes()
    message = MIMEMultipart()
    message["From"] = self.from_email
    message["To"] = self.to_email
    message["Subject"] = "우리집 CCTV 경보 발생!"   # 원하는 제목
    message.attach(MIMEText(f"Ultralytics alert: {records} object(s) detected."))
    message.attach(MIMEImage(img_bytes, name="ultralytics.jpg"))
    self.server.send_message(message)

google_alarm.send_email = types.MethodType(custom_send_email, google_alarm)

# 4. 이메일 서버 인증
google_alarm.authenticate(from_email, password, to_email)

# 5. 프레임 처리
while cap.isOpened():
    success, frame = cap.read()
    if not success:
        print("스트림 읽기 실패")
        break

    # 5-1. 보안 감시 수행
    results = google_alarm(frame)

    # 5-2. 결과 프레임 표시
    cv2.imshow("ALARM", results.plot_im)

    # 5-3 q키를 눌러서 종료
    if cv2.waitKey(1) & 0xFF == ord('q'):
        print("q키를 눌러서 종료")
        break

# 6. 자원 해제    
cap.release()
cv2.destroyAllWindows()


