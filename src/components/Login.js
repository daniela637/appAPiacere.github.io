import Navbar from './Navbar';
import FormLogin from './FormLogin';
import ImagenLogin from './ImagenLogin';
import ImgApiacere from '../img/imgLogo.jpeg';
export const Login = () => {

    return (
        <div className='container m-0 p-0 h-screen'>
            <Navbar
                brand="A PIACERE" />
            <main className='flex h-5/6 items-center bg-slate-50'>
               <ImagenLogin 
                  imgLogin={ImgApiacere} />
                <FormLogin />
            </main>
        </div>
    );
}