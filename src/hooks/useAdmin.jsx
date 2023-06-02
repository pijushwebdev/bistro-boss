import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const {user,loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async() => {
            if(user && user.email){
                const res = await axiosSecure.get(`/users/admin/${user?.email}`);
                return res.data.admin;
            }
            return false;
        }
    })
    return [isAdmin, isAdminLoading];
}

export default useAdmin;