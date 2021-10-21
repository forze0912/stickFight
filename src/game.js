import kaboom from "kaboom"

var cardList = []

const Entity = function () {
    var wasd = {
        sprite: "",
        scale: ""
    }
    return wasd
}

var Knight = function () {
    var wasd = Entity()
    wasd.sprite = "player",
        wasd.scale = 0.05

    cardList.push([
        "Knight"
    ])
    return wasd
}
var knight = Knight()

Knight.update = function () {
    const player2 = add([
        sprite(knight.sprite),
        scale(knight.scale),
        pos(mousePos()),
        area(),
        cleanup(5),
        move(LEFT, 750),
        solid(),
        origin("center")
    ])

    player2.collides("enemy", (e) => {
        if (e.is("enemy")) {
            destroy(e)
            kills = kills + 1
            if (kills >= 15) {
                console.log(kills)
                const level = add([
                    text(`Raid Successful`),
                    fixed(),
                    pos(center()),
                    origin("center"),
                    area()
                ])
                setTimeout(() => {
                    go("main")
                }, 2000)

                kills = 0

                action(() => {
                    destroyAll("enemy")
                    kills = 0

                })

            }

        }

    })

}

var Tractor = function () {
    var wasd = Entity()
    wasd.sprite = "tractor",
        wasd.scale = 0.15

    cardList.push([
        "Tractor"
    ])

    return wasd

}

var tractor2 = Tractor()

Tractor.update = function () {
    var wasd = 25
    const tractor = add([
        sprite(tractor2.sprite),
        scale(tractor2.scale),
        pos(mousePos()),
        area(),
        solid(),
        cleanup(5),
        move(LEFT, 500),
        origin("center"),
        rotate(wasd)
    ])

    tractor.collides("enemy", (e) => {
        const explosion = add([
            rect(500, 500),
            area(),
            pos(tractor.pos),
            origin("center"),
            "explosions"
        ])

        explosion.collides("enemy", () => {
            destroy(e)
            var timeout = 0
            loop(10, () => {
                kills = kills + 1
            })

            if (kills >= 15) {
                console.log(kills)
                const level = add([
                    text(`Raid Successful`),
                    fixed(),
                    pos(center()),
                    origin("center"),
                    area()
                ])

                kills = 0
                setTimeout(() => {
                    go("main")
                }, 2000)

                action(() => {
                    destroyAll("enemy")
                    kills = 0

                })
            }

        })

        setTimeout(() => {
            destroy(explosion)
        }, 1000)


    })
}

var TowerOfHell = function () {
    var wasd = Entity()
    wasd.sprite = "bomb",
        wasd.scale = 0.09

    cardList.push([
        "Bomb Tower"
    ])

    return wasd
}

var towerOfHell = TowerOfHell()

TowerOfHell.update = function () {
    const tower = add([
        sprite(towerOfHell.sprite),
        scale(towerOfHell.scale),
        area(),
        solid(),
        pos(mousePos()),
        origin("center")
    ])

    setTimeout(() => {
        destroy(tower)
    }, 10000)
    tower.collides("enemy", (e) => {
        const explosion = add([
            rect(500, 500),
            area(),
            pos(tower.pos),
            origin("center"),
            "explosions"
        ])

        explosion.collides("enemy", () => {
            destroy(e)
            var timeout = 0
            loop(10, () => {
                kills = kills + 1
            })

            if (kills >= 15) {
                console.log(kills)
                const level = add([
                    text(`Raid Successful`),
                    fixed(),
                    pos(center()),
                    origin("center"),
                    area()
                ])

                kills = 0
                setTimeout(() => {
                    go("main")
                }, 2000)

                action(() => {
                    destroyAll("enemy")
                    kills = 0

                })
            }

        })

        setTimeout(() => {
            destroy(explosion)
        }, 1000)
    })
}

console.log(knight.sprite)

kaboom({
    debug: false
})


loadSprite("player", "https://raw.githubusercontent.com/forze0912/stickFight/master/src/sprites/stick-man-2863519_1280.png")
loadSprite("bomb", "https://raw.githubusercontent.com/forze0912/stickFight/master/src/sprites/bomb%20tower.png")
loadSprite("tractor", "https://raw.githubusercontent.com/forze0912/stickFight/master/src/sprites/pixil-frame-0.png")

loadBean()

