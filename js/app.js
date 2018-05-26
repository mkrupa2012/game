document.addEventListener("DOMContentLoaded", function () { 

//Tworzenie obiektu zarządzającego grą.

var GameOfLife = function(boardWidth, boardHeight) {
var self = this;
this.width = boardWidth;
this.height = boardHeight;
this.board = document.getElementById('board');
this.cells = [];
this.interval;

//Budowanie planszy
    
this.tempBoard = [];
this.createBoard = function () {
    this.board.style.width = this.width * 10 + 'px';
    this.board.style.height = this.height * 10 + 'px';
    var noOfCells = this.width * this.height;
    for (var i = 0; i < noOfCells; i++) {               //tworzymy DIV
        var newCell = document.createElement('div');
        this.board.appendChild(newCell);
    }
    this.cells = this.board.querySelectorAll('div');
    for (var i = 0; i < this.cells.length; i++) {           
        this.cells[i].addEventListener('click', function() {
            this.classList.toggle('live');      

//Kliknięcie powinno przełączać (dodawać lub odejmować) danemu divowi klasę 'live'

        });
    }
}    
    
this.position = function(x, y) {
    var index = y * this.width + x;
    return this.cells[index];
    console.log(this.position);
}

//Zdefiniowanie stanu początkowego
    
this.setCellState = function(x, y, state) {
    if (state === 'live') {
        this.position(x,y).classList.add('live');
    } else if (state === 'dead'){
        this.position(x,y).classList.remove('live');
    }
}
    
this.computeCellNextState = function (x, y) {
    var livingNeighbours = 0;
    for (var i = y-1; i < y+2; i++) {
        for (var j = x-1; j < x+2; j++) {
            if (i!==y || j!==x) {
                if (i >= 0 && i < this.height  && j >= 0 && j < this.width) {
                    if (this.position(j,i).className === 'live') {
                        livingNeighbours++;
                    }
                }  
            }
        }
    }
    if (this.position(x,y).className === 'live'){
        if (livingNeighbours === 2 || livingNeighbours === 3) {
            return 1;
        } else {
            return 0;
        }
    } else {
        if (livingNeighbours === 3) {
            return 1;
        } else {
            return 0;
        }
    }
}

//Wyświetlanie nowego stanu tablicy

this.computeNextGeneration = function() {
    this.tempBoard = [];
    for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
            this.tempBoard.push(this.computeCellNextState(j, i));
        }
    }
}
this.printBoard = function() {
    self.computeNextGeneration();
    for (var i = 0; i < self.cells.length; i++) {
        self.cells[i].classList.remove('live');
        if (self.tempBoard[i] === 1) {
            self.cells[i].classList.add('live');
        }
    }
}

//Ustawienie startowe

this.firstGlider = function () {
    this.setCellState(3, 3, 'live');
    this.setCellState(3, 4, 'live');
    this.setCellState(3, 5, 'live');
    this.setCellState(2, 5, 'live');
    this.setCellState(1, 4, 'live');
}

//Uruchomienie animacji

//Ostatnim krokiem jest uruchomienie animacji, czyli ustawienie interwału, który co pewną liczbę milisekund wywoła 
//pojedynczy krok gry.

this.play = function() {
    self.pause();
    self.interval = setInterval(self.printBoard, 500);
}
this.pause = function() {
    clearInterval(self.interval);
}
this.start = function() {
    this.createBoard();
    this.firstGlider();
    this.printBoard();
}

document.getElementById('play').addEventListener('click', this.play);
document.getElementById('pause').addEventListener('click', this.pause);
}

var boardWidth = prompt("Enter width (between 10 and 120)", "");
var boardHeight = prompt("Enter height (between 10 and 60)", "");

var game = new GameOfLife(boardWidth,boardHeight);
game.start();

});