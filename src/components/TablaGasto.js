import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const url = 'http://localhost:9000/gastos';

const TablaGasto = () => {

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
            name: 'Acciones',
            cell: (row) => (
                <>
                    <span onClick={() => { seleccionarVenta(row); handleShow() }} className='btn btn-primary'><AiTwotoneEdit /></span>{'     '}
                    <span onClick={() => { seleccionarVenta(row); handleShowDelete() }} className='btn btn-danger'><AiTwotoneDelete /></span>
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

    //estado
    const [gasto, setGasto] = useState(
        {
            valor: 0,
            descripcion: ''
        }
    )

    // metodo para guardar los datos de la venta
    const seleccionarVenta = (gasto) => {
        setGasto(
            {
                id: gasto.id,
                valor: gasto.valor,
                descripcion: gasto.descripcion,
                fecha_registro: gasto.fecha_registro
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

  const [gastos, setGastos] = useState([]);
  const [listUpdatedGasto, setListUpdatedGasto] = useState(false);

  // get de ventas
  useEffect(()=>{
    const getGastos = ()=>{
      fetch(url)
      .then(res => res.json())
      .then(res=> setGastos(res));
    }
    getGastos();
    setListUpdatedGasto(false);
  },[listUpdatedGasto]);

  let {valor,descripcion} = gasto;
  // metodo para editar
  const handleEditar = (id)=>{
    //  valido los datos
    if(valor <= 0 || descripcion === ''){
      setMensaje("Todos los campos son obligatorios");
    }
  
    const requestInit = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(gasto)
    }
    fetch('http://localhost:9000/gastos/' + id, requestInit)
    .then(res => res.text())
    .then(res => console.log(res))
    //reinicio el estado de la venta
    setGasto(
      {valor : 0,
        descripcion : ''
      });
      setListUpdatedGasto(true);
      handleClose();
    }

     // guardo cada dato en el objeto
  const handleChange = ({target:{name,value}})=>{
    setGasto({...gasto,[name]:value})
  }

  // metodo para borrar la gasto
  const handleBorrar = (id)=>{
    const requestInit ={
      method :'DELETE'
    }
    fetch('http://localhost:9000/gastos/' + id, requestInit)
    .then(res => res.text())
    .then(res => console.log(res));

    setListUpdatedGasto(true);
    handleCloseDelete();
  }

    return (
        <div className="col-md-8 mx-auto">
      <div className="table-responsive">
      {mensaje && <p>{mensaje}</p>}
        <DataTable
          columns={columnas}
          data={gastos}
          title="Lista de Ventas"
          pagination
          paginationComponentOptions={PaginacionOpciones} />
      </div>

      <Modal show={show} onHide={handleClose}  backdrop="static" >
      <Modal.Header closeButton>
        <Modal.Title>Editar Gasto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
       
          <Form.Group className="mb-3" >
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={gasto.valor }
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
              value={gasto.descripcion}  
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
              value={gasto.fecha_registro}  
              disabled
              id='fecha_registro'
              name='fecha_registro'
            />
          </Form.Group>
         
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <button onClick={handleClose} className=' bg-[#374151] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  type='submit' >Cerrar</button>
      <button onClick={()=>handleEditar(gasto.id)}  className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  type='submit' >Guardar</button>
      </Modal.Footer>
    </Modal>
 {/* modal eliminar */}
    <Modal show={showDelete} onHide={handleCloseDelete}  backdrop="static" >
      <Modal.Header closeButton>
        <Modal.Title>Estas seguro de Eliminar este gasto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
       
          <Form.Group className="mb-3" >
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={gasto.valor }
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
              value={gasto.descripcion}  
              id='descripcion'
              name='descripcion'
              disabled
            />
          </Form.Group>
         
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <button onClick={handleCloseDelete} className=' bg-[#374151] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  type='submit' >Cerrar</button>
      <button onClick={()=>handleBorrar(gasto.id)}  className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  type='submit' >Eliminar</button>
      </Modal.Footer>
    </Modal>
    </div>
    );
}

export default TablaGasto;