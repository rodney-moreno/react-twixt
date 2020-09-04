import React from 'react';


function Login(props) {
    return(
        <div>
            <h2>Login</h2>
            <form>
                <label>username</label><br/>
                <input type="text"></input><br/>
                <label>password</label><br/>
                <input type="text"></input><br/><br/>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default Login;