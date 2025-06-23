import { toast, ToastContainer } from "react-toastify";

export const alertar = (mensagem) =>{
        toast.success(mensagem, {role:"alert"});
};