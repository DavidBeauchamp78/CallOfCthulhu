import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "../../actions/authActions";

const Register = () => {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.errors)
    const auth = useSelector(state => state.auth)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState({});
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();
        const newUser = {name, email, password, password2};
        dispatch(registerUser(newUser, history));
        history.push("/");
    }

    useEffect(() => {
        setError(errors);
        if (auth.isAuthenticated) history.push("/Home")
    }, [auth, errors, history])

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" onChange={(e) => setName(e.target.value)} />
                    {error.name &&
                        <div>{error.name}</div>
                    }
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} />
                    {error.email &&
                        <div>{error.email}</div>
                    }
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                    {error.password &&
                        <div>{error.password}</div>
                    }
                </div>
                <div>
                    <label htmlFor="password2">Re-enter Password</label>
                    <input type="password" id="password2" onChange={(e) => setPassword2(e.target.value)} />
                    {error.password2 &&
                        <div>{error.password2}</div>
                    }
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <Link to="/Home">Already have an account? Sign in here</Link>
        </div>
    )
}


export default Register;