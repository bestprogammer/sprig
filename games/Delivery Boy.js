/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Delivery Boy
@description:you have to deliver packages and not get caught by the police that activates when you are around them plus one block
@author: bestprogammer
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/

const player = "p"
const police1 = "c"
const police2 = "C"
const police3 = "e"
const shop    = "s"
const house1  = "h"
const house2  = "H"
const house3  = "X"
const wall    = "w"
const houseClosed = "z"

setLegend( 
  [ police1, bitmap`
................
................
.....00000......
.....0CCC0......
......0C0.......
......CCC.......
....5555555.....
....5555655.....
....5555555.....
...CC.555CC.....
.000C.555.......
...0..555.......
......555.......
.....00.00......
................
................`],
  [ shop, bitmap`
................
................
................
...6666..6666...
.666..6666..666.
66.....66.....66
6......66......6
3333333333333333
3333333333333333
3333333333333333
3377333773337733
3377333773337733
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [ police2, bitmap`
................
................
.....99999......
.....91119......
......010.......
......111.......
....5555555.....
....5555655.....
....5555555.....
...11.55511.....
.0001.555.......
...0..555.......
......555.......
.....00.00......
................
................`],
  [ police3, bitmap`
................
................
.....LLLLL......
.....L777L......
......070.......
......777.......
....5555555.....
....5555655.....
....5555555.....
...77.55577.....
.0007.555.......
...0..555.......
......555.......
.....00.00......
................
................`],
  [house1, bitmap`
0000000000000000
0000044444000000
0000444444440000
0004444444444000
0044444444444400
0004400000044000
0004400000044000
0004466666044000
0004466666044000
0004400000044000
0004400000044000
0004400000044000
0004444444444000
0000000000000000
0000000000000000
0000000000000000`],
  [house2, bitmap`
0000000000000000
0000055555000000
0000555555550000
0005555555555000
0055555555555500
0005500000055000
0005500000055000
0005577777055000
0005577777055000
0005500000055000
0005500000055000
0005500000055000
0005555555555000
0000000000000000
0000000000000000
0000000000000000`],
  [house3, bitmap`
0000000000000000
0000066666000000
0000666666660000
0006666666666000
0066666666666600
0006600000066000
0006600000066000
0006688888066000
0006688888066000
0006600000066000
0006600000066000
0006600000066000
0006666666666000
0000000000000000
0000000000000000
0000000000000000`],
  [wall, bitmap`
8888888888888888
8800000000000088
8800000000000088
8000000000000008
8000000000000008
8000000000000008
8000000000000008
8000000000000008
8000000000000008
8000000000000008
8000000000000008
8000000000000008
8000000000000008
8800000000000088
8800000000000088
8888888888888888`],
  [player, bitmap`
................
................
................
....0000000.....
....0888880.....
.....80808......
.....88888......
....0000000.....
...000000000....
..80000000008...
..80000000008...
...000000000....
....0000000.....
.....8...8......
.....8...8......
...88...88......`],
  [houseClosed, bitmap`
0000000000000000
0000033333000000
0000333333330000
0003333333333000
0033333333333300
0003300000033000
0003311111033000
0003311111033000
0003311111033000
0003311111033000
0003311111033000
0003300000033000
0003333333333000
0000000000000000
0000000000000000
0000000000000000`]
)


const level1 = map`
p.......
........
..w.w...
..w.w...
........
...s....
........
.......h`

const level2 = map`
p.......
.w...w..
.w...w..
........
..w.....
..w..c..
.....s..
.......H`

const level3 = map`
p.......
.w.w.w..
.w.w.w..
........
.w...w..
.w.c.w..
..C..s..
.e.....X`

const level4 = map`
p.w...w.
..w...w.
..w...w.
........
.s......
........
.h....H.
........`

const level5 = map`
p.......
.w.ww.w.
.w....w.
.w.ww.w.
...s....
.w....w.
.h.c..H.
....e..X`

const level6 = map`
p..w....
w..w.ww.
...w....
.s.w....
........
.w...w..
.h.c.H..
.e.....X`

const level7 = map`
p.w.w.w.
..w.w.w.
........
.s......
.w....w.
.w.cc.w.
.h....H.
.e.....X`

const level8 = map`
p.......
.ww.ww..
.w...w..
.w.s.w..
.w...w..
.wc..w..
.w...w..
.h..eHX.`

const levels = [level1, level2, level3, level4, level5, level6, level7, level8]
const allPoliceTypes = [police1, police2, police3]
const deliveriesNeeded = [1, 1, 1, 2, 3, 3, 2, 3]

let currentLevel    = 0
let hasPackage      = false
let chasing         = false
let chaseCooldown   = 0
let tickCount       = 0
let moveEvery       = 2
let paused          = false
let gameState       = "instructions"
let deliveriesLeft  = 1

function showInstructions() {
  clearText()
  addText("DELIVERY BOY",     { x: 1, y: 0,  color: color`4` })
  addText("----------------", { x: 0, y: 1,  color: color`1` })
  addText("Goal: Pick up pkg", { x: 0, y: 2, color: color`4` })
  addText("at the SHOP (S)",  { x: 0, y: 3,  color: color`4` })
  addText("Deliver to HOUSE", { x: 0, y: 4,  color: color`4` })
  addText("Avoid POLICE!",    { x: 0, y: 5,  color: color`4` })
  addText("That clips thru wall",    { x: 0, y: 6,  color: color`4` })
  addText("----------------", { x: 0, y: 7,  color: color`1` })
  addText("W A S D = Move",   { x: 0, y: 8,  color: color`4` })
  addText("J     = Restart",  { x: 0, y: 10,  color: color`4` })
  addText("----------------", { x: 0, y: 11, color: color`1` })
  addText("Press J to START", { x: 0, y: 12, color: color`3` })
}


function showHUD() {
  clearText()
  addText("Lvl " + (currentLevel + 1), { x: 0, y: 0, color: color`6` })
  addText("Del:" + deliveriesLeft,      { x: 5, y: 0, color: color`5` })
  if (!hasPackage) {
    addText("Go to SHOP",   { x: 0, y: 1, color: color`D` })
  } else {
    addText("DELIVER PKG!", { x: 0, y: 1, color: color`5` })
  }
  if (chasing) {
    addText("!! POLICE !!", { x: 2, y: 3, color: color`3` })
  }
}

function showGameOver() {
  clearText()
  addText("ARRESTED!",        { x: 2, y: 2,  color: color`3` })
  addText("The police got",   { x: 1, y: 4,  color: color`F` })
  addText("you...",           { x: 1, y: 5,  color: color`F` })
  addText("J = Restart",      { x: 2, y: 7,  color: color`D` })
}

function showWin() {
  clearText()
  addText("YOU WIN!",         { x: 2, y: 2,  color: color`6` })
  addText("All deliveries",   { x: 1, y: 4,  color: color`F` })
  addText("completed!",       { x: 1, y: 5,  color: color`F` })
  addText("J = Play again",   { x: 1, y: 7,  color: color`D` })
}

function loadLevel(n) {
  hasPackage     = false
  chasing        = false
  chaseCooldown  = 0
  tickCount      = 0
  deliveriesLeft = deliveriesNeeded[n]
  clearText()
  setMap(levels[n])
  setSolids([wall, player, houseClosed])
  showHUD()
}

function getAllPolice() {
  let cops = []
  for (const t of allPoliceTypes) {
    cops = cops.concat(getAll(t))
  }
  return cops
}

function movePoliceTowardsPlayer(p) {
  const cops = getAllPolice()
  for (const cop of cops) {
    const dx = p.x - cop.x
    const dy = p.y - cop.y
    if (Math.abs(dx) >= Math.abs(dy)) {
      cop.x += dx > 0 ? 1 : -1
    } else {
      cop.y += dy > 0 ? 1 : -1
    }
  }
}

function movePoliceRandom() {
  const cops = getAllPolice()
  const dirs = [{dx:1,dy:0},{dx:-1,dy:0},{dx:0,dy:1},{dx:0,dy:-1}]
  for (const cop of cops) {
    const d = dirs[Math.floor(Math.random() * 4)]
    const nx = cop.x + d.dx
    const ny = cop.y + d.dy
    if (nx >= 0 && nx < width() && ny >= 0 && ny < height()) {
      cop.x = nx
      cop.y = ny
    }
  }
}


function checkEvents() {
  const players = getAll(player)
  if (players.length === 0) return
  const p = players[0]

  if (chaseCooldown > 0) chaseCooldown--

  const cops = getAllPolice()
  for (const cop of cops) {
    const dx = Math.abs(cop.x - p.x)
    const dy = Math.abs(cop.y - p.y)
    if (dx <= 1 && dy <= 1) {
      if (!chasing) {
        chasing = true
        chaseCooldown = 4
        showHUD()
      } else if (chaseCooldown <= 0 && dx === 0 && dy === 0) {
        gameState = "gameover"
        showGameOver()
        return
      }
    }
  }

  const shops = getAll(shop)
  for (const s of shops) {
    if (s.x === p.x && s.y === p.y && !hasPackage) {
      hasPackage = true
      showHUD()
    }
  }

  const targetTypes = [house1, house2, house3]
  for (const houseType of targetTypes) {
    const houses = getAll(houseType)
    for (const h of houses) {
      if (h.x === p.x && h.y === p.y && hasPackage) {
        h.type = houseClosed
        hasPackage = false
        deliveriesLeft--
        if (deliveriesLeft <= 0) {
          currentLevel++
          if (currentLevel >= levels.length) {
            gameState = "win"
            showWin()
          } else {
            clearText()
            addText("Level " + (currentLevel + 1) + "!", { x: 2, y: 3, color: color`6` })
            loadLevel(currentLevel)
          }
        } else {
          showHUD()
        }
        return
      }
    }
  }
}


function afterMove() {
  if (gameState !== "playing") return
  tickCount++
  if (tickCount % moveEvery === 0) {
    if (chasing) {
      const players = getAll(player)
      if (players.length > 0) movePoliceTowardsPlayer(players[0])
    } else {
      movePoliceRandom()
    }
  }
  checkEvents()
}

onInput("w", () => {
  if (gameState === "instructions") return
  if (gameState !== "playing") return
  const p = getAll(player)[0]
  if (p) p.y -= 1
  afterMove()
})

onInput("s", () => {
  if (gameState === "instructions") return
  if (gameState !== "playing") return
  const p = getAll(player)[0]
  if (p) p.y += 1
  afterMove()
})

onInput("a", () => {
  if (gameState === "instructions") return
  if (gameState !== "playing") return
  const p = getAll(player)[0]
  if (p) p.x -= 1
  afterMove()
})

onInput("d", () => {
  if (gameState === "instructions") return
  if (gameState !== "playing") return
  const p = getAll(player)[0]
  if (p) p.x += 1
  afterMove()
})




onInput("j", () => {
  gameState    = "playing"
  currentLevel = 0
  loadLevel(0)
})

showInstructions()
setMap(level1)
setSolids([wall, player, houseClosed])