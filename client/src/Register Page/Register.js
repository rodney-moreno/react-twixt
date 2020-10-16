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

    function handleSubmit(event) {
        const registrationInfo = {username, password};
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationInfo)
        }).then((res) => {
            console.log(res)
        });
        event.preventDefault();
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