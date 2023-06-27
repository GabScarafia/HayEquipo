import User from "./user";

class Persona {
    id: number;
    nombre: string;
    apellido: string;
    dni: number;
    genero: string | null;
    User : User | null;

    constructor(id: number, username: string, apellido: string, dni: number, genero: string | null, User: User | null) {
      this.id = id;
      this.nombre = username;
      this.apellido = apellido;
      this.dni = dni;
      this.genero = genero;
      this.User = User;
    }
  }

export default Persona