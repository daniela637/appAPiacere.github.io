import { useState } from "react";


 const url = 'http://localhost:9000/proveedor';

const FormAddProveedor = ({proveedor,setProveedor}) => {

    

    const [mensaje, setMensaje] = useState();

    // guardo los datos del form
    const handleChange = ({ target: { name, value } }) => {
        setProveedor({ ...proveedor, [name]: value });
    }

    let { nombre, apellido, cuit, telefono, producto, observacion } = proveedor;

    const handleSubmit = (e) => {
      e.preventDefault();
        if (nombre === '' || apellido === '' || cuit === '' || telefono === '' || producto === '' || observacion === '') {
            setMensaje("Todos los campos son obligatorios")
        }

        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(proveedor)
        }

        fetch(url, requestInit)
            .then(res => res.text())
            .then(res =>{console.log(res)} )
            

        // reinicio el estado
        setProveedor({
            nombre: '',
            apellido: '',
            cuit: '',
            telefono: '',
            producto: '',
            observacion: ''
        })
    }


    return (
        <div className="container">
            {mensaje && <p>{mensaje}</p>}
            <h1 className="text-center fs-3">Agregar Proveedor</h1>
            <form onSubmit={handleSubmit} className="row g-3 formStyle  mx-auto pt-1 pb-4 px-4 needs-validation">
                <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input value={nombre} type="text" onChange={handleChange} className="form-control" id="nombre" name="nombre" maxLength={40} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="apellido" className="form-label">Apellido</label>
                    <input value={apellido} type="text" onChange={handleChange} className="form-control" id="apellido" name="apellido" maxLength={40} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="cuit" className="form-label">Cuit</label>
                    <input value={cuit} type="text" onChange={handleChange} className="form-control" id="cuit" name="cuit" maxLength={11} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input value={telefono} type="text" onChange={handleChange} className="form-control" id="telefono" name="telefono" maxLength={15} required />
                </div>
                <div className="col-md-12">
                    <label htmlFor="producto" className="form-label">Producto</label>
                    <input value={producto} type="text" onChange={handleChange} className="form-control" id="producto" name="producto" maxLength={40} required />
                </div>
                <div className="col-md-12">
                    <label htmlFor="observacion" className="form-label">Observación</label>
                    <input value={observacion} type="text" onChange={handleChange} className="form-control" id="observacion" name="observacion" maxLength={50} required />
                </div>
                <div className="col-md-12 text-center mt-4">
                    <button className=' bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  type='submit' >Guardar</button>
                </div>
            </form>
        </div>

    );
}

export default FormAddProveedor;