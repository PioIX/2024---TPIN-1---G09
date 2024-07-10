const game = document.getElementById("game");
game.style.display = "none";
// Funciones el juego
function createWordleGrid() { 
    for (let i = 0; i < gridY; i++) {
        let tr = document.createElement('tr')
        tr.setAttribute('id', 'tr-' + i)
        for (let j = 0; j < gridX; j++) {
            let td = document.createElement('td')
            let ip = document.createElement('input')
            ip.setAttribute('class', 'letterInput')
            ip.setAttribute('onkeydown', 'changeInputCollector(event,this)')
            ip.setAttribute('maxLength', 1)
            ip.setAttribute('inputmode', 'none')
            ip.setAttribute('id', getPosByRowCol('ip', i, j))
            td.setAttribute('id', getPosByRowCol('td', i, j))
            td.appendChild(ip)
            tr.appendChild(td)
        }
        document.getElementById('wordleTable').appendChild(tr)
    }
    document.getElementById(getPosByRowCol('ip', focusRow, focusCol)).focus()
}

function moveFocus(row, col) {
    try { document.getElementById(getPosByRowCol('ip', row, col)).focus() } catch (e) {}
}

function changeInputCollector(e, obj) {
    if (e.type === 'click') { 
        if (focusCol !== gridX) {
            document.getElementById(getPosByRowCol('ip', focusRow, focusCol)).value = obj.textContent
            moveFocus(focusRow, focusCol)
            focusCol++
        }
    } else {
        if (e.keyCode >= 65 && e.keyCode <= 91) {
            if (focusCol !== gridX) {
                moveFocus(focusRow, focusCol)
                focusCol++
            }
        }
    }
    if (e.keyCode === 8) {
        backspace(true)
    }

}

function createKeyboardLayout() {
    keyboardLayoutRow1.split('').forEach(key => {
        var p = document.createElement('p')
        p.setAttribute('id', 'key-' + key)
        p.addEventListener('click', function (e) { changeInputCollector(e, this) })
        p.textContent = key.toUpperCase()
        document.getElementById('keyboardLayoutRow1').appendChild(p)
    })
    keyboardLayoutRow2.split('').forEach(key => {
        var p = document.createElement('p')
        p.setAttribute('id', 'key-' + key)
        p.addEventListener('click', function (e) { changeInputCollector(e, this) })
        p.textContent = key.toUpperCase()
        document.getElementById('keyboardLayoutRow2').appendChild(p)
    })
    keyboardLayoutRow3.split('').forEach(key => {
        var p = document.createElement('p')
        p.setAttribute('id', 'key-' + key)
        p.addEventListener('click', function (e) { changeInputCollector(e, this) })
        p.textContent = key.toUpperCase()
        document.getElementById('keyboardLayoutRow3').appendChild(p)
    })
}

function paintLetterPositions(word1, word2) {
    let palabraDigitada = counter(word1)
    let word2Array = word2.split('')
    for (let i = 0; i < gridX; i++) {
        if (word1[i] === word2[i]) {
            palabraDigitada[word1[i]] -= 1
            word2Array[i] = 1
            document.getElementById(getPosByRowCol('td', focusRow, i)).style.backgroundColor = '#04D361'
            document.getElementById(getPosByRowCol('td', focusRow, i)).style.boxShadow = 'inset 0 0 0 2px #1B873F'
            document.getElementById(getPosByRowCol('td', focusRow, i)).style.border = '1px solid #1B873F'
            document.getElementById('key-' + word2[i]).style.backgroundColor = '#04D361'

        }
    }
    for (let i = 0; i < gridX; i++) {
        if(word2Array[i] !== 1){ 
            if (palabraDigitada[word2Array[i]] > 0 ){
                palabraDigitada[word2[i]] -= 1
                document.getElementById(getPosByRowCol('td', focusRow, i)).style.backgroundColor = '#FBA94C'
                document.getElementById(getPosByRowCol('td', focusRow, i)).style.boxShadow = 'inset 0 0 0 2px #EB8A1D'
                document.getElementById(getPosByRowCol('td', focusRow, i)).style.border = '1px solid #EB8A1D'
                document.getElementById('key-' + word2[i]).style.backgroundColor = '#FBA94C'
            } else { 
                document.getElementById(getPosByRowCol('td', focusRow, i)).style.backgroundColor = '#505059'
                document.getElementById(getPosByRowCol('td', focusRow, i)).style.boxShadow = 'inset 0 0 0 2px #7C7C8A'
                document.getElementById(getPosByRowCol('td', focusRow, i)).style.border = '1px solid #7C7C8A'
                document.getElementById('key-' + word2[i]).style.backgroundColor = '#505059'
            }
        }
    }
}

// Funciones de Login

// Cambiar pantalla
function changeScreen() {
    const game = document.getElementById("game");
    const login = document.getElementById("login");
    if(game.style.display !== "none") {
        game.style.display = "none";
        login.style.display = "";
    }
    else {
        game.style.display = "";
        login.style.display = "none";
    }
}

//ejercicio 18, traer DNI de usuario FUNCIONA
function getDniUser(){
    return Number.parseInt(document.getElementById("dniUser").value)
}

//ejercicio 18, traer password de usuario FUNCIONA
function getPasswordUser(){
    return document.getElementById("passwordUser").value
}

//ejercicio 19, traer nombre de usuario FUNCIONA
function getNameUser(){
    return document.getElementById("nameUser").value
}

//ejercicio 19, traer apellido de usuario FUNCIONA
function getSurnameUser(){
    return document.getElementById("surnameUser").value
}

//ejercicio 19, traer ingresos anuales FUNCIONA
function getIngresosAnualesUser(){
    return document.getElementById("ingresosAnualesUser").value
}

