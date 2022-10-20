import Navbar from "./Navbar";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useAuth } from "../context/authContext";

const RecuperarClave = ()=>{

    const [mensaje,setMensaje] = useState();//hook para msj de error
    const [usu,setUsu]= useState({
       mail :''
    });

    const {resetPassword} = useAuth();

    //guardo el mail en el estado
    const handleChange = ({target:{name,value}})=>{
        setUsu({...usu,[name]:value})
    };

    //le paso el mail a la funcion para el cambio de pass
    const handleResetPassword = async()=>{
        if(!usu.mail) return setMensaje('Por favor Ingrese un mail');

        try {
            await resetPassword(usu.mail);
            setMensaje('Te hemos enviado un mail para que cambies tu contraseña');

        } catch (error) {
            if(error.code === 'auth/user-not-found'){
                setMensaje('El mail no existe. Ingrese uno valido');
            }
        }
    };

    const handleEnter = (e)=>{
        e.preventDefault();
    }


    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
           
        <form onSubmit={handleEnter}   className="w-96 flex flex-col bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4">
         {mensaje && <p>{mensaje}</p>}
            <Navbar
                brand="Recuperar contraseña" />
            <div className=' flex flex-col mt-5 px-4'>
                <label className='txtmail'>Mail</label>
                <input type="email" name="mail" onChange={handleChange}   className="mail mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mail" />
            </div>
           
            <div className=' mt-5 flex justify-center'>
                <button onClick={handleResetPassword} className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >Enviar</button>   
            </div>
            <span className=' mt-4 text-center cursor-pointer hover:underline underline-offset-1 text-cyan-400' ><Link to="/">Volver al Login</Link></span>

        </form>
    </div>
    );
}

export default RecuperarClave;