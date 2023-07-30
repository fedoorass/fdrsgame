//Канвас
let cvs = document.getElementById("cvs"),
    ctx = cvs.getContext("2d");

//Изменение размеров холста
window.addEventListener("resize", resizeCanvas, false)
function resizeCanvas() {
    cvs.width = window.innerWidth
    cvs.height = window.innerHeight
    ctx.imageSmoothingEnabled = false
}
resizeCanvas();

//Мышь
let mouse = {
    x: 0,
    y: 0,
    pressedButton: false
}

window.addEventListener("mousedown", e => {
    mouse.pressedButton = e.button
    player.pressedButton = e.button
})

window.addEventListener("mouseup", e => {
    mouse.pressedButton = null
    player.pressedButton = null
})

window.addEventListener("mousemove", e => {
    mouse.x = e.offsetX
    mouse.y = e.offsetY
})


//Игрок
let player = {
    position: { x: 32, y: 32 },
    velocity: { x: 0, y: 0 },
    size: { x: 1.25, y: 2.5 },
    w: 1.25,
    h: 2.5,
    health: 100,
    jumped: false,
    isOnGround: false,
    move: function (x, y) {
        let rects = []
        let chunkLeft = false,
            chunkRight = false,
            chunkTop = false,
            chunkBottom = false

        if (Math.floor(this.position.x - this.size.x / 2 + x) < Math.floor((this.position.x + x) / 16) * 16) {
            chunkLeft = true
        }

        if (Math.floor(this.position.x + this.size.x / 2 + x) >= Math.floor((this.position.x + x) / 16) * 16 + 16) {
            chunkRight = true
        }


        if (Math.floor(this.position.y + y - this.size.y) < Math.floor((this.position.y + y) / 16) * 16) {
            chunkTop = true
        }

        if (Math.floor(this.position.y + y) >= Math.floor((this.position.y + y) / 16) * 16 + 16) {
            chunkBottom = true
        }

        for (let rect of world.chunksArray[Math.floor((this.position.x + x) / 16)][Math.floor((this.position.y + y) / 16)].collisionRects) {
            rects.push({
                x: rect.x + Math.floor((this.position.x + x) / 16) * 16,
                y: rect.y + Math.floor((this.position.y + y) / 16) * 16,
                w: rect.w,
                h: rect.h
            })
        }
        if (options.drawCollisionChunks) {
            drawRect("rgba(255, 255, 0, 0.1)", { x: Math.floor((this.position.x + x) / 16) * 16, y: Math.floor((this.position.y + y) / 16) * 16 }, { x: 128, y: 128 })
        }

        if (chunkLeft) {
            for (let rect of world.chunksArray[Math.floor((this.position.x + x) / 16) - 1][Math.floor((this.position.y + y) / 16)].collisionRects) {
                rects.push({
                    x: rect.x + Math.floor((this.position.x + x) / 16) * 16 - 16,
                    y: rect.y + Math.floor((this.position.y + y) / 16) * 16,
                    w: rect.w,
                    h: rect.h
                })
            }
            if (options.drawCollisionChunks) {
                drawRect("rgba(255, 255, 0, 0.1)", { x: Math.floor((this.position.x + x) / 16) * 16 - 16, y: Math.floor((this.position.y + y) / 16) * 16 }, { x: 128, y: 128 })
            }
        }


        if (chunkRight) {
            for (let rect of world.chunksArray[Math.floor((this.position.x + x) / 16) + 1][Math.floor((this.position.y + y) / 16)].collisionRects) {
                rects.push({
                    x: rect.x + Math.floor((this.position.x + x) / 16) * 16 + 16,
                    y: rect.y + Math.floor((this.position.y + y) / 16) * 16,
                    w: rect.w,
                    h: rect.h
                })
            }
            if (options.drawCollisionChunks) {
                drawRect("rgba(255, 255, 0, 0.1)", { x: Math.floor((this.position.x + x) / 16) * 16 + 16, y: Math.floor((this.position.y + y) / 16) * 16 }, { x: 128, y: 128 })
            }
        }

        if (chunkTop) {
            for (let rect of world.chunksArray[Math.floor((this.position.x + x) / 16)][Math.floor((this.position.y + y) / 16) - 1].collisionRects) {
                rects.push({
                    x: rect.x + Math.floor((this.position.x + x) / 16) * 16,
                    y: rect.y + Math.floor((this.position.y + y) / 16) * 16 - 16,
                    w: rect.w,
                    h: rect.h
                })
            }
            if (options.drawCollisionChunks) {
                drawRect("rgba(255, 255, 0, 0.1)", { x: Math.floor((this.position.x + x) / 16) * 16, y: Math.floor((this.position.y + y) / 16) * 16 - 16 }, { x: 128, y: 128 })
            }
        }

        if (chunkBottom) {
            for (let rect of world.chunksArray[Math.floor((this.position.x + x) / 16)][Math.floor((this.position.y + y) / 16) + 1].collisionRects) {
                rects.push({
                    x: rect.x + Math.floor((this.position.x + x) / 16) * 16,
                    y: rect.y + Math.floor((this.position.y + y) / 16) * 16 + 16,
                    w: rect.w,
                    h: rect.h
                })
            }
            if (options.drawCollisionChunks) {
                drawRect("rgba(255, 255, 0, 0.1)", { x: Math.floor((this.position.x + x) / 16) * 16, y: Math.floor((this.position.y + y) / 16) * 16 + 16 }, { x: 128, y: 128 })
            }
        }


        if (chunkLeft && chunkTop) {
            for (let rect of world.chunksArray[Math.floor((this.position.x + x) / 16) - 1][Math.floor((this.position.y + y) / 16) - 1].collisionRects) {
                rects.push({
                    x: rect.x + Math.floor((this.position.x + x) / 16) * 16 - 16,
                    y: rect.y + Math.floor((this.position.y + y) / 16) * 16 - 16,
                    w: rect.w,
                    h: rect.h
                })
            }
            if (options.drawCollisionChunks) {
                drawRect("rgba(255, 255, 0, 0.1)", { x: Math.floor((this.position.x + x) / 16) * 16 - 16, y: Math.floor((this.position.y + y) / 16) * 16 - 16 }, { x: 128, y: 128 })
            }
        }

        if (chunkRight && chunkTop) {
            for (let rect of world.chunksArray[Math.floor((this.position.x + x) / 16) + 1][Math.floor((this.position.y + y) / 16) - 1].collisionRects) {
                rects.push({
                    x: rect.x + Math.floor((this.position.x + x) / 16) * 16 + 16,
                    y: rect.y + Math.floor((this.position.y + y) / 16) * 16 - 16,
                    w: rect.w,
                    h: rect.h
                })
            }
            if (options.drawCollisionChunks) {
                drawRect("rgba(255, 255, 0, 0.1)", { x: Math.floor((this.position.x + x) / 16) * 16 + 16, y: Math.floor((this.position.y + y) / 16) * 16 - 16 }, { x: 128, y: 128 })
            }
        }

        if (chunkLeft && chunkBottom) {
            for (let rect of world.chunksArray[Math.floor((this.position.x + x) / 16) - 1][Math.floor((this.position.y + y) / 16) + 1].collisionRects) {
                rects.push({
                    x: rect.x + Math.floor((this.position.x + x) / 16) * 16 - 16,
                    y: rect.y + Math.floor((this.position.y + y) / 16) * 16 + 16,
                    w: rect.w,
                    h: rect.h
                })
            }
            if (options.drawCollisionChunks) {
                drawRect("rgba(255, 255, 0, 0.1)", { x: Math.floor((this.position.x + x) / 16) * 16 - 16, y: Math.floor((this.position.y + y) / 16) * 16 + 16 }, { x: 128, y: 128 })
            }
        }

        if (chunkRight && chunkBottom) {
            for (let rect of world.chunksArray[Math.floor((this.position.x + x) / 16) + 1][Math.floor((this.position.y + y) / 16) + 1].collisionRects) {
                rects.push({
                    x: rect.x + Math.floor((this.position.x + x) / 16) * 16 + 16,
                    y: rect.y + Math.floor((this.position.y + y) / 16) * 16 + 16,
                    w: rect.w,
                    h: rect.h
                })
            }
            if (options.drawCollisionChunks) {
                drawRect("rgba(255, 255, 0, 0.1)", { x: Math.floor((this.position.x + x) / 16) * 16 + 16, y: Math.floor((this.position.y + y) / 16) * 16 + 16 }, { x: 128, y: 128 })
            }
        }

        let minX = x,
            minY = y
        this.isOnGround = false
        for (let rect of rects) {
            if (this.position.x + this.size.x / 2 + minX > rect.x && this.position.x - this.size.x / 2 + minX < rect.x + rect.w && this.position.y > rect.y && this.position.y - this.size.y < rect.y + rect.h) {
                if (minX > 0) {
                    minX = Math.min(minX, rect.x - this.position.x - this.size.x / 2)
                } else if (minX < 0) {
                    minX = Math.max(minX, rect.x + rect.w - this.position.x + this.size.x / 2)
                }
                this.velocity.x = 0
            }
            else if (this.position.x + this.size.x / 2 > rect.x && this.position.x - this.size.x / 2 < rect.x + rect.w && this.position.y + minY > rect.y && this.position.y - this.size.y + minY < rect.y + rect.h) {
                if (minY > 0) {
                    minY = Math.min(minY, rect.y - this.position.y)
                    this.isOnGround = true
                } else if (minY < 0) {
                    minY = Math.max(minY, rect.y + rect.h - this.position.y + this.size.y)
                }
                this.velocity.y = 0
            }
        }

        this.position.x += minX
        this.position.y += minY
        document.getElementById("playerVelX").innerHTML = this.velocity.x
        document.getElementById("playerVelY").innerHTML = this.velocity.y
        document.getElementById("playerIsOnGround").innerHTML = this.isOnGround
        document.getElementById("playerHealth").innerHTML = this.health
    },
    pressedButton: false
}

