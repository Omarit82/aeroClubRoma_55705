//******CLASE AERONAVE PARA INSTANCIAR NUEVAS AERONAVES******/
class Aeronave{
    constructor(nombre,tripulacion,pax,gph,crucero,mtow,ew,maxfuel){
        this.nombre = nombre,
        this.tripulacion = tripulacion,
        this.pax = pax,
        this.gph = gph,
        this.crucero = crucero;
        this.mtow = mtow,
        this.ew = ew,
        this.maxfuel = maxfuel
    }
}
/**CLASE PERSONA PARA TRIPULANTES Y PASAJEROS. */
class Persona{
    constructor(nombre,peso){
        this.nombre = nombre,
        this.peso = peso
    }
}