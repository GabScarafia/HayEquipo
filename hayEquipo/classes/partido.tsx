
class Partido {
    id: number | null;
    idEquipoLocal: number;
    idEquipoVisitante: number;
    fecha: Date;


    constructor(id: number | null,  idEquipoLocal: number, idEquipoVisitante: number, fecha: Date) {
        this.id = id;
        this.idEquipoLocal = idEquipoLocal;
        this.idEquipoVisitante = idEquipoVisitante;
        this.fecha = fecha;
    }
  }
  
export default Partido