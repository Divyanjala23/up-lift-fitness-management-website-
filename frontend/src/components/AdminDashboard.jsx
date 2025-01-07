import React from 'react';
import Detail from './dashboard/detail';
import Navbar from './dashboard/navbar';
import Todo from './dashboard/Todo';
import Table from './dashboard/Table'
import Sidebar from './dashboard/sidebar';


const AdminDashboard = () => {
    return (
        <div>
            <div><Sidebar /></div>
            <div><Navbar /></div>
            <div><Detail /></div>
            <div><Table/></div>
            <div><Todo /></div>
           
            


        </div>
    );
};

export default AdminDashboard;