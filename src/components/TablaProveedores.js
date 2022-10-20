import DataTable from "react-data-table-component";
import { useState,useEffect } from "react";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';




const TablaProveedores = ()=>{

  // estado de mensajes
  const [mensaje, setMensaje] = useState();

  // configuracion de la data-table
  const columnas =[
    {name : 'ID',
     selector:row =>row.id,
    sortable:true},
    {name : 'Nombre',
    selector:row => row.nombre,
   sortable:true},
   {name : 'Apellido',
   selector:row => row.apellido,
  sortable:true},
  {name : 'Cuit',
   selector:row => row.cuit,
  sortable:true},
  {name : 'Teléfono',
   selector:row => row.telefono,
  sortable:true},
  {name : 'observación',
   selector:row => row.observacion,
  sortable:true},
  {
    name : 'Acciones',
    cell: (row) => (
      <>
    <span onClick={()=>{seleccionarProveedor(row);handleShow()}}  className='btn btn-primary'><AiTwotoneEdit /></span>{'     '}
    <span  onClick={() =>{seleccionarProveedor(row); handleShowDelete()}}   className='btn btn-danger'><AiTwotoneDelete /></span>
    </>
  ),
  
  ignoreRowClick: true,
  allowOverflow: true,
  button: true,
  }
  ];
  const PaginacionOpciones={
    rowsPerPageText : 'Filas por página',
    rangeSeparatorText : 'de',
    selectAllRowsItem : true,
    selectAllRowsItemText:'Todos'
  }

  // estado del proveedor
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

  // metodo para guardar los datos del proveedor
  const seleccionarProveedor = (prov)=>{
    setProveedor(
      {
        id : prov.id,
        nombre : prov.nombre,
        apellido : prov.apellido,
        cuit : prov.cuit,
        telefono : prov.telefono,
        producto : prov.producto,
        observacion : prov.observacion
      }
    )
  }

  //estado del modal editar
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () =>setShow(true);
 //modal delete
 const [showDelete,setShowDelete]= useState(false); 
 const handleCloseDelete = ()=>setShowDelete(false);
 const handleShowDelete = ()=> setShowDelete(true);
   
  const [proveedores,setProveedores] = useState([]);
  const [listUpdatedProv,setListUpdateProv] = useState(false);

  // get de los proveedores
  useEffect(()=>{
    const getProveedores = ()=>{
      fetch('http://localhost:9000/proveedor')
      .then(res => res.json())
      .then(res => setProveedores(res));
    }
    getProveedores();
    setListUpdateProv(false);
  },[listUpdatedProv])

  let { nombre, apellido, cuit, telefono, producto, observacion } = proveedor;
  
  // metodo para editar
  const handleEditar = (id)=>{

    // valido los datos
    if (nombre === '' || apellido === '' || cuit === '' || telefono === '' || producto === '' || observacion === '') {
      setMensaje("Todos los campos son obligatorios")
  }

  const requestInit={
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(proveedor)
  }
  fetch('http://localhost:9000/proveedor/' + id, requestInit)
  .then(res => res.text())
  .then(res => console.log(res))
   //reinicio el estado despues de agregar el prov
   setProveedor({
    nombre: '',
    apellido: '',
    cuit: '',
    telefono: '',
    producto: '',
    observacion: ''
});
setListUpdateProv(true);
handleClose();
  }

  // guardo cada dato en el estado
  const handleChange = ({target:{name,value}})=>{
       setProveedor({...proveedor,[name]:value})
  }
  
  // metodo para borrar el proveedor
  const handleBorrar =(id)=>{
    const requestInit = {
      method : 'DELETE'
    }
    fetch('http://localhost:9000/proveedor/' + id, requestInit)
    .then(res => res.text())
    .then(res => console.log(res));

    setListUpdateProv(true);
    handleCloseDelete();
  }

return(
  <div className="container-fluid">
    {mensaje && <p>{mensaje}</p>}
    <div className="mt-3 table-responsive"> 
     <DataTable 
     columns={columnas}
     data={proveedores}
     title="Lista de Proveedores"
     pagination 
     paginationComponentOptions={PaginacionOpciones}/>
    </div>

    <Modal show={show} onHide={handleClose}  backdrop="static" >
      <Modal.Header closeButton>
        <Modal.Title>Editar Proveedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" >
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={proveedor.nombre }
              onChange={handleChange}
              id='nombre'
              name='nombre'
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
           
          >
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text" 
              value={proveedor.apellido} 
              onChange={handleChange} 
              id='apellido'
              name='apellido'
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
          >
            <Form.Label>cuit</Form.Label>
            <Form.Control
              type="text" 
              value={proveedor.cuit}
              onChange={handleChange}
              id='cuit'   
              name='cuit'
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
          >
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text" 
              value={proveedor.telefono}
              onChange={handleChange}
              id='telefono'   
              name='telefono'
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
          >
            <Form.Label>Producto</Form.Label>
            <Form.Control
              type="text" 
              value={proveedor.producto}
              onChange={handleChange}
              id='producto'   
              name='producto'
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
          >
            <Form.Label>Observación</Form.Label>
            <Form.Control
              type="text" 
              value={proveedor.observacion}
              onChange={handleChange}
              id='observacion'   
              name='observacion'
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <button onClick={handleClose} className=' bg-[#374151] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  type='submit' >Cerrar</button>
      <button onClick={()=>handleEditar(proveedor.id)}  className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  type='submit' >Guardar</button>
      </Modal.Footer>
    </Modal>
  {/* modal delete */}
  <Modal show={showDelete} onHide={handleCloseDelete}  backdrop="static" >
      <Modal.Header closeButton>
        <Modal.Title>Estas seguro de eliminar al proveedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group className="mb-3" >
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={proveedor.id }
              disabled
              id='id'
              name='id'
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={proveedor.nombre }
              disabled
              id='nombre'
              name='nombre'
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
           
          >
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text" 
              value={proveedor.apellido} 
              disabled 
              id='apellido'
              name='apellido'
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
          >
            <Form.Label>cuit</Form.Label>
            <Form.Control
              type="text" 
              value={proveedor.cuit}
              disabled
              id='cuit'   
              name='cuit'
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <button onClick={handleCloseDelete} className=' bg-[#374151] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  type='submit' >Cerrar</button>
      <button onClick={()=>handleBorrar(proveedor.id)}  className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  type='submit' >Eliminar</button>
      </Modal.Footer>
    </Modal>

    </div>
);

}
export default TablaProveedores;