import ImgApiacere from '../img/imgLogo.jpeg';

const PaginaPrincipalMenu = () => {
    return (
        <div className='flex flex-col  items-center'>
            <h1 className='mb-4 font-medium text-3xl text-red-600'>Panaderia <strong> A PIACERE</strong> </h1>

              <img src={ImgApiacere} alt="imagen del logo" className='col-3' />
 
            <span className='mt-4 font-medium text-2xl'>Gestión de proveedores y balance de ventas</span>
        </div>
    );

}

export default PaginaPrincipalMenu;