import { useAuth } from "../context/authContext";
import { useState } from "react";
import Navbar from "./Navbar";
import NavbarNameUser from "./NavbarNameUser";
import NavbarLateral from "./NavbarLateral";
import FormAddGasto from "./FormAddGasto";
import TablaGasto from "./TablaGasto";


const Gastos = ()=>{

    const {user} = useAuth(); //traigo los datos de usuario

    //estado
    const [gasto,setGasto]= useState(
        {
            valor : 0,
            descripcion : ''
        }
    )


    return(
        <div className="container w-full h-screen m-0 p-0">
        <Navbar 
           brand="A PIACERE"/>
           <NavbarNameUser 
            usuario={user.email}/>
            <main className="flex h-5/6 items-center justify-center ">
              <NavbarLateral />
              <section className="flex flex-col  items-center bg-slate-50 shadow-lg shadow-blue-500/50  w-8/12  h-5/6  rounded-md">
              <h1 className="text-center fs-3 my-3">Registro de Gastos</h1>
              <div className="row mt-3">
              <FormAddGasto 
              gasto={gasto}
              setGasto={setGasto} />
              <TablaGasto />
              </div>
              </section>
            </main>
        
       </div>
    );
}

export default Gastos;