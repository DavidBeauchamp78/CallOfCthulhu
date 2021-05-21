import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch  } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const Navigation = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    
    return (
        <div>
            {auth.isAuthenticated ?
                <div>
                    <Link to="/Home">Home</Link>
                    <button onClick={() => {dispatch(logoutUser())}}>Log Out</button>
                </div>
                :
                <div>
                </div>
            }
        </div>
    )
}

export default Navigation;