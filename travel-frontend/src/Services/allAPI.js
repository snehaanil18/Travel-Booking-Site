import { serverURL } from "./serverURL";
import { commonAPI } from "./commonAPI";

//Register API call
export const registerAPI = async(user) => {
    return await commonAPI("post",`${serverURL}/register`,user,"")
}

export const loginAPI = async(user) => {
    return await commonAPI("post",`${serverURL}/login`,user,"")
}

export const addPackageAPI = async(reqBody,reqHeader) => {
    return await commonAPI("post",`${serverURL}/package/add-package`,reqBody,reqHeader)
}

export const homePackageAPI = async() =>{
    return await commonAPI("get",`${serverURL}/home-packages`,'','')
}

//all projects API call
export const allPackagesAPI = async(searchKey) => {
    return await commonAPI("get",`${serverURL}/get-all-packages?search=${searchKey}`,'','')
}

//get user projects
export const userPackagesAPI = async(reqHeader) => {
    return await commonAPI("get",`${serverURL}/get-packages`,'',reqHeader)
}

export const registerAdminAPI = async(user) => {
    return await commonAPI("post",`${serverURL}/admin-register`,user,"")
}

export const loginAdminAPI = async(user) => {
    return await commonAPI("post",`${serverURL}/admin-login`,user,"")
}

export const viewDestinationAPI = async(id) => {
    return await commonAPI("get",`${serverURL}/view-destination/${id}`,'','')
}

export const deletePackageAPI = async(id,reqHeader) => {
    return await commonAPI("delete",`${serverURL}/delete-package/${id}`,{},reqHeader)
}


// const handlePayment = async () => {
//     try {
//         const orderUrl = "http://localhost:8080/api/payment/orders";
//         const { data } = await axios.post(orderUrl, { amount: book.price });
//         console.log(data);
//         initPayment(data.data);
//     } catch (error) {
//         console.log(error);
//     }
// };

export const makePaymentAPI = async(amount,reqHeader) => {
    return await commonAPI("post",`${serverURL}/orders`,amount,reqHeader)
}

export const verifyPaymentAPI = async(amount) => {
    return await commonAPI("post",`${serverURL}/order/validate`,amount,"")
}

export const updatePackageAPI = async(packageId,reqBody,reqHeader) => {
    return await commonAPI("put",`${serverURL}/package/update-package/${packageId}`,reqBody,reqHeader)
}

export const addBookingAPI = async(packageId,reqBody,reqHeader) => {
    return await commonAPI("post",`${serverURL}/add-booking/${packageId}`,reqBody,reqHeader)
}

export const getBookingAPI = async (packageId,reqHeader) => {
    return await commonAPI("get",`${serverURL}/view-bookings/${packageId}`,'',reqHeader)
}