import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames'
import { authActions } from '_store';
import Logo from './Logo';

export { SideBar };

const leftItems = [
    {
        name: '依頼主様情報',
        to: '/',
        icon: null,
    },
    {
        name: 'キャンペーン情報',
        to: '/campaign',
        icon: null,
    },
    {
        name: '広告のスペック',
        to: '/spec',
        icon: null,
    },
    {
        name: '広告の内容',
        to: '/content',
        icon: null,
    },
    {
        name: '素材のアップロード',
        to: '/files',
        icon: null,
    }
]

function cNames(isActive) {
    return classNames({
        "hover:bg-primary hover:text-white font-light": true, //colors
        "flex gap-4 items-center": true, //layout
        "transition-colors duration-300": true, //animation
        "rounded-md p-2 mx-2": true, //self style
        "bk-primary text-white font-bold": isActive,
    })

}

function nNames(isActive) {
    return classNames({
        'border rounded-full aspect-square w-6 h-6 text-center': true
    })
}

function SideBar() {
    const authUser = useSelector(x => x.auth.user);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());
    return (
        <div className=''>
            <Logo />
            <ul className="py-2 flex flex-col gap-2">
                {leftItems.map((item, index) => {
                    return (
                        <NavLink key={index} to={item.to} className={({ isActive }) => (cNames(isActive))}>
                            <li>
                                <div className="flex">
                                    <div className='border rounded-full hover:border-white  aspect-square w-6 h-6 text-center text-sm'>
                                        {index + 1}
                                    </div>
                                    <div className="fm-noto ml-2">
                                        {item.name}
                                    </div>
                                    <div className="clear-both"></div>
                                </div>
                            </li>
                        </NavLink>
                    );
                })}
            </ul></div>
    );
}