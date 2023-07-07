
class JugadorEquipo {
    id: number | null;
    jugadorId: number;
    equipoId: number;



    constructor(id: number | null,  jugadorId: number, equipoId: number) {
        this.id = id;
        this.jugadorId = jugadorId;
        this.equipoId = equipoId;
    }
  }
  
export default JugadorEquipo