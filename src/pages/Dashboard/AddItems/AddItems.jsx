// import React from 'react';

import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_token = import.meta.env.VITE_Image_Token;

const AddItems = () => {
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

    const [axiosSecure] = useAxiosSecure();

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0]);

        fetch(image_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgRes => {
                if (imgRes.success) {
                    const imgUrl = imgRes.data.display_url;
                    const {price,name,category,recipe} = data;
                    const newItem = {price: parseFloat(price), name, category, recipe, image:imgUrl};
                    axiosSecure.post('/menu', newItem)
                    .then(data => {
                        if(data.data.insertedId){
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: `Added Successfully`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                        console.log(data.data)})
                }
            })
    };

    return (
        <div>
            <Helmet><title>Bistro Boss | Add Items</title></Helmet>
            <SectionTitle heading='Add An Item' subHeading="What's new"></SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)} className="p-5 m-5 bg-[#F3F3F3] rounded-sm">
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Recipe name*</span>
                    </label>
                    <input {...register("name", { required: true, maxLength: 120 })} type="text" placeholder="Recipe Name" className="input input-bordered w-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Category*</span>
                        </label>
                        <select defaultValue='Category' {...register("category", { required: true })} className="select select-bordered">
                            <option disabled>Category</option>
                            <option value='pizza'>Pizza</option>
                            <option value='salad'>Salad</option>
                            <option value='soup'>Soup</option>
                            <option value='dessert'>Dessert</option>
                            <option value='drinks'>Drinks</option>
                            <option value='offered'>Offered</option>
                            <option value='popular'>Popular</option>
                        </select>
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Price*</span>
                        </label>
                        <input {...register("price", { required: true })} type="number" placeholder="Price" className="input input-bordered w-full" />
                    </div>
                </div>

                <div className="form-control mb-5">
                    <label className="label">
                        <span className="label-text">Recipe Details*</span>
                    </label>
                    <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                </div>

                <input {...register("image", { required: true })} type="file" className="file-input w-full block mb-8 max-w-xs" />

                <button className="px-3 py-2 text-white font-semibold bg-gradient-to-r from-[#835D23] to-[#B58130] rounded-md" type="submit">Add Item</button>


            </form>
        </div>
    );
};

export default AddItems;