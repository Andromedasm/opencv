import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AddEmployee from './AddEmployee';
import EmployeeList from './EmployeeList';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';

const MainNavigator = createStackNavigator({
    AddEmployee: { screen: AddEmployee },
    EmployeeList: { screen: EmployeeList },
    CheckIn: { screen: CheckIn },
    CheckOut: { screen: CheckOut },
}, {
    initialRouteName: 'AddEmployee',
});

const Navigation = createAppContainer(MainNavigator);

export default Navigation;
