import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const url ='http://localhost:9000/ingresos';



const TablaVentas = () => {

  // estado de mensajes
  const [mensaje, setMensaje] = useState();

  // configuracion de la data-table
  const columnas = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true
    },
    {
      name: 'Valor',
      selector: row => row.valor,
      sortable: true
    },
    {
      name: 'Descripción',
      selector: row => row.descripcion,
      sortable: true
    },
    {
      name: 'Fecha Registro',
      selector: row => row.fecha_registro,
      sortable: true
    },
    {
      name : 'Acciones',
      cell: (row) => (
        <>
      <span onClick={()=>{seleccionarVenta(row); handleShow() }}  className='btn btn-primary'><AiTwotoneEdit /></span>{'     '}
      <span  onClick={() =>{seleccionarVenta(row); handleShowDelete() }}  className='btn btn-danger'><AiTwotoneDelete /></span>
      </>
    ),
    
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    }
  
  ];
  const PaginacionOpciones = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
  }

  // estado del ingreso
  const [ingreso,setIngreso] = useState(
    {valor : 0,
    descripcion : ''
    }
  )

  // metodo para guardar los datos de la venta
  const seleccionarVenta = (venta)=>{
       setIngreso(
        {
          id: venta.id,
          valor : venta.valor,
          descripcion : venta.descripcion,
          fecha_registro : venta.fecha_registro
        }
       )

  }

  //modal editar
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () =>setShow(true);
  // modal eliminar
  const [showDelete,setShowDelete] = useState(false);
  const handleCloseDelete = ()=>setShowDelete(false);
  const handleShowDelete = ()=> setShowDelete(true);

  const [ventas, setVentas] = useState([]);
  const [listUpdatedVenta, setListUpdatedVenta] = useState(false);

  // get de ventas
  useEffect(()=>{
    const getVentas = ()=>{
      fetch(url)
      .then(res => res.json())
      .then(res=> setVentas(res));
    }
    getVentas();
    setListUpdatedVenta(false);
  },[listUpdatedVenta]);
  
  let {valor,descripcion} = ingreso;
  // metodo para editar
  const handleEditar = (id)=>{
  //  valido los datos
  if(valor <= 0 || descripcion === ''){
    setMensaje("Todos los campos son obligatorios");
  }

  const requestInit = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(ingreso)
  }
  fetch('http://localhost:9000/ingresos/' + id, requestInit)
  .then(res => res.text())
  .then(res => console.log(res))
  //reinicio el estado de la venta
  setIngreso(
    {valor : 0,
      descripcion : ''
    });
    setListUpdatedVenta(true);
    handleClose();
  }


  // guardo cada dato en la el objeto
  const handleChange = ({target:{name,value}})=>{
    setIngreso({...ingreso,[name]:value})
  }

  // metodo para borrar la venta
  const handleBorrar = (id)=>{
    const requestInit ={
      method :'DELETE'
    }
    fetch('http://localhost:9000/ingresos/' + id, requestInit)
    .then(res => res.text())
    .then(res => console.log(res));

    setListUpdatedVenta(true);
    handleCloseDelete();
  }

  return (
    <div className="col-md-8 mx-auto">
      <div className="table-responsive">
      {mensaje && <p>{mensaje}</p>}
        <DataTable
          columns={columnas}
          data={ventas}
          title="Lista de Ventas"
          pagination
          paginationComponentOptions={PaginacionOpciones} />
      </div>

      <Modal show={show} onHide={handleClose}  backdrop="static" >
      <Modal.Header closeButton>
        <Modal.Title>Editar Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
       
          <Form.Group className="mb-3" >
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={ingreso.valor }
              onChange={handleChange}
              id='valor'
              name='valor'
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
          >
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text" 
              value={ingreso.descripcion}  
              onChange={handleChange}
              id='descripcion'
              name='descripcion'
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
          >
            <Form.Label>Fecha de Ingreso</Form.Label>
            <Form.Control
              type="text" 
              value={ingreso.fecha_registro}  
              disabled
              id='fecha_registro'
              name='fecha_registro'
            />
          </Form.Group>
         
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <button onClick={handleClose} className=' bg-[#374151] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  type='submit' >Cerrar</button>
      <button onClick={()=>handleEditar(ingreso.id)}  className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  type='submit' >Guardar</button>
      </Modal.Footer>
    </Modal>
 {/* modal eliminar */}
    <Modal show={showDelete} onHide={handleCloseDelete}  backdrop="static" >
      <Modal.Header closeButton>
        <Modal.Title>Estas seguro de Eliminar esta venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
       
          <Form.Group className="mb-3" >
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={ingreso.valor }
              id='valor'
              name='valor'
              disabled
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
           
          >
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text" 
              value={ingreso.descripcion}  
              id='descripcion'
              name='descripcion'
              disabled
            />
          </Form.Group>
         
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <button onClick={handleCloseDelete} className=' bg-[#374151] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  type='submit' >Cerrar</button>
      <button onClick={()=>handleBorrar(ingreso.id)}  className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  type='submit' >Eliminar</button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}

export default TablaVentas;