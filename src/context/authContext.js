import { createContext,useContext,useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged,signOut,sendPasswordResetEmail} from 'firebase/auth';
import { auth } from "../firebase";

export const authContext = createContext();

export const useAuth = ()=>{

    const context = useContext(authContext);
    if(!context) throw new Error('there is not auth provider');
    return context;

  
}

export function AuthProvider ( { children} ){

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const signin = (email,password)=> signInWithEmailAndPassword(auth,email,password);
    const logout = ()=>signOut(auth); //esto me permite cerrar la sesion
    const resetPassword = (email)=> sendPasswordResetEmail(auth,email);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
              setUser(currentUser);
              setLoading(false);
        });
        return ()=>unsubscribe();
    },[]);

    return <authContext.Provider value={{signin,logout,resetPassword,user,loading}}>
        {children}
    </authContext.Provider>
}