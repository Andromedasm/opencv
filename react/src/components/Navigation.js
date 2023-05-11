import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import AddEmployee from './AddEmployee';
import EmployeeList from './EmployeeList';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';

const Navigation = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/add-employee">Add Employee</Link>
                    </li>
                    <li>
                        <Link to="/employee-list">Employee List</Link>
                    </li>
                    <li>
                        <Link to="/check-in">Check In</Link>
                    </li>
                    <li>
                        <Link to="/check-out">Check Out</Link>
                    </li>
                </ul>
            </nav>

            <Switch>
                <Route path="/add-employee">
                    <AddEmployee />
                </Route>
                <Route path="/employee-list">
                    <EmployeeList />
                </Route>
                <Route path="/check-in">
                    <CheckIn />
                </Route>
                <Route path="/check-out">
                    <CheckOut />
                </Route>
            </Switch>
        </Router>
    );
};

export default Navigation;
