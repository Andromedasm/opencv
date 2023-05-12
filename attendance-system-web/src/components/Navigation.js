import React from 'react';
import { BrowserRouter as Router, Link, Outlet, Routes, Route } from 'react-router-dom';
import AddEmployee from './AddEmployee';
import EmployeeList from './EmployeeList';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';

const Navigation = () => {
    return (
        <Router>
            <div className="flex">
                <div className="w-1/4 min-h-screen p-4 bg-gray-200">
                    <ul>
                        <li className="py-2">
                            <Link className="text-blue-500 hover:text-blue-700" to="/add-employee">
                                添加员工
                            </Link>
                        </li>
                        <li className="py-2">
                            <Link className="text-blue-500 hover:text-blue-700" to="/employee-list">
                                员工列表
                            </Link>
                        </li>
                        <li className="py-2">
                            <Link className="text-blue-500 hover:text-blue-700" to="/check-in">
                                签到
                            </Link>
                        </li>
                        <li className="py-2">
                            <Link className="text-blue-500 hover:text-blue-700" to="/check-out">
                                签退
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="w-3/4 p-4">
                    <Routes>
                        <Route path="/add-employee" element={<AddEmployee />} />
                        <Route path="/employee-list" element={<EmployeeList />} />
                        <Route path="/check-in" element={<CheckIn />} />
                        <Route path="/check-out" element={<CheckOut />} />
                    </Routes>
                    <Outlet />
                </div>
            </div>
        </Router>
    );
};

export default Navigation;
