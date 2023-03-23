function explode(X1, Y1) {
    let blocksToDestroy = []
    let x = 0
    let y = 8
    let delta = 1 - 2 * 8
    let error = 0
    while (y >= x) {
        for (let bx = X1 - x; bx <= X1 + x; bx++) {
            for (let by = Y1 - y; by <= Y1 + y; by++) {
                let addBlock = true
                for (let block of blocksToDestroy) {
                    if (block.x == bx && block.y == by) {
                        addBlock = false
                        break
                    }
                }
                if (addBlock) {
                    blocksToDestroy.push({ x: bx, y: by })
                }
            }
        }
        for (let bx = X1 - y; bx <= X1 + y; bx++) {
            for (let by = Y1 - x; by <= Y1 + x; by++) {
                let addBlock = true
                for (let block of blocksToDestroy) {
                    if (block.x == bx && block.y == by) {
                        addBlock = false
                        break
                    }
                }
                if (addBlock) {
                    blocksToDestroy.push({ x: bx, y: by })
                }
            }
        }
        error = 2 * (delta + y) - 1
        if (delta < 0 && error <= 0) {
            delta += 2 * ++x + 1
            continue
        }
        if (delta > 0 && error > 0) {
            delta -= 2 * --y + 1
            continue
        }
        delta += 2 * (++x - --y)
    }

    for (block of blocksToDestroy) {
        if (world.getBlock(block.x, block.y) != "0") {
            let velX = 0
            let velY = 0

            if (block.x - X1 > 0) {
                velX = (8.5 - (block.x - X1)) / 8.5
            } else if (block.x - X1 < 0) {
                velX = -(8.5 + (block.x - X1)) / 8.5
            } else {
                velX = 0
            }

            if (block.y - Y1 > 0) {
                velY = (8.5 - (block.y - Y1)) / 8.5
            } else if (block.y - Y1 < 0) {
                velY = -(8.5 + (block.y - Y1)) / 8.5
            } else {
                velY = 0
            }

            console.log("VelX: " + velX)
            console.log("VelY: " + velY)

            for (let i = 0; i < 8 * (1 - Math.abs(velX) ** 2 + 1 - Math.abs(velY) ** 2); i++) {
                currentParticles.push(new blockParticle(world.getBlock(block.x, block.y), { x: block.x + 0.5, y: block.y + 0.5 }, { x: velX ** 3 + Math.random() - 0.5, y: velY ** 3 + Math.random() - 0.5 }, 25))
            }
        }
    }

    if ((X1 + 0.5 - player.position.x) ** 2 + (Y1 + 0.5 - player.position.y - player.size.y / 2) ** 2 < 8.5 ** 2) {
        let velX = 0
        let velY = 0
        if (player.position.x - X1 - 0.5 > 0) {
            velX = (8.5 - (player.position.x - X1 - 0.5)) / 8.5
        } else if (player.position.x - X1 - 0.5 < 0) {
            velX = -(8.5 + (player.position.x - X1 - 0.5)) / 8.5
        } else {
            velX = 0
        }

        if (player.position.y - player.size.y / 2 - Y1 - 0.5 > 0) {
            velY = (8.5 - (player.position.y - player.size.y / 2 - Y1 - 0.5)) / 8.5
        } else if (player.position.y - player.size.y / 2 - Y1 - 0.5 < 0) {
            velY = -(8.5 + (player.position.y - player.size.y / 2 - Y1 - 0.5)) / 8.5
        } else {
            velY = 0
        }

        player.velocity.x = velX
        player.velocity.y = velY

        player.health -= ((Math.abs(velX) + Math.abs(velY)) * 2) ** 3

    }

    for (entity of currentEnteties) {
        if ((X1 + 0.5 - entity.position.x) ** 2 + (Y1 + 0.5 - entity.position.y - entity.size.y / 2) ** 2 < 8.5 ** 2) {
            let velX = 0
            let velY = 0
            if (entity.position.x - X1 - 0.5 > 0) {
                velX = (8.5 - (entity.position.x - X1 - 0.5)) / 8.5
            } else if (entity.position.x - X1 - 0.5 < 0) {
                velX = -(8.5 + (entity.position.x - X1 - 0.5)) / 8.5
            } else {
                velX = 0
            }

            if (entity.position.y - entity.size.y / 2 - Y1 - 0.5 > 0) {
                velY = (8.5 - (entity.position.y - entity.size.y / 2 - Y1 - 0.5)) / 8.5
            } else if (entity.position.y - entity.size.y / 2 - Y1 - 0.5 < 0) {
                velY = -(8.5 + (entity.position.y - entity.size.y / 2 - Y1 - 0.5)) / 8.5
            } else {
                velY = 0
            }

            entity.velocity.x = velX
            entity.velocity.y = velY

            entity.health -= ((Math.abs(velX) + Math.abs(velY)) * 2) ** 3

        }
    }
    destroyBlocks(blocksToDestroy)

    // let audio = new Audio("sounds/explosion.mp3")
    // audio.volume = 0.05
    // audio.play()
}