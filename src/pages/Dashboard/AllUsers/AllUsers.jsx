// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {

    const [axiosSecure] = useAxiosSecure()
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users');
        return res.data;
    })


    const handleDelete = user => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete ${user.name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/users/${user._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                `${user.name} has been deleted.`,
                                'success'
                            )
                        }
                    })

            }
        })
    }
    const handleMakeAdmin = user => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${user.name} is now admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div className="bg-[#F3F3F3] mx-auto w-full">
            <Helmet>
                <title>Bistro Boss | All Users</title>
            </Helmet>
            <SectionTitle heading='Manage All Users' subHeading='How many'>

            </SectionTitle>

            <div className="flex justify-center">
                <div className="overflow-x-auto mx-auto scroll-hide bg-white rounded-sm m-5 p-5">
                    <h1 className="text-3xl font-bold my-3">Total Users: {users.length}</h1>
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-white">
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr
                                    key={user._id}
                                >
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {
                                            user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost btn-lg text-lg bg-orange-500 text-white btn-xs"><FaUserShield></FaUserShield></button>
                                        }
                                    </td>
                                    <td><button onClick={() => handleDelete(user)} className="btn btn-ghost btn-lg text-lg bg-red-500 text-white btn-xs"><FaTrashAlt /></button></td>
                                </tr>)
                            }



                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AllUsers;