//Дистанция каммеры
let z = 48

if (document.addEventListener) {
    if ("onwheel" in document) {
        document.addEventListener("wheel", camDistChange)
    }
}

function camDistChange(exept) {
    exept = exept || window.event
    let delta = 4 * (exept.deltaY || exept.detail || exept.wheelDelta) / 100
    if (z - delta >= 4 && z - delta < 1024) {
        z -= delta
    }
}

//Отрисовка мира по чанкам
function drawChunkRects(x, y) {
    ctx.fillStyle = "black"
    for (let i of world.chunksArray[x][y].collisionRects) {
        ctx.fillRect((x * 16 - player.position.x + player.size.x / 2) * z + cvs.width / 2 - z * player.size.x / 2 + i.x * z, (y * 16 - player.position.y + player.size.y / 2) * z + cvs.height / 2 + i.y * z, z * i.w, z / 32)
        ctx.fillRect((x * 16 - player.position.x + player.size.x / 2) * z + cvs.width / 2 - z * player.size.x / 2 + (i.x + i.w) * z, (y * 16 - player.position.y + player.size.y / 2) * z + cvs.height / 2 + i.y * z, z / 32, z * i.h)
        ctx.fillRect((x * 16 - player.position.x + player.size.x / 2) * z + cvs.width / 2 - z * player.size.x / 2 + i.x * z, (y * 16 - player.position.y + player.size.y / 2) * z + cvs.height / 2 + (i.y + i.h) * z, z * i.w, z / 32)
        ctx.fillRect((x * 16 - player.position.x + player.size.x / 2) * z + cvs.width / 2 - z * player.size.x / 2 + i.x * z, (y * 16 - player.position.y + player.size.y / 2) * z + cvs.height / 2 + i.y * z, z / 32, z * i.h)
    }
}

