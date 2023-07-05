import {User} from "./user";

class Persona {
    id: number | null;
    nombre: string;
    apellido: string;
    dni: number;
    genero: string | null;
    User : User | null;

    constructor(id: number | null, nombre: string, apellido: string, dni: number, genero: string | null, User: User | null) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.dni = dni;
      this.genero = genero;
      this.User = User;
    }
  }
  
export default Persona