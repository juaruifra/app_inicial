import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Importamos funciones del servicio de auth
import {
  getStoredUser,
  loginWithEmailAndPassword,
  logoutUser,
} from "../services/authService";

import { useUserStore } from "../store/userStore";
import { roles } from "../data/mockApi";

/*
  DEFINIMOS qué información va a compartir el contexto

  Esto es la estructura del contexto,
  cualquier componente que use el contexto
  sabrá que estas propiedades existen
*/
// type AuthContextType = {
//   user: User | null; // Usuario actual o null si no hay login
//   isLoading: boolean; // Si estamos comprobando sesión guardada
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// };

type AuthContextType = {
  isAuthenticated: boolean; // ¿hay sesión activa?
  isLoading: boolean;       // ¿estamos restaurando sesión?
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};


/*
  CREAMOS el contexto en sí

  - Al principio no tiene valor (undefined)
  - El valor real se lo dará el AuthProvider
*/
const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/*
  CREAMOS EL PROVIDER

  Este componente:
  - envuelve la app
  - guarda el estado de autenticación
  - expone login / logout
*/
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {

  // Estado donde guardamos el usuario logueado
  //const [user, setUser] = useState<User | null>(null);

  // Estado para saber si estamos cargando datos del storage
  const [isLoading, setIsLoading] = useState(true);

  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const user = useUserStore((state) => state.user);


  /*
    Al arrancar la app:
    - intentamos leer el usuario guardado (si lo hay)
    - esto simula "recordar la sesión"
  */
  // useEffect(() => {
  //   const loadUserFromStorage = async () => {
  //     try {
  //       const storedUser = await getStoredUser();
  //       if (storedUser) {
  //         setUser(storedUser);
  //       }
  //     } catch (error) {
  //       console.warn(
  //         "Error al cargar el usuario guardado",
  //         error
  //       );
  //     } finally {
  //       // Ya hemos terminado de comprobar el storage
  //       setIsLoading(false);
  //     }
  //   };

  //   loadUserFromStorage();
  // }, []);

  useEffect(() => {
    const restoreSession = async () => {
      console.log("Restaurando sesión...");
      try {
        const storedUser = await getStoredUser();
        console.log("Usuario en storage:", storedUser);

        if (storedUser) {
          // Buscamos el rol legible a partir del roleId
          const role = roles.find(
            (r) => r.id === storedUser.roleId
          )?.name;

          if (role) {
            setUser({
              ...storedUser,
              role,
            });
          }
        }
      } catch (error) {
        console.warn("Error restaurando sesión", error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);




  /*
    Función login
    - la usará la pantalla de Login
    - si las credenciales son correctas,
      guardamos el usuario en el estado
  */
  // const login = async (email: string, password: string) => {
  //   const loggedUser = await loginWithEmailAndPassword(
  //     email,
  //     password
  //   );

  //   setUser(loggedUser);
  // };

  const login = async (email: string, password: string) => {

    console.log("AuthContext.login llamado", email);

    const loggedUser = await loginWithEmailAndPassword(
      email,
      password
    );

    console.log("Usuario devuelto por authService", loggedUser);

    const role = roles.find(
      (r) => r.id === loggedUser.roleId
    )?.name;

    if (!role) {
      throw new Error("Rol de usuario no válido");
    }

    console.log("Seteando usuario en Zustand");

    setUser({
      ...loggedUser,
      role,
    });
  };


  /*
    Función logout
    - borra el usuario guardado
    - limpia el estado global
  */
  // const logout = async () => {
  //   await logoutUser();
  //   setUser(null);
  // };

  const logout = async () => {
    await logoutUser();
    clearUser();
  };


  /*
    Valor que se compartirá con TODA la app
  */
  // const value: AuthContextType = {
  //   user,
  //   isLoading,
  //   login,
  //   logout,
  // };

  const value: AuthContextType = {
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/*
  Hook de ayuda para usar el contexto fácilmente
    - evita importar useContext y AuthContext en cada componente
*/
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Protección extra: evita usar el contexto fuera del provider
  if (!context) {
    throw new Error(
      "useAuth debe usarse dentro de un AuthProvider"
    );
  }

  return context;
};
