import {useAuth} from '../context/authContext';
import Dropdown from 'react-bootstrap/Dropdown';
import '../css/NavbarNameUser.css';

const NavbarNameUser = ( {usuario} )=>{

    const {logout} = useAuth();

    const handleLogout = async()=>{
        try {
            await logout();
        } catch (error) {
            console.log(error.message);
        }
    };

    return(
        <div className="col-12 d-flex justify-content-end position-absolute navNameUsu">
        <Dropdown className='me-4'>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Bienvenido/a {usuario}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout} >Cerrar sesion</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
    );
}

export default NavbarNameUser;