function drawChunk(x, y) {
    ctx.drawImage(world.chunksArray[x][y].image, (x * 16 - player.position.x + player.size.x / 2) * z + cvs.width / 2 - z * player.size.x / 2, (y * 16 - player.position.y + player.size.y / 2) * z + cvs.height / 2, z * 16, z * 16)
    //drawChunkRects(x, y)
}


function drawWorld() {
    let leftX = Math.min((Math.max((Math.floor((player.position.x - player.size.x / 2 - cvs.width / (2 * z)) / 16)), 0)), world.chunksArray.length - 1),
        topY = Math.min((Math.max((Math.floor((player.position.y - player.size.y - cvs.height / (2 * z)) / 16)), 0)), world.chunksArray[0].length - 1),
        rightX = Math.min((Math.max((Math.ceil((player.position.x + player.size.x / 2 + cvs.width / (2 * z)) / 16)), 0)), world.chunksArray.length - 1),
        bottomY = Math.min((Math.max((Math.ceil((player.position.y - player.size.y + cvs.height / (2 * z)) / 16)), 0)), world.chunksArray[0].length - 1)
    for (let x = leftX; x <= rightX; x++) {
        for (let y = topY; y <= bottomY; y++) {
            drawChunk(x, y)
        }
    }
}

//Отрисовка игрока
function drawPlayer() {
    ctx.fillStyle = "black";
    ctx.fillRect(cvs.width / 2 - z * player.size.x / 2, cvs.height / 2 - z * player.size.y / 2, player.size.x * z, player.size.y * z)
    document.getElementById("playerX").innerHTML = "X: " + player.position.x
    document.getElementById("playerY").innerHTML = "Y: " + player.position.y
}

