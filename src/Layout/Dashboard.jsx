import { FaBars, FaBook, FaCalendar, FaHome, FaShoppingCart, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { RiCalendarEventFill } from "react-icons/ri"
import { HiShoppingBag } from "react-icons/hi"
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart();

    // const isAdmin = true;
    const [isAdmin] = useAdmin();
    

    return (
        <>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content scroll-hide flex flex-col">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side bg-[#D1A054] m-0">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-72 text-base-content">

                        {
                            isAdmin ? <>
                                <li><NavLink to='/dashboard/adminHome'><FaHome /> Admin Home</NavLink></li>
                                <li><NavLink to='/dashboard/addItems'><FaUtensils /> Add Items</NavLink></li>
                                <li><NavLink to='/dashboard/manageItems'><FaWallet /> Manage Items</NavLink></li>
                                <li><NavLink to='/dashboard/manageBookings'><FaBook /> Manage Bookings</NavLink></li>
                                <li><NavLink to='/dashboard/allUsers'><FaUsers /> All Users</NavLink></li>
                            </> : <>
                                <li><NavLink to='/dashboard/userHome'><FaHome /> User Home</NavLink></li>
                                <li><NavLink to='/dashboard/reservation'><FaCalendar /> Reservation</NavLink></li>
                                <li><NavLink to='/dashboard/paymentHistory'><FaWallet /> Payment History</NavLink></li>
                                <li><NavLink to='/dashboard/myCart'><FaShoppingCart /> My Cart <span className="badge badge-secondary ml-1">+{cart?.length || 0}</span></NavLink></li>
                                <li><NavLink to='/dashboard/review'><FaShoppingCart /> Add Review</NavLink></li>
                                <li><NavLink to='/dashboard/booking'><RiCalendarEventFill /> My Booking</NavLink></li>

                            </>
                        }
                        
                        <div className="divider"></div>

                        <li><NavLink to="/"><FaHome /> Home</NavLink></li>
                        <li><NavLink to="/menu"><FaBars /> Our Menu</NavLink></li>
                        <li><NavLink to="/shop"><HiShoppingBag /> Shop</NavLink></li>

                    </ul>

                </div>
            </div>
        </>
    );
};

export default Dashboard;