class User{
    /**
     * @param {*} user usuario
     * @param {*} pass contraseña
     * @param {*} mail gmail
     * @param {*} nombre nombre
     * @param {*} apellido apellido
     */
    constructor(user, pass, mail, nombre, apellido){
        this.user=user
        this.pass=pass
        this.mail=mail
        this.nombre=nombre
        this.apellido=apellido
    }
}

class Game{
    /**
     * @param {*} userId Id usuario
     * @param {*} racha Racha de puntuación
     * @param {*} uPalabra Última palabra
     */
    constructor(userId, racha, uPalabra){
        this.userId=userId
        this.racha=racha
        this.uPalabra=uPalabra
    }
}
