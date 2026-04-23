/*
@title: Delivery Boy
@description: You are an underground delivery driver transporting illegal goods across the city. Pick up packages from the shop and deliver them to houses without getting caught. The police patrol the streets — once they step onto your tile, you lose a life! Every 3 times you enter a cop's 2-block radius, a police dog is released from its kennel and hunts you down. Dogs move every step you take. You start with 3 lives and earn +1 life per delivery. Can you survive all 100 levels?

Controls:
  W = Move up
  A = Move left
  S = Move down
  D = Move right
  J = Start / Restart / Continue after losing a life

Tips:
  - Police wait a few moves before acting. Use the pause to plan.
  - Dogs are released from the kennel tile (t) on the map.
  - Stay out of cops' 2-block radius to avoid summoning dogs.
  - Each delivery earns +1 life — keep delivering to stay alive!

@author: bestprogammer
@tags: ['stealth', 'delivery', 'arcade', 'illegal', 'police']
@addedOn: 2026-04-23
*/

const player = "p"
const police1 = "c"
const police2 = "C"
const police3 = "e"
const shop = "s"
const house1 = "h"
const house2 = "H"
const house3 = "X"
const wall = "w"
const houseClosed = "z"
const dog = "d"
const dogStation = "t"

setLegend(
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
  [police1, bitmap`
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
  [police2, bitmap`
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
  [police3, bitmap`
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
  [shop, bitmap`
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
  [house1, bitmap`
................
....04444400....
...044444440....
..04444444440...
.044444444440...
.044000000440...
.044000000440...
.044066660440...
.044066660440...
.044000000440...
.044000000440...
.044000000440...
.044444444440...
................
................
................`],
  [house2, bitmap`
................
....05555500....
...055555550....
..05555555550...
.055555555550...
.055000000550...
.055000000550...
.055077770550...
.055077770550...
.055000000550...
.055000000550...
.055000000550...
.055555555550...
................
................
................`],
  [house3, bitmap`
................
....06666600....
...066666660....
..06666666660...
.066666666660...
.066000000660...
.066000000660...
.066088880660...
.066088880660...
.066000000660...
.066000000660...
.066000000660...
.066666666660...
................
................
................`],
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
  [houseClosed, bitmap`
................
....03333300....
...033333330....
..03333333330...
.033333333330...
.033000000330...
.033011110330...
.033011110330...
.033011110330...
.033011110330...
.033011110330...
.033000000330...
.033333333330...
................
................
................`],
  [dog, bitmap`
................
................
................
................
................
...C..C.........
..CCCCCC........
..CCCCCC........
..C0C0CC........
..CC0CCC.....CC.
...CCCCC5555CC..
...555655555CC..
....55555555CC..
....CCC55555CC..
....C.C....C.C..
....C.C....C.C..`],
  [dogStation, bitmap`
5555555555555555
5555555555555555
5566555665556655
5565656556565555
5565656556565655
5566555665556655
5555555555555555
5555555555555555
5555566666655555
5555566666655555
5555566666655555
5555566666655555
5555566666655555
5555556666555555
5555555665555555
5555555555555555`]
)


const levels = [
map`
p......t
........
..w.w...
..w.w...
........
...s....
........
.......h`,
map`
p......t
.wwwwww.
........
...s....
........
.wwwwww.
........
h.......`,
map`
p......t
.w......
.w.www..
...w....
.www....
.....w..
..s..w..
.......X`,
map`
p......t
...w....
.h.w....
...w.c..
...w....
...w.s..
...w....
...w...H`,
map`
p......t
.www.ww.
.w...w..
.w.s.w..
.www....
.....w..
.c...w..
.h.eH.X.`,
map`
p......t
........
..www...
..w.w...
..w.w...
..w.w...
.cs.we..
hH.....X`,
map`
p.w....t
..w.....
..w.....
..wwwww.
........
.s......
.c......
.h.....H`,
map`
p......t
.wwwwww.
.w....w.
.w.cs.w.
.w....w.
.wwwwww.
........
.h.e.HX.`,
map`
p..c...t
.w.....w
........
h..s....
........
.c.....e
........
H..X...h`,
map`
p........t
....w.....
....w.....
wwwwwwwwww
....w.....
..s.w.....
....w.....
.c..w.....
.h.......H
..........`,
map`
p........t
.w........
..w.......
...w......
....w.s...
..........
....w.....
.c...w....
.h....w..H
..........`,
map`
p........t
.wwwwwwww.
.w......w.
.w......w.
....s.....
..........
.w......w.
.w..c...w.
.wwwwwwww.
.h.......H`,
map`
p........t
.wwwwwww..
.w.....w..
.w.www.w..
.w.w.s.w..
.w.w...w..
.w.wwwww..
.w........
.c.......H
.h........`,
map`
p........t
..........
..w..w....
..w.cw....
....w.s...
....w.....
..........
.h........
......H...
..........`,
map`
p........t
..........
.wwwwwwww.
........w.
.s......w.
.wwwwww.w.
.w......w.
.w.c....w.
.h.......X
..........`,
map`
p........t
.w.w.w.w..
.w.w.w.w..
..........
..........
.....s....
..........
.c.......e
.h.....H..
........X.`,
map`
p........t
.wwwwwwww.
.w......w.
.w.s....w.
.w......w.
.wwwwwwww.
..........
.c.......e
.h.....H..
.........X`,
map`
p........t
.w.......w
.w.......w
.w.......w
.wwwwwwwww
..s.......
..........
.c.......e
.h.....H..
.........X`,
map`
p........t
.w.w.w.w..
..........
.w.w.w.w..
..........
.s........
.c.w.w.w..
..........
.h.....H..
.e.......X`,
map`
p........t
.wwwww....
.w....w...
.w....w...
.w....w...
..w...w...
..w...w...
.sw...w...
.c....w..e
.h....HXw.`,
map`
p........t
.wwwwwwww.
.w......w.
.w......w.
.wwwwwwww.
..........
....s.....
.c........
.h.......H
..........`,
map`
p........t
....w.....
....w.....
wwwwwwwwww
....w.s...
....w.....
.c..w.....
....w.....
.h..w....H
..........`,
map`
p........t
.www.wwww.
.w.....w..
.w.www.w..
.w.w.w.w..
.w.w.w....
.w.www....
....s.....
.c.......e
.h.....H.X`,
map`
p........t
..w....w..
.w.w..w.w.
w...ww...w
.....s....
..........
.c.......e
..w....w..
.h.....H..
.........X`,
map`
p........t
.wwwwwwww.
.w......w.
.w.s....w.
.w......w.
.w......w.
.w......w.
.w.c..e.w.
.wwwwwwww.
.h.....HX.`,
map`
p........t
.w........
..w.......
...w......
....w.....
.....w.s..
..c...w...
.h.....w..
........wH
..........`,
map`
p........t
.wwwwwwww.
.w.wwww.w.
.w.w..w.w.
.w.w.s.w.w
.w.w..w.w.
.w.wwww.w.
.w......w.
.c......we
.hXwwwwwwH`,
map`
p........t
..........
.wwwwwww..
.w.....w..
.w..s..w..
.w.....w..
.wwwwwww..
..........
.c.......e
.h.....H.X`,
map`
p........t
.w...w....
.w...w....
.w.s.w....
.wwwww....
..........
.w...w....
.c...w....
.h...w...e
.....wH..X`,
map`
p........t
.w.w.w.w..
.w.w.w.w..
.w.w.w.w..
.w.w.w.w..
....s.....
..........
.c.......e
.h.....H..
.........X`,
map`
p........t
..........
..........
..w....w..
..w.cs.w..
..w....w..
..........
..........
.h.....H..
.e.......X`,
map`
p........t
.wwww.....
.w....w...
.w....w...
.w....wwww
....s.....
.wwww.....
.w....w...
.c....w..e
.h....H..X`,
map`
p....w...t
.....w....
.....w....
.....w.s..
.....w....
.....w....
.....w....
.c...w...e
.h...w...H
.....w...X`,
map`
p........t
.wwwww....
.......w..
.wwwwwww..
.w........
.w.wwwww..
....s.....
.c........
.h.......e
.....H...X`,
map`
p........t
..........
..........
..........
.....s....
..........
..........
.c........
..........
.......h..`,
map`
p........t
.wwwwwwww.
.w........
.w.wwwwww.
.w.w......
.w.w.wwww.
.w.w.ws...
.w.w......
.c.w.....e
.h.......HX`,
map`
p........t
..........
.w.w.w.w..
..........
.w.w.w.w..
..s.......
.c.c.c....
..........
.h.....H..
.e.......X`,
map`
p........t
.ww.ww.ww.
.w...w...w
.w...w...w
.ww.ww.ww.
..........
.s..c..e..
..........
.h.....H..
.........X`,
map`
p........t
.wwww.wwww
.........w
.wwwww...w
.w.....s.w
.w.......w
.wwwwwwwww
..........
.c.......e
.h.....H.X`,
map`
p........t
..wwwwwww.
..w.....w.
..w.s...w.
..w.....w.
..wwwwwww.
..........
.c.......e
.h.......H
.........X`,
map`
p....w...t
.....w....
.....w....
wwwwwwwwww
.....w....
.s...w....
.X...w....
.c...w...e
.h...w...H
.....w....`,
map`
p........t
.w........
.ww.......
.www......
.wwww.s...
.www......
.ww.......
.w........
.c.......e
.h.....H.X`,
map`
p........t
.w.www.w..
.w.w.w.w..
...w.w....
.w.w.w.w..
...www....
....s.....
.c.......e
.h.....H..
.........X`,
map`
p........t
.wwwwwwww.
.w......w.
.w......w.
.w.s....w.
.w......w.
.w......w.
.w.c..e.w.
.w......w.
.hwwwwwwHX`,
map`
p........t
..w..w..w.
..w..w..w.
..w..w..w.
..w..w..w.
..w..s..w.
..w..w..w.
..c..w..e.
..h..H..X.
..........`,
map`
p........t
..........
..........
....www...
....w.w...
....w.w...
....www...
.....s....
.c.......e
.h.....H.X`,
map`
p........t
....w.....
...w.w....
..w...w...
.w..s..w..
..w...w...
...w.w....
....w.....
.c.......e
.h.....H.X`,
map`
p........t
.w.www.ww.
.w.w.w.w..
.w.w.w.w..
.w.www.w..
..........
.....s....
.c.......e
.h.....H..
.........X`,
map`
p........t
..........
.wwwwwwww.
.w......w.
.w..s...w.
.w......w.
.wwwwwwww.
..c.....e.
.h.......H
.........X`,
map`
p........t
..........
.w.......w
.w.......w
.w...s...w
.w.......w
.w.......w
.c.c.c.e..
.h.......H
.........X`,
map`
p........t
.wwwwwwww.
.w.wwww.w.
.w.w..w.w.
.w.w.s.w.w
.w.w..w.w.
.w.wwww.w.
.w......w.
.c......we
.hXwwwwwwH`,
map`
p........t
....w.....
....w.....
.wwwwwwww.
....w.s...
....w.....
.wwwwwwww.
....w.....
.c..w....e
.h..w....HX`,
map`
p........t
.www.www..
.w.....w..
.w.www.w..
.w.w.w.w..
.w.w.w.w..
.w.www.w..
.w.....w..
.c.w.s.we.
.h.wwwwwHX`,
map`
p........t
..w.......
.w.w......
w...w.s...
.w.w......
..w.......
...w......
.c..w....e
.h...w...H
.........X`,
map`
p........t
.w.......w
.w.......w
.w.......w
.w...s...w
.w.......w
.w.......w
.w.c...e.w
.w.......w
.hwwwwwwHX`,
map`
p........t
.wwww.www.
.w....w..w
.w.s..w..w
.w....w..w
.wwww.www.
..........
.c.......e
.h.......H
.........X`,
map`
p........t
.wwwwwwww.
..........
.wwwwwwww.
..s.......
.wwwwwwww.
..........
.c.......e
.wwwwwwww.
.h.....H.X`,
map`
p........t
..........
.wwwwwwww.
.w......w.
.w.ccc..w.
.w......w.
.w..s...w.
.w......w.
.wwwwwwww.
.h.....H.X`,
map`
p........t
.w.......w
.w.......w
.wwwwwwwww
..........
....s.....
.wwwwwwwww
.w.......w
.c.......we
.h.......HX`,
map`
p........t
.wwwwwwww.
.w......w.
.w.wwww.w.
.w.w....w.
.w.w.ww.w.
.w.w.ws.w.
.w.w....w.
.c.w....we
.hH.wwwwwX`,
map`
p........t
.w.w.w.w..
.w.w.w.w..
.w.w.w.w..
..........
.....s....
..........
.c.w.w.we.
.h.w.w.wH.
.....w...X`,
map`
p........t
.w.www.w..
.w.w.w.w..
.w.www.w..
..........
.....s....
..........
.c.......e
.h.....H..
.........X`,
map`
p........t
.wwwww....
.w....w...
.w.s..wwww
.w........
.wwwwwww..
.......w..
.c.....w.e
.h.....w.H
.......w.X`,
map`
p........t
.w.......w
.w.......w
.h.......H
..........
....s.....
..........
.c.......e
.X.......h
.w.......w`,
map`
p........t
.wwwwwwww.
.w......w.
.w.wwww.w.
.w.w..w.h.
.w.w.s.w.H
.w.w..w.w.
.w.wwwwww.
.c......we
.h......HX`,
map`
p........t
.ww..ww...
.w.h..w...
.w.H..w...
.ww..ww...
....s.....
.ww..ww...
.c.X..e...
.w.h..w...
.ww..ww...`,
map`
p........t
.wwwwwwww.
.w......w.
.wwwwww.w.
........w.
.wwwwww.w.
.w......w.
.wwwwww.w.
.s..cHXew.
.hh.....ww`,
map`
p....c...t
.w.......w
.w.......w
.h.......H
.w.......w
.w...s...w
.w.......w
.X.......h
.w.......w
..e.......`,
map`
p........t
.ww...ww..
.w.h...h.w
.ww...ww..
..........
....s.....
.ww...ww..
.w.H...X.w
.ww...ww..
.c.......e`,
map`
p........t
..........
.c.......c
..........
...wwww...
....s.....
...wwww...
..........
.hH......X
..e......h`,
map`
p........t
.wwwwwwww.
.w......w.
.w.wwwwww.
.w.w......
.w.w.ww...
.w.w.ws...
.w.w......
.c.wwwwwwe
.hHh.....X`,
map`
p........t
.wwwwwwww.
.........w
.wwwwwwww.
.w.......
.wwwwwwww.
.........w
.c.......e
.wwwwwwww.
.hH.s...Xh`,
map`
p....w...t
.h...w...H
.....w....
wwwwwwwwww
.....w....
.....w.s..
.X...w....
.c...w...h
.....w....
..e.......`,
map`
p........t
....w.....
.h..w..H..
....w.....
.wwwwwwww.
....w..s..
.X..w..h..
....w.....
.c..w.....
....w.....`,
map`
p........t
..wwwwww..
.w.h..H.w.
.w......w.
.w..s...w.
.w......w.
.w.X..h.w.
..wwwwww..
.c.......e
..........`,
map`
p........t
.w.w.w.w..
.h.....H..
.w.w.w.w..
..........
....s.....
.w.w.w.w..
.X.....h..
.w.w.w.w..
.c.......e`,
map`
p........t
.wwwwwwww.
.w......w.
.w.h.H..w.
.w......w.
.wwwwwwww.
.........w
.c.......w
.h.......w
.X....s.ew`,
map`
p........t
.wwwwwwww.
.w.www..w.
.w.w.w..w.
.w.w.s..w.
.w.w....w.
.w.wwwwww.
.w......w.
.c.h..Hwe.
.hXwwwwwww`,
map`
p........t
.w......w.
.w.h..H.w.
.w......w.
.wwwwwwww.
..........
....s.....
.c.......e
.w.X..h.w.
.w......w.`,
map`
p........t
.w..w..w..
.h..H..X..
.w..w..w..
..........
....s.....
..........
.c..w..w..
.h..w..w..
..........`,
map`
p........t
.w......w.
.w.h..X.w.
.w......w.
....s.....
..........
.w......w.
.w.H..h.w.
.w......w.
.c.......e`,
map`
p........t
.wwwwwwwww
.w........
.w.wwwwwww
.w.w......
.w.w.s....
.w.w......
.c.h.....e
.w.X.....H
.w.w.....h`,
map`
p........t
.w.w.w.w..
.w.w.w.w..
..........
.w.w.w.w..
.w.w.w.w..
....s.....
..........
.c..c..e..
.hH......Xh`,
map`
p........t
.wwwwwwww.
.h......w.
.wwwwww.w.
.w......w.
.w.wwwwww.
.w.w.s....
.w.w.H....
.c.X.....e
.h.......w`,
map`
p........t
.ww.ww.ww.
.w...w...w
.h...w...H
.ww.ww.ww.
....s.....
.ww.ww.ww.
.w...w...w
.X...w...h
.ww.ww.ww.`,
map`
p.c.c.c.et
..........
.wwwwwwww.
.w......w.
.w..s...w.
.w......w.
.wwwwwwww.
..........
.hH......X
.......h..`,
map`
p........t
.ww.ww.ww.
.w.....w..
.h.www.H..
.w.w.w.w..
.w.w.s.w..
.w.w.w.w..
.c.www.we.
.w.....w..
.X.....h..`,
map`
p........t
.h.......H
..........
..........
..........
....s.....
..........
..........
.X.......h
.c.......e`,
map`
p........t
..........
.ccc.cce..
..........
.wwwwwwww.
..s.......
.wwwwwwww.
..........
.hH.....Xh
..........`,
map`
p........t
.w.w.w.w..
.h.....H..
.w.w.w.w..
.wwwwwwww.
.....s...w
.wwwwwwww.
.w.w.w.w..
.X.....h..
.c.......e`,
map`
p........t
.wwwwwwww.
.w......w.
..wwwwww..
...w..w...
....ww....
....s.....
.c.......e
.hH.....Xh
..........`,
map`
p........t
.w.......w
.w.ccccc.w
.w.c...c.w
.w.c.s.c.w
.w.c...c.w
.w.ccccc.w
.w.......w
.hH.....Xh
.c.......e`,
map`
p........t
.wwwwwwww.
.w.......w
.w.wwwww.w
.w.w...w.w
.w.w.s.w.w
.w.w...w.w
.c.wwwww.e
.h.......H
.X.......h`,
map`
p.c.c.c.et
..........
.w.w.w.w..
.h.....H..
.w.w.w.w..
....s.....
.w.w.w.w..
.X.....h..
.w.w.w.w..
.h.......H`
]

const deliveriesNeeded = [
  1,1,1,2,3,3,2,3,4,2,
  2,2,2,2,2,3,3,3,3,3,
  2,2,3,3,3,2,3,3,3,3,
  3,3,3,3,1,3,3,3,3,3,
  3,3,3,3,3,3,3,3,3,3,
  3,3,3,3,3,3,3,3,3,3,
  3,3,3,4,4,4,4,4,4,4,
  4,4,4,4,4,4,4,4,4,4,
  4,4,4,4,4,4,4,4,4,4,
  4,4,4,4,4,4,4,4,4,5
]

let currentLevel = 0
let hasPackage = false
let chasing = false
let tickCount = 0
let policeWaitTicks = 4
let gameState = "instructions"
let deliveriesLeft = 1
let lives = 3

let policeNearCounts = {}
let dogSpawnCounter = 0
let dogsEnabled = true

function isOnSameTile(ax, ay, bx, by) {
  return ax === bx && ay === by
}

function isInRadius1(ax, ay, bx, by) {
  return Math.abs(ax - bx) <= 1 && Math.abs(ay - by) <= 1
}

function canMoveTo(nx, ny) {
  if (nx < 0 || nx >= width() || ny < 0 || ny >= height()) return false
  const tiles = getTile(nx, ny)
  for (const t of tiles) {
    if (t.type === wall) return false
  }
  return true
}

function showInstructions() {
  clearText()
  addText("DELIVERY BOY 2", { x: 0, y: 0, color: color`4` })
  addText("----------------", { x: 0, y: 1, color: color`1` })
  addText("Transport ILLEGAL", { x: 0, y: 2, color: color`3` })
  addText("goods across the", { x: 0, y: 3, color: color`3` })
  addText("city! Pkg=SHOP", { x: 0, y: 4, color: color`4` })
  addText("Deliver to HOUSE", { x: 0, y: 5, color: color`4` })
  addText("----------------", { x: 0, y: 6, color: color`1` })
  addText("Cop on you=LIFE!", { x: 0, y: 7, color: color`3` })
  addText("Dog on you=LIFE!", { x: 0, y: 8, color: color`3` })
  addText("3x near cop(1)=DOG", { x: 0, y: 9, color: color`5` })
  addText("Delivery = +1 Lv", { x: 0, y: 10, color: color`6` })
  addText("----------------", { x: 0, y: 11, color: color`1` })
  addText("WASD=Move", { x: 0, y: 12, color: color`D` })
  addText("K=Dogs ON/OFF", { x: 0, y: 13, color: color`D` })
  addText("DOGS ARE: " + (dogsEnabled ? "ON" : "OFF"), { x: 0, y: 14, color: dogsEnabled ? color`3` : color`8` })
  addText("J=Start/Continue", { x: 0, y: 15, color: color`D` })
}

function showHUD() {
  clearText()
  addText("Lv" + (currentLevel + 1), { x: 0, y: 0, color: color`6` })
  addText("Del:" + deliveriesLeft, { x: 4, y: 0, color: color`5` })
  addText("Lv" + lives, { x: 10, y: 0, color: color`3` })
  
  // Dog Status
  const dogStatusColor = dogsEnabled ? color`3` : color`8`
  addText("DOGS:" + (dogsEnabled ? "ON" : "OFF"), { x: 0, y: 2, color: dogStatusColor })

  if (!hasPackage) {
    addText("Go to SHOP", { x: 0, y: 1, color: color`D` })
  } else {
    addText("DELIVER PKG!", { x: 0, y: 1, color: color`5` })
  }
  if (chasing) {
    addText("!! CHASE !!", { x: 2, y: 3, color: color`3` })
  }
}

function showGameOver() {
  clearText()
  addText("GAME OVER!", { x: 1, y: 2, color: color`3` })
  addText("No lives left.", { x: 1, y: 4, color: color`F` })
  addText("Caught with", { x: 1, y: 5, color: color`F` })
  addText("illegal goods!", { x: 1, y: 6, color: color`F` })
  addText("J = Restart", { x: 2, y: 8, color: color`D` })
}

function showLostLife() {
  clearText()
  addText("CAUGHT!", { x: 2, y: 2, color: color`3` })
  addText("Lives left: " + lives, { x: 1, y: 4, color: color`5` })
  addText("Any key=Continue", { x: 0, y: 6, color: color`D` })
}

function showWin() {
  clearText()
  addText("YOU WIN!", { x: 2, y: 2, color: color`6` })
  addText("All illegal", { x: 1, y: 4, color: color`F` })
  addText("goods delivered!", { x: 1, y: 5, color: color`F` })
  addText("J = Play again", { x: 1, y: 7, color: color`D` })
}

function loadLevel(n) {
  hasPackage = false
  chasing = false
  tickCount = 0
  deliveriesLeft = deliveriesNeeded[n]
  policeNearCounts = {}
  dogSpawnCounter = 0
  clearText()
  setMap(levels[n])
  setSolids([wall, player, houseClosed])
  showHUD()
}

function loseLife() {
  lives--
  if (lives <= 0) {
    gameState = "gameover"
    showGameOver()
  } else {
    gameState = "lostlife"
    showLostLife()
  }
}

function getAllPolice() {
  let cops = []
  for (const t of allPoliceTypes) {
    cops = cops.concat(getAll(t))
  }
  return cops
}

function spawnDogFromStation() {
  if (!dogsEnabled) return;
  const stations = getAll(dogStation)
  if (stations.length > 0) {
    addSprite(stations[0].x, stations[0].y, dog)
    return
  }
  // fallback if no station in map
  const mapW = width()
  const mapH = height()
  const players = getAll(player)
  const px = players.length > 0 ? players[0].x : 0
  const py = players.length > 0 ? players[0].y : 0
  for (let attempts = 0; attempts < 40; attempts++) {
    const nx = Math.floor(Math.random() * mapW)
    const ny = Math.floor(Math.random() * mapH)
    if (canMoveTo(nx, ny) && (Math.abs(nx - px) > 3 || Math.abs(ny - py) > 3)) {
      addSprite(nx, ny, dog)
      return
    }
  }
}

function movePoliceTowardsPlayer(p) {
  const cops = getAllPolice()
  for (const cop of cops) {
    const path = findPath(cop.x, cop.y, p.x, p.y)
    if (path && path.length > 1) {
      cop.x = path[1].x
      cop.y = path[1].y
    }
  }
}

function movePoliceRandom() {
  const cops = getAllPolice()
  const dirs = [{ dx: 1, dy: 0 }, { dx: -1, dy: 0 }, { dx: 0, dy: 1 }, { dx: 0, dy: -1 }]
  for (const cop of cops) {
    const d = dirs[Math.floor(Math.random() * 4)]
    const nx = cop.x + d.dx
    const ny = cop.y + d.dy
    if (canMoveTo(nx, ny)) { cop.x = nx; cop.y = ny }
  }
}

function moveDogsTowardsPlayer(p) {
  if (!dogsEnabled) return;
  const dogs = getAll(dog)
  for (const d of dogs) {
    const path = findPath(d.x, d.y, p.x, p.y)
    if (path && path.length > 1) {
      d.x = path[1].x
      d.y = path[1].y
    }
  }
}

function findPath(startX, startY, targetX, targetY) {
  const queue = [{ x: startX, y: startY, path: [{ x: startX, y: startY }] }]
  const visited = new Set()
  visited.add(`${startX},${startY}`)

  while (queue.length > 0) {
    const { x, y, path } = queue.shift()

    if (x === targetX && y === targetY) return path

    const neighbors = [
      { nx: x + 1, ny: y },
      { nx: x - 1, ny: y },
      { nx: x, ny: y + 1 },
      { nx: x, ny: y - 1 }
    ]

    for (const { nx, ny } of neighbors) {
      if (canMoveTo(nx, ny) && !visited.has(`${nx},${ny}`)) {
        visited.add(`${nx},${ny}`)
        queue.push({ x: nx, y: ny, path: [...path, { x: nx, y: ny }] })
      }
    }
  }
  return null
}

function checkEvents() {
  const players = getAll(player)
  if (players.length === 0) return
  const p = players[0]

  // Dog on same tile = lose life
  const dogs = getAll(dog)
  for (const d of dogs) {
    if (isOnSameTile(d.x, d.y, p.x, p.y)) {
      loseLife(); return
    }
  }

  // Police
  const cops = getAllPolice()
  for (let i = 0; i < cops.length; i++) {
    const cop = cops[i]
    const onSame = isOnSameTile(cop.x, cop.y, p.x, p.y)
    const inRadius1 = isInRadius1(cop.x, cop.y, p.x, p.y)

    if (!policeNearCounts[i]) policeNearCounts[i] = { wasInRadius1: false, chasing: false }

    // Enter 1-radius → dog counter & chase activates
    if (inRadius1) {
      // Dog counter
      if (!policeNearCounts[i].wasInRadius1) {
        policeNearCounts[i].wasInRadius1 = true
        dogSpawnCounter++
        if (dogSpawnCounter % 3 === 0) {
          spawnDogFromStation()
          if (dogsEnabled) addText("DOG RELEASED!", { x: 1, y: 3, color: color`3` })
        }
      }
      
      // Chase activates
      if (!policeNearCounts[i].chasing) {
        policeNearCounts[i].chasing = true
        chasing = true
        showHUD()
      }
    } else {
      policeNearCounts[i].wasInRadius1 = false
    }

    // Cop on same tile → lose life
    if (onSame) {
      loseLife(); return
    }
  }

  // Shop
  const shops = getAll(shop)
  for (const s of shops) {
    if (isOnSameTile(s.x, s.y, p.x, p.y) && !hasPackage) {
      hasPackage = true
      showHUD()
    }
  }

  // House delivery
  const targetTypes = [house1, house2, house3]
  for (const houseType of targetTypes) {
    const houses = getAll(houseType)
    for (const h of houses) {
      if (isOnSameTile(h.x, h.y, p.x, p.y) && hasPackage) {
        h.type = houseClosed
        hasPackage = false
        deliveriesLeft--
        lives++
        if (deliveriesLeft <= 0) {
          currentLevel++
          if (currentLevel >= levels.length) {
            gameState = "win"
            showWin()
          } else {
            clearText()
            addText("Level " + (currentLevel + 1) + "!", { x: 2, y: 3, color: color`6` })
            addText("Lives: " + lives, { x: 2, y: 5, color: color`5` })
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

  const players = getAll(player)
  if (players.length === 0) return

  // Dogs move every player step
  moveDogsTowardsPlayer(players[0])

  // Police wait policeWaitTicks moves before each step
  if (tickCount % policeWaitTicks === 0) {
    if (chasing) {
      movePoliceTowardsPlayer(players[0])
    } else {
      movePoliceRandom()
    }
  }

  checkEvents()
}

function handleContinue() {
  if (gameState === "lostlife") {
    loadLevel(currentLevel)
    gameState = "playing"
    return true
  }
  if (gameState === "instructions" || gameState === "gameover" || gameState === "win") {
    return false // Only J should start/restart
  }
  return false
}

onInput("w", () => {
  if (handleContinue()) return
  if (gameState !== "playing") return
  const p = getAll(player)[0]
  if (p && canMoveTo(p.x, p.y - 1)) p.y -= 1
  afterMove()
})
onInput("s", () => {
  if (handleContinue()) return
  if (gameState !== "playing") return
  const p = getAll(player)[0]
  if (p && canMoveTo(p.x, p.y + 1)) p.y += 1
  afterMove()
})
onInput("a", () => {
  if (handleContinue()) return
  if (gameState !== "playing") return
  const p = getAll(player)[0]
  if (p && canMoveTo(p.x - 1, p.y)) p.x -= 1
  afterMove()
})
onInput("d", () => {
  if (handleContinue()) return
  if (gameState !== "playing") return
  const p = getAll(player)[0]
  if (p && canMoveTo(p.x + 1, p.y)) p.x += 1
  afterMove()
})
onInput("j", () => {
  lives = 3
  gameState = "playing"
  currentLevel = 0
  loadLevel(80)
})

onInput("k", () => {
  dogsEnabled = !dogsEnabled
  if (!dogsEnabled) {
    // Remove existing dogs if disabled
    const dogs = getAll(dog)
    dogs.forEach(d => d.remove())
  }
  
  if (gameState === "playing") {
    showHUD()
  } else if (gameState === "instructions") {
    showInstructions()
  }
})

showInstructions()
setMap(levels[0])
setSolids([wall, player, houseClosed])
