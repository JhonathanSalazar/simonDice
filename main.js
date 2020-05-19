const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnBegin = document.getElementById('btnEmpezar')
const lastlevel = 10

class Game {
  constructor() {
    this.initialize()
    this.secuenceGeneration()
    setTimeout(this.nextLevel(), 1000)
  }

  initialize() {
    this.nextLevel = this.nextLevel.bind(this)
    this.selectColor = this.selectColor.bind(this)
    this.toggleBtnBegin()
    this.level = 1
    this.colors = {
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  toggleBtnBegin() {
    if(btnBegin.classList.contains('hide')) {
      btnBegin.classList.remove('hide')
    } else {
      btnBegin.classList.add('hide')
    }
  }

  secuenceGeneration() {
    this.secuence = new Array(lastlevel).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  nextLevel() {
    this.sublevel = 0
    this.higthlySecuence()
    this.addClickEvent()
  }

  tranformNumberColor(number) {
    switch(number) {
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
    }
  }

  tranformColorNumber(color) {
    switch(color) {
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
    }
  }

  higthlySecuence() {
    for(let i = 0; i < this.level; i++){
      const color = this.tranformNumberColor(this.secuence[i])
      setTimeout(() => this.higthlyColor(color), 1000 * i)
    }
  }

  higthlyColor(color) {
    this.colors[color].classList.add('light')
    setTimeout(() => this.shutdownColor(color), 350)
  }

  shutdownColor(color) {
    this.colors[color].classList.remove('light')
  }

  addClickEvent() {
    this.colors.celeste.addEventListener('click', this.selectColor)
    this.colors.violeta.addEventListener('click', this.selectColor)
    this.colors.naranja.addEventListener('click', this.selectColor)
    this.colors.verde.addEventListener('click', this.selectColor)
  }

  deleteClickEvents() {
    this.colors.celeste.removeEventListener('click', this.selectColor)
    this.colors.violeta.removeEventListener('click', this.selectColor)
    this.colors.naranja.removeEventListener('click', this.selectColor)
    this.colors.verde.removeEventListener('click', this.selectColor)
  }

  selectColor(ev) {
    const nameColor = ev.target.dataset.color
    const numberColor = this.tranformColorNumber(nameColor)
    this.higthlyColor(nameColor)

    if (numberColor === this.secuence[this.sublevel]) {
      this.sublevel ++
      if (this.sublevel === this.level) {
        this.level ++
        this.deleteClickEvents()
        if (this.level === (lastlevel + 1)) {
          this.winGame()
        } else {
          setTimeout(this.nextLevel, 1500)
        }
      }
    } else {
      this.loseGame()
    }
  }

  winGame() {
    swal('Platzi','Felicitaciones Ganaste SimonDice :D', 'success')
      .then(this.initialize())
  }

  loseGame() {
    swal('Platzi','Lo lamentamos perdiste SimonDice :(', 'error')
      .then(() => {
        this.deleteClickEvents()
        this.initialize()
      })
  }
}

function beginGame() {
  window.game = new Game()
}