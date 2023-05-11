import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const CheckIn = () => {
    const [image, setImage] = useState(null);

    const handleChoosePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                setImage(response);
            }
        });
    };

    const handleSubmit = async () => {
        if (!image) {
            Alert.alert('错误', '请上传一张照片');
            return;
        }

        const formData = new FormData();
        formData.append('image', {
            uri: image.uri,
            type: image.type,
            name: 'check_in_photo.jpg',
        });

        try {
            const response = await axios.post('http://YOUR_SERVER_IP:YOUR_SERVER_PORT/attendance/check_in', formData);
            Alert.alert('成功', `签到成功，员工ID：${response.data.employee_id}`);
            setImage(null);
        } catch (error) {
            Alert.alert('错误', '签到失败，请稍后重试');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="选择照片" onPress={handleChoosePhoto} />
            <Button title="签到" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
});

export default CheckIn;
