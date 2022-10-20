import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';


const NavbarLateral = () => {

    return (
        <div className="flex flex-col w-1/5 h-4/5 bg-blue-700 ml-5 mr-8 rounded-md text-white ">
            <span className='mt-4 text-xl font-bold pl-4'><Link to="/menu">Inicio</Link> </span>
            <hr className="sidebar-divider" />
            <div className='mt-5'>
                <div className='mt-2 rounded-md'>

                    <Accordion defaultActiveKey="1" flush>
                        <Accordion.Item eventKey="0" className='bg-blue-400 '>
                            <Accordion.Header className='font-bold' >Proveedores</Accordion.Header>
                            <Accordion.Body>
                              <div><Link to="/proveedor">Agregar Proveedor</Link></div>
                              <div><Link to="/listProveedores">Lista de Proveedores</Link></div>
                            </Accordion.Body>
                        </Accordion.Item>
                       
                    </Accordion>
                </div>
                <div className='mt-4'>
                <Accordion defaultActiveKey="1" flush>
                        <Accordion.Item eventKey="0" className='bg-blue-400'>
                            <Accordion.Header className='font-bold'>Balance</Accordion.Header>
                            <Accordion.Body>
                            <div className='text-center'><Link to="/ventas">ventas</Link></div>
                            <div className='text-center'><Link to="/gastos">gastos</Link></div>
                            </Accordion.Body>
                        </Accordion.Item>
                      
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export default NavbarLateral;