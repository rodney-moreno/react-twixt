import React, { useState } from 'react';

function Register(props) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    function handleUserNameChange(event) {
        setUserName(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit() {
        
    }

    return(
        <div>
            <h2>Register</h2>
            <form onSubmit = { handleSubmit }>
                <label>username</label><br/>
                <input type="text" value = { username } onChange = { handleUserNameChange }></input><br/>
                <label>password</label><br/>
                <input type="text" value = { password } onChange = { handlePasswordChange }></input><br/><br/>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default Register;