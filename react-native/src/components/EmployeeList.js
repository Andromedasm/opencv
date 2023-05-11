import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Button, Alert, StyleSheet} from 'react-native';
import axios from 'axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://YOUR_SERVER_IP:YOUR_SERVER_PORT/employees');
            setEmployees(response.data);
        } catch (error) {
            Alert.alert('错误', '获取员工列表失败，请稍后重试');
        }
    };

    const handleDeleteEmployee = async (employeeId) => {
        try {
            await axios.delete(`http://YOUR_SERVER_IP:YOUR_SERVER_PORT/employees/${employeeId}`);
            fetchEmployees();
            Alert.alert('成功', '员工删除成功');
        } catch (error) {
            Alert.alert('错误', '删除员工失败，请稍后重试');
        }
    };

    const renderItem = ({item}) => (
        <View style={styles.employeeItem}>
            <Text>姓名：{item.name}</Text>
            <Text>部门：{item.department}</Text>
            <Text>职位：{item.position}</Text>
            <Button title="删除" onPress={() => handleDeleteEmployee(item.id)}/>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={employees}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    employeeItem: {
        padding: 15,
        backgroundColor: '#f5f5f5',
        marginBottom: 10,
        borderRadius: 5,
    },
});

export default EmployeeList;

}