resizeCanvas();

//Партиклы
let currentParticles = []

//Сущности
let currentEnteties = []

//Рендер
function draw() {
    ctx.fillStyle = "#add6ff";
    ctx.fillRect(0, 0, cvs.width, cvs.height)
    drawWorld()
    drawPlayer()

    //Партиклы
    for (let i in currentParticles) {
        if (currentParticles[i].time > 0) {
            currentParticles[i].update()
        }
        else {
            currentParticles.splice(i, 1)
        }
    }

    for (let i in currentEnteties) {
        if (currentEnteties[i].health > 0) {
            currentEnteties[i].update()
        }
        else {
            currentEnteties.splice(i, 1)
        }
    }
    //drawBlockSelection(blockSelectionPosition)
    // ctx.fillStyle = "rgba(255, 255, 0, 0.1)"
    // ctx.fillRect(0, 0, 512, 512)
    drawGUI()
}


//FPS
let lastLoop = new Date(),
    thisLoop,
    fps
function fpsCount() {
    thisLoop = new Date()
    document.getElementById("fps").innerHTML = "FPS " + Math.round(1000 / (thisLoop - lastLoop))
    lastLoop = thisLoop
}

//Цикл
function main() {
    draw()
    playerControl()
    blockSelecting()
    //FPS
    fpsCount()
    window.requestAnimationFrame(main)
}

//Управление
let activeKeys = [];

document.addEventListener('keydown', function (exept) {
    activeKeys[exept.keyCode] = true
})

document.addEventListener('keyup', function (exept) {
    delete activeKeys[exept.keyCode]
})

function playerControl() {
    if (activeKeys[68]) {
        player.velocity.x = Math.min(player.velocity.x + 0.03125, 0.25)
    }

    if (activeKeys[65]) {
        player.velocity.x = Math.max(player.velocity.x - 0.03125, -0.25)
    }

    if (!activeKeys[68] && !activeKeys[65] && player.velocity.x != 0) {
        player.velocity.x = Math.max(Math.abs(player.velocity.x) - 0.03125, 0) * (player.velocity.x / Math.abs(player.velocity.x))
    }

    if (player.isOnGround && (activeKeys[87] ) && !player.jumped) {
        player.velocity.y -= 0.5
        player.jumped = true
    }
    if ((!activeKeys[87] || activeKeys[32]) && player.isOnGround) {
        player.jumped = false
    }

    player.velocity.x = Math.min(player.velocity.x, options.maxVelocity)
    player.velocity.y = Math.min(player.velocity.y + world.gravity, options.maxVelocity)
    player.move(player.velocity.x, player.velocity.y)
}

