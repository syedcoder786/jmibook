import React, { Component } from 'react';
// import Navbar from './Navbar'
import Sidebar from './Sidebar';

class Dashboard extends Component {
    render() {
        return (
            <div>
                {/* <Navbar/> */}
                <Sidebar/>
            </div>
        );
    }
}

export default Dashboard;