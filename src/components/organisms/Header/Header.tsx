import React from 'react';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from '../../molecules/LanguageSwitcher/LanguageSwitcher';

export const Header: React.FC = () => {
    return (
        <header className="navbar bg-primary text-primary-content shadow-lg">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">Gyan Setu</Link>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control hidden md:block">
                    <input type="text" placeholder="Search lessons..." className="input input-bordered w-24 md:w-auto text-base-content" />
                </div>
                <LanguageSwitcher />
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="User profile" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 text-base-content">
                        <li><Link to="/profile">Profile</Link></li>
                        <li><a>Settings</a></li>
                        <li><Link to="/login">Logout</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};
