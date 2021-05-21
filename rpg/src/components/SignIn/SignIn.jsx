import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";

const SignIn = () => {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.errors);
    const auth = useSelector(state => state.auth);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {email, password};
        dispatch(loginUser(userData));
        history.push("/Home");
    }

    useEffect(() => {
        setError(errors);
        if (auth.isAuthenticated) history.push("/Home");
    }, [auth, errors, history])

    return (
        <div>
            <form onSubmit={onSubmit}>
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
                    <button type="submit">Submit</button>
                </div>
            </form>
            <Link to="/Register">Don't have an account? Register here</Link>
        </div>
    )
}

export default SignIn;