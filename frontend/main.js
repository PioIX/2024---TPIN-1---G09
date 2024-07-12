let bancoDepalabras = []
let users = []
let games =[]
let gridX = 5 
let gridY = 6
let wordleObj = ""
let keyboardLayoutRow1 = "qwertyuiop" 
let keyboardLayoutRow2 = "asdfghjkl" 
let keyboardLayoutRow3 = "zxcvbnm"
let userId = 0
screenLogin()
//--------------------------------------------------Registro y Login------------------------------------------------------

//encontrar cliente por id
function encontrarUserPorID(id) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].UserID === id) {
            return i; // Devuelve la posición del cliente en el vector
        }
    }
    return -1; // Si no se encuentra el cliente, devuelve -1
}

function repiteName(usernameBuscado) {
    // Recorremos el array de usuarios
    for (let i = 0; i < users.length; i++) {
        // Comparamos el username del usuario actual con el username buscado
        if (users[i].Username === usernameBuscado) {
            // Retornamos el objeto usuario si encontramos coincidencia
            return true;
        }
    }
    // Retornamos null si no encontramos ningún usuario con ese username
    return false;
}

//ejercicio 18, función login FUNCIONA
function login(username, password){
    for (let i = 0; i < users.length; i++) {
        if (users[i].Username == username && users[i].Password==password) {
            return users[i].UserID; // Devuelve el id del user
        }
    }
    return -1
}

//ejercicio 18, linkear métodos de login FUNCIONA
async function linkLogin(){
    username=getUser()
    password=getPasswordUser()
    users = await getUsers()
    userId=login(username, password)
    if(userId==1){
        window.alert("Bienvenido Admin")
        window.location.href = 'admin/admin.html'
    }else if (userId>=0){
        screenGame()
        window.alert("Usuario logeado")
    }else{
        window.alert("Ha ocurrido un error, intentalo de nuevo")
    }
}

//ejercicio 19, función registro FUNCIONA
async function register(username, password, mail, nameUser, surname){
    if(username.length<4||repiteName(username)){
        return -1
    }else if(password.length<5){
        return -2
    }else if(nameUser.length<3){
        return -3
    }else if(surname.length<3){
        return -4
    }else if(mail.length<6){
        return -5
    }else{
        await postUser(username, password, mail, nameUser, surname)
        return 1
    }
}

//ejercicio 19, linkear métodos de registro FUNCIONA
async function linkRegister(){
    username=getUser()
    password=getPasswordUser()
    mail=getMailUser()
    nameUser=getNameUser()
    surname=getSurnameUser()
    crear = await register(username, password, mail, nameUser, surname)
    console.log(crear)
    if (crear>0){
        await linkLogin()
    }else if(crear==-1){
        window.alert("Username inválido")
    }else if(crear==-2){
        window.alert("Contraseña muy corta")
    }else if(crear==-3){
        window.alert("Nombre muy corto")
    }else if(crear==-4){
        window.alert("Apellido muy corto")
    }else if(crear==-5){
        window.alert("Escribi bien el mail")
    }
}

//ejercicio 20, función de logout FUNCIONA
function logout(){
    screenLogin()
    if (userId>0){
        window.alert("Ha cerrado su cuenta con éxito")
    }else{
    window.alert("Ya se encuentra en el inicio!!")
    }
    userId = -1
}

//------------------------------------------------------- Funciones de juego ----------------------------------------------------------------------

async function arrancarJuego() {
    bancoDepalabras = await getPalabras()
    users= await getUsers()
    wordleObj = bancoDepalabras[getRandomInt(0, bancoDepalabras.length)]
}

async function checkResponse() { 
    let word = ''
    let wordle = wordleObj.Word 
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
                alert('Acertaste! La Palabra era: ' + wordle + '. \nEsto significa: ' + wordleObj.Info) 
                document.getElementById('score').textContent = parseInt(document.getElementById('score')
                .textContent) + 1
                resetBoard() }, 100)} 
        else { 
            paintLetterPositions(wordle, word)
            
            if (focusRow + 1 >= gridY) { 
                alert('Perdiste! La Palabra era: ' + wordle + '. \nEsto significa: ' + wordleObj.Info)
                await postGame(userId, wordle, parseInt(document.getElementById('score')
                .textContent))
                
                goStats(parseInt(document.getElementById('score')
                .textContent))
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

function replay(){
    resetBoard()
    screenGame()
    document.getElementById('score').textContent = 0
}
//------------------------------------------- Funciones de estadísticas ---------------------------------------------------

function goStats(puntaje) {
    screenStats()
    userPos=encontrarUserPorID(userId)
    maxStreak=encontrarMaxStreakPorID(userId)
    loadStats(users[userPos], puntaje, maxStreak)
    resetBoard()
}

function encontrarMaxStreakPorID(userId){
    //hacer funcion que reciba el id del usuario y traiga los juegos, se fije cuales son del usuario y entre los que son del usuario encuentre el maximo y lo devuelva
}

//------------------------------------------- Funciones para el back --------------------------------------------------------------------------

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


async function getJuegos(){
    //función
    try{
        const response = await fetch("http://localhost:3000/getGame",{});
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }else{
        const games = await response.json();
        return games;
        }
    }catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function postGame(usuario, palabra, puntaje){
        const user={
            UserID:usuario,
            LastWord:palabra,
            BestStreak:puntaje,
        }
        
        console.log(user)
        try{
            const response = await fetch('http://localhost:3000/insertGame', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                throw new Error('Failed to insert data');
            }else{
            }
        }catch (error) {
            console.error('Error inserting data:', error);
        }
}

async function postUser(usuario, contra, mail, nombre, apellido){
    const user={
        Username:usuario,
        Email_Address:mail,
        Password:contra,
        Name:nombre,
        Surname:apellido
    }
    
    console.log(user)
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

// Funciones extras
function getRandomInt(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


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
