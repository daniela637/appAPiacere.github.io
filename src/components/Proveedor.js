import {  useState } from "react";
import { useAuth } from "../context/authContext";
import Navbar from "./Navbar";
import NavbarNameUser from './NavbarNameUser';
import NavbarLateral from "./NavbarLateral";
import FormAddProveedor from "./FormAddProveedor";
const Proveedor = () => {

  const { user } = useAuth(); //Traigo el metodo, para asi setear el usuario

  
  const [proveedor, setProveedor] = useState(
    {
      nombre: '',
      apellido: '',
      cuit: '',
      telefono: '',
      producto: '',
      observacion: ''
    }
  );

  

  

  return (
    <div className="container w-full h-screen m-0 p-0">
      <Navbar
        brand="A PIACERE" />
      <NavbarNameUser
        usuario={user.email} />
      <main className="flex h-5/6 items-center justify-center ">
        <NavbarLateral />
        <section className="flex items-center bg-slate-50 shadow-lg shadow-blue-500/50  w-8/12  h-5/6  rounded-md">
          <FormAddProveedor 
           proveedor={proveedor}
           setProveedor={setProveedor} />
        </section>
      </main>

    </div>
  );
}

export default Proveedor;