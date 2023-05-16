import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { authActions } from '_store';

export { Nav };

function Nav() {
    const { user: authUser } = useSelector(x => x.auth);
    const { users } = useSelector(x => x.users);
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());
    // only show nav when logged in
    if (!authUser) return (
        <nav className="flex justify-end bg-white pt-2 pr-2">
            <div className="flex justify-center">
                <NavLink to="/login" className="nav-item nav-link primary">Sign In</NavLink>
            </div>
        </nav>
    );

    return (
        <nav className="flex justify-end bg-white pt-2 pr-2">
            <div className="flex justify-center">
                <NavLink to="/company" className="nav-item nav-link primary">Hello! {users.full_name}</NavLink>
                <NavLink onClick={logout} className="nav-item nav-link primary">Logout</NavLink>
            </div>
        </nav>
    );
}