var bancoDepalabras = ['arroz', 'conan', 'messi', 'peron', 'milei', 'bruja', 'tarot', 'perros', 'cojer', 'negro', 'dolar']//luego integrar con backend
var gridX = 5 
var gridY = 6
var wordle = bancoDepalabras[getRandomInt(0, bancoDepalabras.length)]
var keyboardLayoutRow1 = "qwertyuiop" 
var keyboardLayoutRow2 = "asdfghjkl" 
var keyboardLayoutRow3 = "zxcvbnm"

        function getRandomInt(min, max) { 
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function checkResponse() { 
            let word = ''
            for (let i = 0; i < focusCol; i++) {
                word += document.getElementById(getPosByRowCol('ip', focusRow, i)).value.toLowerCase()
            }
            if (word.length < 5) { 
                alert('Palabra muy chica')
            } else { 
                if (word === 'conan'){
                    alert('Dios no existe')
                } 
                if (word === wordle) { 
                        checkLetterPositions(wordle, word)
                        setTimeout(() => { 
                            alert('Ganaste! La Palabra era: ' + wordle) 
                            document.getElementById('score').textContent = parseInt(document.getElementById('score')
                            .textContent) + 1
                            resetBoard() 
                        }, 100)
                } else { 
                        checkLetterPositions(wordle, word)
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
            var palabra = {};
            for (let i = 0; i < word.length; i++) {
                let letter = word[i];
                if (letter in palabra) {
                    palabra[letter] += 1;
                } else {
                    palabra[letter] = 1;
                }
            }
            return palabra;
        }

        function checkLetterPositions(word1, word2) {
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

        function getPosByRowCol(str, row, col) {
            return `${str}-${row}-${col}`
        }

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

        function backspace(keypress) {
            if (focusCol - 1 >= 0) {
                if (!keypress) { 
                    document.getElementById(getPosByRowCol('ip', focusRow, focusCol - 1)).value = ''
                }
                moveFocus(focusRow, focusCol - 1)
                focusCol--
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

        window.addEventListener('keydown', (event) => {
            if (event.keyCode === 13) {
                checkResponse()
            }
        })

        function Trocar(id){ 
            let node = document.getElementById(id)
            while(node.firstChild){
                node.firstChild.remove()
            }
        }

        function resetBoard() {
            focusRow = 0
            focusCol = 0
            wordle = bancoDepalabras[getRandomInt(0, bancoDepalabras.length)]
            Trocar('wordleTable')
            Trocar('keyboardLayoutRow1')
            Trocar('keyboardLayoutRow2')
            Trocar('keyboardLayoutRow3')
            createWordleGrid()
            createKeyboardLayout()
        }
        resetBoard()
        document.body.addEventListener('click',(e) => {
            moveFocus(focusRow,focusCol-1)
            e.stopPropagation()
        },)