scene("main", () => {
    var troops = cardList



    let troopsScale = 1 / troops.length * 2

    const troopLabel = add([
        text(troops),
        fixed(),
        scale(troopsScale),
        area(),
    ])

    const letsraid = add([
        rect(64 * 4 * 2 * +100 * 2, 64 * 2),
        area(),
        pos(center()),
        origin("center")
    ])
    keyPress("space", () => {
        go("raid1", kills = 0)
    })

    const raidText = add([
        text("Raid, Press space to raid!"),
        pos(letsraid.pos),
        origin("center"),
        area()
    ])

})

scene("raid1", () => {
    var kills = 0

    add([
        rect(64, 64),
        pos(center()),
        origin("center"),
        "test"
    ])

    function spawnEnemy() {
        var checker = 1
        if (checker === 1) {
            const enemy2 = add([
                sprite("bean"),
                pos(10, rand(100, 500)),
                area(),
                solid(),
                move(RIGHT, 100),
                "enemy"
            ])
            wait(rand(0.5, 4), spawnEnemy);

        } else {
            return;
        }

    }

    var cardChoice1 = Knight
    var cardChoice2 = Tractor
    var cardChoice3 = TowerOfHell

    var cardChoice12 = knight
    var cardChoice22 = tractor2
    var cardChoice32 = towerOfHell

    function hologram() {
        const player3 = add([
            sprite("player"),
            area(),
            scale(cardChoice12.scale),
            pos(center()),
            origin("center"),
            "Troop"
        ])

        mouseDown(() => {
            destroy(player3)
        })

        keyDown("2", () => {
            destroy(player3)
        })

        keyDown("3", () => {
            destroy(player3)
        })


        player3.action(() => {
            player3.pos = mousePos()
        })
    }

    function troop2() {
        const player4 = add([
            sprite(cardChoice22.sprite),
            area(),
            scale(cardChoice22.scale),
            pos(center()),
            origin("center"),
            "Troop"
        ])

        keyDown("3", () => {
            destroy(player4)
        })

        keyDown("1", () => {
            destroy(player4)
        })

        mouseDown(() => {
            destroy(player4)
        })


        player4.action(() => {
            player4.pos = mousePos()
        })

    }

    function tower() {
        const tower = add([
            sprite(cardChoice32.sprite),
            area(),
            pos(mousePos()),
            scale(towerOfHell.scale),
            origin("center")
        ])

        keyDown("2", () => {
            destroy(tower)
        })

        keyDown("1", () => {
            destroy(tower)
        })


        mouseDown(() => {
            destroy(tower)
        })

        tower.action(() => {
            tower.pos = mousePos()
        })
    }

    function spawn() {
        const player = add([
            sprite(cardChoice12.sprite),
            area(),
            scale(0.050),
            pos(center()),
            origin("center"),
            "Troop"
        ])
        player.action(() => {
            player.pos = mousePos()
        })

        keyDown("2", () => {
            destroy(player)
        })

        keyDown("3", () => {
            destroy(player)
        })


        var towers = 0

        var card = 1

        keyPress("3", () => {
            tower()
            towers = towers + 1
            card = 3
        })

        hologram()

        var players = 1

        var players2 = 0

        keyPress("1", () => {
            players = players + 1
            card = 1
            hologram()
        })

        keyPress("2", () => {
            players2 = players2 + 1
            card = 2
            troop2()
        })

        keyDown("1", () => {
            card = 1
        })

        keyDown("2", () => {
            card = 2
        })

        keyDown("3", () => {
            card = 3
        })

        var wasd = 15

        mouseDown(() => {
            if (card === 1) {
                if (players > 0 && cards > 0) {
                    destroy(player)
                    cardChoice1.update()
                    players = players - 1
                    cards = cards - 1
                    cardLabel.text = `${cards} cards lefts`

                }
            }
        })

        var cards = 50

        const cardLabel = add([
            text(`${cards} cards lefts`),
            pos(20, 40),
            fixed(),
            area()
        ])

        mouseDown(() => {
            if (card === 2) {
                if (players2 > 0 && cards > 0) {
                    cardChoice2.update()
                    players2 = players2 - 1
                    cards = cards - 1
                    cardLabel.text = `${cards} cards lefts`

                } else {
                    return
                }
            } else {
                return;
            }
        })

        mouseDown(() => {
            if (card === 3) {
                if (towers > 0 && cards > 0) {
                    cardChoice3.update()
                    towers = towers - 1
                    cards = cards - 1
                    cardLabel.text = `${cards} cards lefts`
                } else {
                    return
                }
            } else {
                return;
            }
        })

        action(() => {
            if (kills >= 15) {
                kills = 0
            }
        })
        action(() => {
            console.log(kills)
        })

    }

    spawn()

    spawnEnemy()
})

go("main")