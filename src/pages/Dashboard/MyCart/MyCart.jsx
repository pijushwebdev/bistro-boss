import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";


const MyCart = () => {

    const [cart,refetch] = useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalPrice = total.toFixed(2);

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

                fetch(`http://localhost:5000/carts/${item._id}`,{
                    method:'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if(data.deletedCount > 0){
                        refetch();
                        Swal.fire(
                            'Deleted!',
                            'This food item has been deleted.',
                            'success'
                          )
                    }
                })
              
            }
          })
    }

    return (
        <>
            <Helmet>
                <title>Bistro Boss | My Cart</title>
            </Helmet>
            <SectionTitle heading='Wanna Add More' subHeading='My Cart'></SectionTitle>

            <div className="flex justify-around font-semibold h-32 uppercase items-center">
                <h2 className="text-3xl">Total Order: {cart.length}</h2>
                <h2 className="text-3xl">Total Price: ${totalPrice}</h2>
                <button className="py-1 px-3 rounded-md text-white text-lg bg-[#D1A054]">Pay</button>
            </div>

            <div className="overflow-x-auto scroll-hide w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr
                                key={item._id}
                            >
                                <td> {index + 1} </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="food item" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    $ {item.price}
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item)} className="btn btn-ghost btn-lg text-lg bg-red-500 text-white btn-xs"><FaTrashAlt/></button>
                                </td>
                            </tr>)
                        }


                    </tbody>


                </table>
            </div>

        </>
    );
};

export default MyCart;