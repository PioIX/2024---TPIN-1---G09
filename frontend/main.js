let bancoDepalabras = []
let users = []
console.log(bancoDepalabras)
let gridX = 5 
let gridY = 6
let wordleObj = ""
let wordle = ""
let keyboardLayoutRow1 = "qwertyuiop" 
let keyboardLayoutRow2 = "asdfghjkl" 
let keyboardLayoutRow3 = "zxcvbnm"
const userId = 0
const userPos = 0
arrancarJuego()
//--------------------------------------------------Registro y Login------------------------------------------------------

//ejercicio 18, función login FUNCIONA
function login(username, password){
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].password==password) {
            return users[i].id; // Devuelve el id del cliente en el vector
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
        posCliente=encontrarClientePorID(userId)
        changeScreen()
        cargarDropdowns();
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
        changeScreen()
        cargarDropdowns();
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
    clientId = -1
    posCliente= -1
    changeScreen()
    window.alert("Ha cerrado su cuenta con éxito")
}

//------------------------------------------------------- Funciones de juego ----------------------------------------------------------------------

async function arrancarJuego() {
    bancoDepalabras = await getPalabras()
    users= await getUsers()
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

//-------------------------------------------Funciones para el back--------------------------------------------------------------------------

async function getPalabras(){
    //función
    try{
        const response = await fetch("http://localhost:3000/getWord",{});
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }else{
        const words = await response.json();
        console.log(words);
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
        console.log(users);
        return users;
        }
    }catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Funciones letias
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
