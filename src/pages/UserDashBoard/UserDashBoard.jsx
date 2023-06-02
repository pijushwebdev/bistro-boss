// import React from 'react';
import { FaBars, FaCalendar, FaHome, FaShoppingCart, FaWallet } from "react-icons/fa";
import { RiCalendarEventFill } from "react-icons/ri"
import { HiShoppingBag } from "react-icons/hi"
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";

const UserDashBoard = () => {
    const [cart] = useCart();
    return (
        <>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content scroll-hide flex flex-col">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side bg-[#D1A054] m-0">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-72 text-base-content">

                        <li><NavLink to='/dashboard/userHome'><FaHome /> User Home</NavLink></li>
                        <li><NavLink to='/dashboard/reservation'><FaCalendar /> Reservation</NavLink></li>
                        <li><NavLink to='/dashboard/payment'><FaWallet /> Payment</NavLink></li>
                        <li><NavLink to='/dashboard/myCart'><FaShoppingCart /> My Cart <span className="badge badge-secondary ml-1">+{cart?.length || 0}</span></NavLink></li>
                        <li><NavLink to='/dashboard/review'><FaShoppingCart /> Add Review</NavLink></li>
                        <li><NavLink to='/dashboard/booking'><RiCalendarEventFill/> My Booking</NavLink></li>
                        
                        <div className="divider"></div>

                        <li><NavLink to="/"><FaHome/> Home</NavLink></li>
                        <li><NavLink to="/menu"><FaBars/> Our Menu</NavLink></li>
                        <li><NavLink to="/shop"><HiShoppingBag/> Shop</NavLink></li>

                    </ul>

                </div>
            </div>
        </>
    );
};

export default UserDashBoard;