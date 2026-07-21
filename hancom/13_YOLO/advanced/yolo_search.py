from ultralytics import solutions

import ssl, os
ssl._create_default_https_context = ssl._create_unverified_context
os.environ["CURL_CA_BUNDLE"] = ""
os.environ["REQUESTS_CA_BUNDLE"] = ""

# 1. 검색 및 생성
app = solutions.SearchApp(
    # data=""
    device="cpu"
)

# 2. 웹 서버 실행 => 브라우저에서 자동 오픈
app.run(debug=True)