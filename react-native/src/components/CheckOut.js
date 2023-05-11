import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const CheckOut = () => {
    const [employeeId, setEmployeeId] = useState('');

    const handleSubmit = async () => {
        if (!employeeId) {
            Alert.alert('错误', '请输入员工ID');
            return;
        }

        try {
            await axios.post('http://YOUR_SERVER_IP:YOUR_SERVER_PORT/attendance/check_out', { employee_id: employeeId });
            Alert.alert('成功', '签退成功');
            setEmployeeId('');
        } catch (error) {
            Alert.alert('错误', '签退失败，请稍后重试');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>员工ID：</Text>
            <TextInput
                style={styles.input}
                value={employeeId}
                onChangeText={text => setEmployeeId(text)}
            />
            <Button title="签退" onPress={handleSubmit} />
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

export default CheckOut;
