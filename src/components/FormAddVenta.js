import { useState } from "react";

const url = 'http://localhost:9000/ingresos';

const FormAddVenta = ( { ingreso,setIngreso } )=>{

  const [mensaje,setMensaje] = useState();

  const handleChange =({target:{name,value}})=>{
       setIngreso({...ingreso,[name]:value});
  };

 let { valor,descripcion } = ingreso;

  const handleSubmit = (e)=>{
    e.preventDefault();
    
    valor = parseInt(valor,100);
    if(valor <= 0 || descripcion === ''){
      setMensaje('Todos los campos tienen que completarse');
    }

    const requestInit ={
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(ingreso)
    }
     fetch(url,requestInit)
    .then(res => res.text())
    .then(res => {console.log(res) 
    setMensaje('Venta resgistrada')});

    // reinicio el estado
    setIngreso({
      valor : 0,
      descripcion : ''
    })

  }
  
    return (
        <div className="col-md-4 mx-auto">
        <div className="card card-body">
          {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit} className="row g-3 formStyle  mx-auto pt-1 pb-4 px-4 needs-validation">
                <div className="form_group">
                  <input value={valor} type="number" onChange={handleChange} name="valor" className="form-control" placeholder="Ingresa total de ventas" autoComplete="off" required />
                </div>
                <div className="form_group">
                <input value={descripcion} type="text" onChange={handleChange} className="form-control" id="descripcion" name="descripcion" placeholder="Ingresa la descripción" maxLength={50} required />
                </div>
                <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='submit' name="guardar">Agregar</button>
             
                
            </form>   
        </div>
        </div>
    );
}

export default FormAddVenta;