import {User} from "./user";

class Equipo {
    id: number | null;
    nombre: string;
    escudo: string | null;
    adminId: number;


    constructor(id: number | null, nombre: string, escudo: string | null, adminId: number) {
        this.id = id;
        this.nombre = nombre;
        this.escudo = escudo;
        this.adminId = adminId;
    }
  }
  
export default Equipo