function destroyBlocks(blocksToDestroy) {
    let chunksToUpdate = []
    for (let block of blocksToDestroy) {
        if (block.x >= 0 && block.y >= 0 && block.x < world.width && block.y < world.height && world.getBlock(block.x, block.y) != "0") {
            world.chunksArray[Math.floor(block.x / 16)][Math.floor(block.y / 16)].blocksArray[block.x % 16][block.y % 16] = "0"
            chunksToAdd = []
            chunksToAdd.push({ x: Math.floor(block.x / 16), y: Math.floor(block.y / 16), onlyImage: false })
            if (block.x % 16 < options.lightingRadius) {
                chunksToAdd.push({ x: Math.floor(block.x / 16) - 1, y: Math.floor(block.y / 16), onlyImage: true })
                if (block.y % 16 < options.lightingRadius) {
                    chunksToAdd.push({ x: Math.floor(block.x / 16) - 1, y: Math.floor(block.y / 16) - 1, onlyImage: true })
                }
                else if (block.y % 16 >= 16 - options.lightingRadius) {
                    chunksToAdd.push({ x: Math.floor(block.x / 16) - 1, y: Math.floor(block.y / 16) + 1, onlyImage: true })
                }
            }
            else if (block.x % 16 >= 16 - options.lightingRadius) {
                chunksToAdd.push({ x: Math.floor(block.x / 16) + 1, y: Math.floor(block.y / 16), onlyImage: true })
                if (block.y % 16 < options.lightingRadius) {
                    chunksToAdd.push({ x: Math.floor(block.x / 16) + 1, y: Math.floor(block.y / 16) - 1, onlyImage: true })
                }
                else if (block.y % 16 >= 16 - options.lightingRadius) {
                    chunksToAdd.push({ x: Math.floor(block.x / 16) + 1, y: Math.floor(block.y / 16) + 1, onlyImage: true })
                }
            }
            if (block.y % 16 < options.lightingRadius) {
                chunksToAdd.push({ x: Math.floor(block.x / 16), y: Math.floor(block.y / 16) - 1, onlyImage: true })
            }
            else if (block.y % 16 >= 16 - options.lightingRadius) {
                chunksToAdd.push({ x: Math.floor(block.x / 16), y: Math.floor(block.y / 16) + 1, onlyImage: true })
            }
            for (let newChunk of chunksToAdd) {
                addChunk = true
                for (let chunk of chunksToUpdate) {
                    if (newChunk.x == chunk.x && newChunk.y == chunk.y && newChunk.onlyImage == chunk.onlyImage) {
                        addChunk = false
                        break
                    }
                }
                if (addChunk) {
                    chunksToUpdate.push(newChunk)
                }
            }
        }
    }
    for (let chunk of chunksToUpdate) {
        if (chunk.onlyImage) {
            world.chunksArray[chunk.x][chunk.y].updateImage()
        } else {
            world.chunksArray[chunk.x][chunk.y].update()
        }
    }
}

function destroyBlock(x, y) {
    try {
        if (world.getBlock(x, y) != "0") {
            for (let i = 0; i < 8; i++) {
                currentParticles.push(new blockParticle(world.chunksArray[Math.floor(x / 16)][Math.floor(y / 16)].blocksArray[x % 16][y % 16], { x: x + 0.5, y: y + 0.5 }, { x: Math.random() / 2 - 0.25, y: Math.random() / 2 - 0.25 }, 5))
            }
            world.chunksArray[Math.floor(x / 16)][Math.floor(y / 16)].blocksArray[x % 16][y % 16] = "0"
            world.chunksArray[Math.floor(x / 16)][Math.floor(y / 16)].update()

            if (x % 16 < options.lightingRadius) {
                world.chunksArray[Math.floor(x / 16) - 1][Math.floor(y / 16)].updateImage()
                if (y % 16 < options.lightingRadius) {
                    world.chunksArray[Math.floor(x / 16) - 1][Math.floor(y / 16) - 1].updateImage()
                }
                else if (y % 16 >= 16 - options.lightingRadius) {
                    world.chunksArray[Math.floor(x / 16) - 1][Math.floor(y / 16) + 1].updateImage()
                }
            }
            else if (x % 16 >= 16 - options.lightingRadius) {
                world.chunksArray[Math.floor(x / 16) + 1][Math.floor(y / 16)].updateImage()
                if (y % 16 < options.lightingRadius) {
                    world.chunksArray[Math.floor(x / 16) + 1][Math.floor(y / 16) - 1].updateImage()
                }
                else if (y % 16 >= 16 - options.lightingRadius) {
                    world.chunksArray[Math.floor(x / 16) + 1][Math.floor(y / 16) + 1].updateImage()
                }
            }
            if (y % 16 < options.lightingRadius) {
                world.chunksArray[Math.floor(x / 16)][Math.floor(y / 16) - 1].updateImage()
            }
            else if (y % 16 >= 16 - options.lightingRadius) {
                world.chunksArray[Math.floor(x / 16)][Math.floor(y / 16) + 1].updateImage()
            }
        }
    }
    catch {
        console.log("ИДИ НАХУЙ")
    }
}

