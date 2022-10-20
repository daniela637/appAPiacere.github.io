
const Navbar = ({brand})=>{
    return(
       <nav className="bg-blue-700">
        <div className="container text-white h-16 flex items-center pl-7 text-2xl font-bold">
            <a href='#!'>
               {brand}
            </a>
        </div>
       </nav>
    );
}

export default Navbar;