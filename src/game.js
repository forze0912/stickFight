import kaboom from "kaboom"
kaboom()

loadSprite("player", "https://raw.githubusercontent.com/forze0912/stickFight/master/src/sprites/stick-man-2863519_1280.png")
loadBean()
add([
    rect(64, 64),
    pos(center()),
    origin("center"),
    "test"
])

function spawnEnemy() {
    const enemy2 = add([
        sprite("bean"),
        pos(10, rand(100, 500)),
        area(),
        solid(),
        move(RIGHT, 100),
        "enemy"
    ])

    wait(rand(0.5, 4), spawnEnemy);

}

function hologram() {
    const player3 = add([
        sprite("player"),
        area(),
        scale(0.050),
        solid(),
        pos(center()),
        origin("center"),
        "Troop"
    ])

    keyPress("space", () => {
        destroy(player3)
    })


    player3.action(() => {
        player3.pos = mousePos()
    })
}

function troop2() {
    const player4 = add([
        sprite("player"),
        area(),
        scale(0.050),
        solid(),
        pos(center()),
        origin("center"),
        "Troop"
    ])

    keyDown("space", () => {
        destroy(player4)
    })


    player4.action(() => {
        player4.pos = mousePos()
    })

}

function tower() {
    const tower = add([
        rect(64, 128),
        area(),
        solid(),
        pos(mousePos()),
        origin("center")
    ])

    keyDown("space", () => {
        destroy(tower)
    })

    tower.action(() => {
        tower.pos = mousePos()
    })
}

function spawn() {
    const player = add([
        sprite("player"),
        area(),
        scale(0.050),
        solid(),
        pos(center()),
        origin("center"),
        "Troop"
    ])
    player.action(() => {
        player.pos = mousePos()
    })

    var towers = 0

    var card = 1

    keyPress("right", () => {
        tower()
        towers = towers + 1
        card = 3
    })

    hologram()

    var players = 1

    var players2 = 0

    keyPress("up", () => {
        players = players + 1
        card = 1
        hologram()
    })

    keyPress("down", () => {
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

    keyDown("space", () => {
        if (card === 1) {
            if (players > 0) {
                destroy(player)
                const player2 = add([
                    sprite("player"),
                    scale(0.05),
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
                    }

                })

                players = players - 1

            }
        }
    })

    keyDown("space", () => {
        if (card === 2) {
            if (players2 > 0) {
                const tractor = add([
                    sprite("player"),
                    scale(0.05),
                    pos(mousePos()),
                    area(),
                    solid(),
                    cleanup(5),
                    move(LEFT, 750),
                    origin("center")
                ])

                tractor.collides("enemy", (e) => {
                    if (e.is("enemy")) {
                        setTimeout(() => {
                            const explosion = add([
                                rect(500, 500),
                                area(),
                                pos(tractor.pos),
                                origin("center"),
                                "explosions"
                            ])

                            explosion.collides("enemy", () => {
                                destroy(e)
                            })

                            setTimeout(() => {
                                destroy(explosion)
                            }, 2000)
                        }, 1000)
                    }
                })

                players2 = players2 - 1

            } else {
                return
            }
        } else {
            return;
        }
    })

    keyDown("space", () => {
        if (card === 3) {
            if (towers > 0) {
                const tower = add([
                    rect(64, 128),
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
                    })

                    setTimeout(() => {
                        destroy(explosion)
                    }, 1000)
                })


                towers = towers - 1
            } else {
                return
            }
        } else {
            return;
        }
    })

}

spawn()

spawnEnemy()