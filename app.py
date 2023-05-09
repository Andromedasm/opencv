from flask import Flask, request, jsonify
import base64
import cv2
import numpy as np
import face_recognition
import mysql.connector
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/api/attendance', methods=['POST'])
def attendance():
    data = request.get_json()
    image_data = data['image']

    # 解码图像数据
    image_data = base64.b64decode(image_data.split(',')[1])
    image = cv2.imdecode(np.frombuffer(image_data, np.uint8), cv2.IMREAD_COLOR)

    # 调用人脸识别和考勤函数
    result = process_image(image)

    return jsonify(result)

# 假设你已经创建了一个名为 `employee_faces` 的字典，其中包含员工 ID 和他们的人脸编码
employee_faces = {}

def process_image(image):
    face_locations = face_recognition.face_locations(image)
    face_encodings = face_recognition.face_encodings(image, face_locations)

    for face_encoding in face_encodings:
        # 尝试与已知的员工脸部匹配
        matches = face_recognition.compare_faces(employee_faces.values(), face_encoding)

        if True in matches:
            matched_employee_id = list(employee_faces.keys())[matches.index(True)]
            record_attendance(matched_employee_id)
            return {"status": "success", "employee_id": matched_employee_id}
        else:
            return {"status": "unknown_face"}

def create_db_connection():
    connection = mysql.connector.connect(
        host="your_db_host",
        user="your_db_user",
        password="your_db_password",
        database="your_db_name"
    )
    return connection

def record_attendance(employee_id):
    connection = create_db_connection()
    cursor = connection.cursor()

    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    try:
        # 插入考勤记录
        query = "INSERT INTO attendance_records (employee_id, timestamp) VALUES (%s, %s)"
        cursor.execute(query, (employee_id, current_time))
        connection.commit()
    except mysql.connector.Error as error:
        print("Error inserting attendance record: {}".format(error))
    finally:
        cursor.close()
        connection.close()

if __name__ == '__main__':
    app.run(debug=True)
