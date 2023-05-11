import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
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
        if (!name || !department || !position || !image) {
            Alert.alert('错误', '请填写所有字段并上传一张照片');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('department', department);
        formData.append('position', position);
        formData.append('image', {
            uri: image.uri,
            type: image.type,
            name: 'employee_photo.jpg',
        });

        try {
            await axios.post('http://YOUR_SERVER_IP:YOUR_SERVER_PORT/employees', formData);
            Alert.alert('成功', '员工添加成功');
            setName('');
            setDepartment('');
            setPosition('');
            setImage(null);
        } catch (error) {
            Alert.alert('错误', '添加员工失败，请稍后重试');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>姓名：</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={text => setName(text)}
            />
            <Text style={styles.label}>部门：</Text>
            <TextInput
                style={styles.input}
                value={department}
                onChangeText={text => setDepartment(text)}
            />
            <Text style={styles.label}>职位：</Text>
            <TextInput
                style={styles.input}
                value={position}
                onChangeText={text => setPosition(text)}
            />
            <Button title="选择照片" onPress={handleChoosePhoto} />
            <Button title="添加员工" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    label: {
        marginTop: 15,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
});

export default AddEmployee;
