let bancoDePalabras = []
let users = []
<<<<<<< Updated upstream
console.log(bancoDepalabras)
=======
let games = []
>>>>>>> Stashed changes
let gridX = 5 
let gridY = 6
let wordleObj = ""
let wordle = ""
let keyboardLayoutRow1 = "qwertyuiop" 
let keyboardLayoutRow2 = "asdfghjkl" 
let keyboardLayoutRow3 = "zxcvbnm"
let userId = 0
let userPos = 0
<<<<<<< Updated upstream
arrancarJuego()
//--------------------------------------------------Registro y Login------------------------------------------------------

//encontrar cliente por id
function encontrarUserPorID(id) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            return i; // Devuelve la posición del cliente en el vector
        }
    }
    return -1; // Si no se encuentra el cliente, devuelve -1
}

//ejercicio 18, función login FUNCIONA
function login(username, password){
    for (let i = 0; i < users.length; i++) {
        if (users[i].Username == username && users[i].Password==password) {
            console.log(users[i].Id)
            return users[i].UserID; // Devuelve el id del user
        }
    }
    return -1
}

//ejercicio 18, linkear métodos de login FUNCIONA
function linkLogin(){
    username=getUser()
    password=getPasswordUser()
    console.log(username, password)
    userId=login(username, password)
    if (userId>=0){
        posUser=encontrarUserPorID(userId)
        screenGame()
        window.alert("Usuario logeado")
    }else{
        window.alert("Ha ocurrido un error, intentalo de nuevo")
    }
}

//ejercicio 19, función registro FUNCIONA
function register(dni, password, nameUser, surname, ingresosAnuales){
    if(dni<1000000){
        return -1
    }else if(password.length<5){
        return -2
    }else if(nameUser.length<3){
        return -3
    }else if(surname.length<3){
        return -4
    }else if(ingresosAnuales<100000){ //política bancaria-> mínimo 100000 anual
        return -5
    }else{
        clients.push(new Client(dni, password, nameUser, surname, ingresosAnuales))
        return idClient-1
    }
}

//ejercicio 19, linkear métodos de registro FUNCIONA
function linkRegister(){
    username=getUser()
    password=getPasswordUser()
    mail=getMailUser()
    nameUser=getNameUser()
    surname=getSurnameUser()
    userId=register(username, password, mail, nameUser, surname)
    if (clientId>0){
        userId=encontrarClientePorID(userId)
        screenGame()
        window.alert("Usuario creado y logeado")
    }else if(clientId==-1){
        window.alert("DNI inválido")
    }else if(clientId==-2){
        window.alert("Contraseña muy corta")
    }else if(clientId==-3){
        window.alert("Nombre muy corto")
    }else if(clientId==-4){
        window.alert("Apellido muy corto")
    }else if(clientId==-5){
        window.alert("solo admitimos clientes con más de 100000 pesos de ganancias anuales POBRE")
    }
}

//ejercicio 20, función de logout FUNCIONA
function logout(){
    userId = -1
    posUser= -1
    screenLogin()
    window.alert("Ha cerrado su cuenta con éxito")
}
=======
startPage()
>>>>>>> Stashed changes

//------------------------------------------------------- Funciones de juego ----------------------------------------------------------------------
async function startPage(){
    bancoDePalabras = await getPalabras()
    users= await getUsers()
    console.log(users)
    console.log(bancoDePalabras)
}

async function arrancarJuego() {
    wordleObj = bancoDepalabras[getRandomInt(0, bancoDepalabras.length)]
    wordle = bancoDepalabras[getRandomInt(0, bancoDepalabras.length)].Word
}

function checkResponse() { 
    let word = ''
    for (let i = 0; i < focusCol; i++) {
        word += document.getElementById(getPosByRowCol('ip', focusRow, i)).value.toLowerCase()
    } if (word.length < 5) { 
        alert('Palabra muy chica')
    } else { 
        if (word === 'conan'){
            alert('Dios no existe')
        }if (word === wordle) { 
            paintLetterPositions(wordle, word)
            setTimeout(() => { 
                alert('Ganaste! La Palabra era: ' + wordle) 
                document.getElementById('score').textContent = parseInt(document.getElementById('score')
                .textContent) + 1
                resetBoard() }, 100)} 
        else { 
            paintLetterPositions(wordle, word)
            
            if (focusRow + 1 >= gridY) { 
                alert('Perdiste! La Palabra era: ' + wordle)
                window.location.reload()
            }
            moveFocus(++focusRow, 0)
            focusCol = 0
        }
    }
}

function counter(word) {
    let palabra = {};
    for (let i = 0; i < word.length; i++) {
        let letter = word[i];
        if (letter in palabra) {
            palabra[letter] += 1;
        } else {
            palabra[letter] = 1;
        }
    } return palabra;
}

function getPosByRowCol(str, row, col) {
    return `${str}-${row}-${col}`
}

