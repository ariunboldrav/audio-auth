import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '_store';
import { userActions } from '_store';

export { Nav };

function Nav() {
    const { user: authUser } = useSelector(x => x.auth);
    const { users } = useSelector(x => x.users);

    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());
    // only show nav when logged in
    if (!authUser) return null;
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink to="/company" className="nav-item nav-link">Hello! {users.full_name}</NavLink>
                <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button>
            </div>
        </nav>
    );
}