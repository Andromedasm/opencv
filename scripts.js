const video = document.getElementById("video");
const captureButton = document.getElementById("captureButton");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// 获取用户设备上的摄像头并开始视频预览
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error("Error accessing camera: ", error);
    });

// 拍照并显示在画布上
captureButton.addEventListener("click", () => {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    // 将拍摄的照片发送给后端进行人脸识别和考勤
    sendImageToServer(canvas.toDataURL("image/jpeg"));
});

function sendImageToServer(imageData) {
    // 向后端发送图像数据进行人脸识别和考勤
    // 这里需要替换为你的后端 API 地址
    const apiURL = "http://your_server_address/api/attendance";

    fetch(apiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ image: imageData })
    })
        .then(response => response.json())
        .then(data => {
            console.log("Attendance result: ", data);
        })
        .catch(error => {
            console.error("Error sending image to server: ", error);
        });
}