function backspace(keypress) {
    if (focusCol - 1 >= 0) {
        if (!keypress) { 
            document.getElementById(getPosByRowCol('ip', focusRow, focusCol - 1)).value = ''
        }
        moveFocus(focusRow, focusCol - 1)
        focusCol--
    }
}

window.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        checkResponse()
    }
})

function limpiar(id){ 
    let node = document.getElementById(id)
    while(node.firstChild){
        node.firstChild.remove()
    }
}

function resetBoard() {
    focusRow = 0
    focusCol = 0
    arrancarJuego()
    limpiar('wordleTable')
    limpiar('keyboardLayoutRow1')
    limpiar('keyboardLayoutRow2')
    limpiar('keyboardLayoutRow3')
    createWordleGrid()
    createKeyboardLayout()
}
resetBoard()
document.body.addEventListener('click',(e) => {
    moveFocus(focusRow,focusCol-1)
    e.stopPropagation()
},)

//--------------------------------------------------Registro y Login------------------------------------------------------

//función login FUNCIONA
function login(username, password){
    for (let i = 0; i < users.length; i++) {
        if (users[i].Username == username && users[i].Password==password) {
            return users[i].UserID; // Devuelve el id del user
        }
    }
    return -1
}

//ejercicio 18, linkear métodos de login FUNCIONA
function linkLogin(){
    username=getUser()
    password=getPasswordUser()
    userId=login(username, password)
    if (userId>=0){
        posUser=encontrarUserPorID(userId)
        screenGame()
        window.alert("Usuario logeado")
    }else{
        window.alert("Ha ocurrido un error, intentalo de nuevo")
    }
}

//ejercicio 19, función registro FUNCIONA
function register(usuario, mail, contra, nombre, apellido){
    if(usuario.length<4){
        return -1
    }else if(existenciaUsuario(usuario)<0){
        return 0
    }else if(password.length<5){
        return -2
    }else if(nameUser.length<3){
        return -3
    }else if(surname.length<3){
        return -4
    }else if(mail.length<6){ 
        return -5
    }else{
        userId=postUser(usuario, mail, contra, nombre, apellido)
        return 
    }
}

//ejercicio 19, linkear métodos de registro FUNCIONA
function linkRegister(){
    username=getUser()
    password=getPasswordUser()
    mail=getMailUser()
    nameUser=getNameUser()
    surname=getSurnameUser()
    userId=register(username, mail, password, nameUser, surname)
    if (userId>0){
        userId=encontrarUserPorID(userId)
        screenGame()
        window.alert("Usuario creado y logeado")
    }else if(userId==-1){
        window.alert("DNI inválido")
    }else if(userId==-2){
        window.alert("Contraseña muy corta")
    }else if(userId==-3){
        window.alert("Nombre muy corto")
    }else if(userId==-4){
        window.alert("Apellido muy corto")
    }else if(userId==-5){
        window.alert("Mail inválido")
    }
}

//función de logout FUNCIONA
function logout(){
    userId = -1
    posUser= -1
    screenLogin()
    window.alert("Ha cerrado su cuenta con éxito")
}

//-------------------------------------------Funciones para el back--------------------------------------------------------------------------

async function getPalabras(){
    //función
    try{
        const response = await fetch("http://localhost:3000/getWord",{});
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }else{
        const words = await response.json();
        return words;
        }
    }catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getUsers(){
    //función
    try{
        const response = await fetch("http://localhost:3000/getUser",{});
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }else{
        const users = await response.json();
        return users;
        }
    }catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getGames(){
    //función
    try{
        const response = await fetch("http://localhost:3000/getGame",{});
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }else{
        const game = await response.json();
        return game;
        }
    }catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function postUser(usuario, mail, contra, nombre, apellido){
    if(confirm("tas seguro?")){
        const user={
            Username:usuario,
            Email_Address:mail,
            Password:contra,
            Name:nombre,
            Surname:apellido
        }
        try{
            const response = await fetch('http://localhost:3000/insertUser', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                throw new Error('Failed to insert data');
            }else{
            window.alert("se ha creado el usuario")
            }
        }catch (error) {
            console.error('Error inserting data:', error);
        }
    }
}


//-----------------------------------------------------------Funciones extras---------------------------------------------------------------------------

//chequear si existe un usuario
function existenciaUsuario(username){
    for (let i = 0; i < users.length; i++) {
        if (users[i].Username === username) {
            return i; // Devuelve la posición del user en el vector
            }
        }
    return -1; // Si no se encuentra el user, devuelve -1
}

//encontrar cliente por id
function encontrarUserPorID(id) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].UserID === id) {
            return i; // Devuelve la posición del user en el vector
        }
    }
    return -1; // Si no se encuentra el user, devuelve -1
}


function getRandomInt(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
<<<<<<< Updated upstream
=======

document.addEventListener("DOMContentLoaded", function() {
    const togglePassword = document.querySelector(".toggle-password");
    const passwordInput = document.getElementById("passwordUser");

    togglePassword.addEventListener("click", function() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    });
});
>>>>>>> Stashed changes
