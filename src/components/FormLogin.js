import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';


const FormLogin = ()=>{

    const [usuario,setUsuario] = useState({
        mail : '',
        clave : ''
    });

    const [mensaje,setMensaje]= useState(); //hook para los errores

    const {signin} = useAuth();
    const navigate = useNavigate();

    const handleChange = ({target:{name,value}})=>{

        setUsuario({...usuario,[name]:value})
    };

    const handleEnter = async(e)=>{
        e.preventDefault();
        setMensaje('');

        try {
            await signin(usuario.mail,usuario.clave);
            navigate('/menu');
        } catch (error) {
            if(error.code === "auth/invalid-email" || error.code === 'auth/wrong-password' || error.code === 'auth/internal-error'){
                setMensaje("mail o contraseña incorrectos");
            }
        }
    };





    return(
        <div className="w-6/12 h-5/6 flex flex-col justify-center items-center">
         {mensaje && <p>{mensaje}</p>}
        <form onSubmit={handleEnter} className="w-96 flex flex-col bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4 ">
            <Navbar
                brand="Login" />
            <div className=' flex flex-col mt-5 px-4'>
                <label className='txtmail'>Mail</label>
                <input type="email" name="mail" onChange={handleChange}  className="mail mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mail"  />
            </div>
            <div className=' flex flex-col mt-4 px-4'>
                <label className='txtClave' >Contraseña</label>
                <input type="password" name="clave" onChange={handleChange}  className="clave  mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="clave"  />
            </div>
            <div className=' mt-5 flex justify-center'>
                <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >Ingresar</button> 
            </div>
            <span className=' mt-4 text-center cursor-pointer hover:underline underline-offset-1 text-cyan-400' ><Link to="/recuperarClave">¿Olvidaste la contraseña?</Link> </span>
            
        </form>
    </div>

    );
}

export default FormLogin;