import React from 'react';
import Login from './Login Page/Login';
import Register from './Register Page/Register';
import Board from './Game Page/Board';
import { Router } from '@reach/router';

function App(props) {
    return(
        <Router>
            <Login path="/login" />
            <Register path="/register"/>
            <Board path="/board"/>
        </Router>
    );
}

export default App;