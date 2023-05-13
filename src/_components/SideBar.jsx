import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames'
import { authActions } from '_store';

export { SideBar };

const leftItems = [
    {
        name: 'Company',
        to: '/',
        icon: null,
    },
    {
        name: 'Campaign',
        to: '/campaign',
        icon: null,
    },
    {
        name: 'Specification',
        to: '/spec',
        icon: null,
    },
    {
        name: 'Content',
        to: '/content',
        icon: null,
    },
    {
        name: 'File',
        to: '/files',
        icon: null,
    }
]

function cNames(isActive) {
    return classNames({
        "text-indigo-100 hover:bg-indigo-900": true, //colors
        "flex gap-4 items-center ": true, //layout
        "transition-colors duration-300": true, //animation
        "rounded-md p-2 mx-2": true, //self style
        "bg-indigo-900": isActive
    })
}

function SideBar() {
    const authUser = useSelector(x => x.auth.user);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());
    return (
        <div><ul className="py-2 flex flex-col gap-2">
            {leftItems.map((item, index) => {
                return (
                    <NavLink key={index} to={item.to} className={({ isActive }) => (cNames(isActive))}>
                        <li>
                            {item.icon} {item.name}
                        </li>
                    </NavLink>
                );
            })}
        </ul></div>
    );
}