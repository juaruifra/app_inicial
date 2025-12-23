import {
  saveUser,
  getUser,
  saveToken,
  clearAuthStorage,
} from "../storage/authStorage";

// Función auxiliar para simular tiempo de espera (latencia de red)
const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export type User = {
  id: string;
  email: string;
  name: string;
};

// Usuarios de prueba
const mockUsers = [
  {
    id: "1",
    email: "admin@sprintcar.com",
    password: "123456",
    name: "Juan Ruiz",
  },
  {
    id: "2",
    email: "pepe@sprintcar.com",
    password: "123456",
    name: "Pepe",
  }
];

export async function loginWithEmailAndPassword(
  email: string,
  password: string
): Promise<User> {

  // Simulamos una llamada de red
  await delay(800); // 800 ms
  
  const found = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!found) {
    throw new Error("Correo o contraseña incorrectos");
  }

  const user: User = {
    id: found.id,
    email: found.email,
    name: found.name,
  };

  // Simulamos un token de backend
  const fakeToken = "FAKE_ACCESS_TOKEN_123";

  // Guardamos usuario y token
  await saveUser(user);
  await saveToken(fakeToken);

  return user;
}

// Leer usuario persistido
export async function getStoredUser(): Promise<User | null> {
  return getUser<User>();
}

// Logout
export async function logoutUser(): Promise<void> {
  await clearAuthStorage();
}