function placeBlock(block, x, y) {
    try {
        if (world.chunksArray[Math.floor(x / 16)][Math.floor(y / 16)].blocksArray[x % 16][y % 16] == "0" || blocks.get(world.chunksArray[Math.floor(x / 16)][Math.floor(y / 16)].blocksArray[x % 16][y % 16]).replaceable == true) {
            world.chunksArray[Math.floor(x / 16)][Math.floor(y / 16)].blocksArray[x % 16][y % 16] = block
            world.chunksArray[Math.floor(x / 16)][Math.floor(y / 16)].update()
            if (x % 16 < options.lightingRadius) {
                world.chunksArray[Math.floor(x / 16) - 1][Math.floor(y / 16)].updateImage()
                if (y % 16 < options.lightingRadius) {
                    world.chunksArray[Math.floor(x / 16) - 1][Math.floor(y / 16) - 1].updateImage()
                }
                else if (y % 16 >= 16 - options.lightingRadius) {
                    world.chunksArray[Math.floor(x / 16) - 1][Math.floor(y / 16) + 1].updateImage()
                }
            }
            else if (x % 16 >= 16 - options.lightingRadius) {
                world.chunksArray[Math.floor(x / 16) + 1][Math.floor(y / 16)].updateImage()
                if (y % 16 < options.lightingRadius) {
                    world.chunksArray[Math.floor(x / 16) + 1][Math.floor(y / 16) - 1].updateImage()
                }
                else if (y % 16 >= 16 - options.lightingRadius) {
                    world.chunksArray[Math.floor(x / 16) + 1][Math.floor(y / 16) + 1].updateImage()
                }
            }
            if (y % 16 < options.lightingRadius) {
                world.chunksArray[Math.floor(x / 16)][Math.floor(y / 16) - 1].updateImage()
            }
            else if (y % 16 >= 16 - options.lightingRadius) {
                world.chunksArray[Math.floor(x / 16)][Math.floor(y / 16) + 1].updateImage()
            }
        }
    }
    catch {
        console.log("ИДИ НАХУЙ")
    }
}

function blockSelecting() {
    let blockX = Math.floor(player.position.x - (cvs.width / 2 - mouse.x) / z)
    let blockY = Math.floor(player.position.y - player.size.y / 2 - (cvs.height / 2 - mouse.y) / z)
    if (mouse.pressedButton == 0) {
        destroyBlock(blockX, blockY)
        //destroyBlocksRect(blockX - 8, blockY - 8, 16, 16)
        //destroyBlocksCircle(blockX, blockY, 8)
        //explode(blockX, blockY)
        //player.pressedButton = null
        currentEnteties.push(new zombie({ x: blockX, y: blockY }, { x: 0, y: 0 }, 100))
    }
    if (player.pressedButton == 1) {
        explode(blockX, blockY)
        player.pressedButton = null
    }
    if (mouse.pressedButton == 2) {
        placeBlock("stone", blockX, blockY)
    }
    drawImage(blockSelecion, { x: blockX - 0.125, y: blockY - 0.125 })
}



window.addEventListener("contextmenu", (e) => { e.preventDefault(); return false; })

function start() {
    perlinGeneration(1, 16, 16)
    window.requestAnimationFrame(main)
    document.getElementById("start").remove()
}
