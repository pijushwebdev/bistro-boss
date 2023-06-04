import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ManageItems = () => {
    const [menu,,refetch] = useMenu();

    const [axiosSecure] = useAxiosSecure();


    const handleDelete = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete ${item.name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/menu/${item._id}`)
                    .then(data => {
                        console.log(data);
                        if(data.data.deletedCount > 0) {
                            refetch();

                            Swal.fire(
                                'Deleted!',
                                `${item.name} has been deleted.`,
                                'success'
                            )
                        }
                    })

            }
        })
    }

    return (
        <>
            <Helmet><title>Bistro Boss | Manage Items</title></Helmet>
            <SectionTitle heading='Manage All Items' subHeading='Hurry Up'></SectionTitle>
            <div className="overflow-x-auto mx-auto scroll-hide">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((item,index) => <tr key={item._id}>

                                <td>{index + 1}</td>

                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="food item" />
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <h1>{item.name}</h1>
                                </td>
                                <td>{item.price}</td>
                                <td>
                                    <button className="btn btn-ghost btn-xs">update</button>
                                </td>
                                <td>
                                <button onClick={() => handleDelete(item)} className="btn btn-ghost btn-lg text-lg bg-red-500 text-white btn-xs"><FaTrashAlt /></button>
                                </td>
                            </tr>)
                        }

                    </tbody>


                </table>
            </div>
        </>
    );
};

export default ManageItems;