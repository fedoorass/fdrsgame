class zombie {
    constructor(position, velocity, health) {
        this.position = position
        this.velocity = velocity
        this.health = health
        this.size = { x: 1.25, y: 2.5 }
        this.isOnGround = false
        this.inFrontOfTheBlock = false
        this.health = 100
    }
    move(x, y) {
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

        this.inFrontOfTheBlock = false
        this.isOnGround = false
        for (let rect of rects) {
            if (this.position.x + this.size.x / 2 + minX > rect.x && this.position.x - this.size.x / 2 + minX < rect.x + rect.w && this.position.y > rect.y && this.position.y - this.size.y < rect.y + rect.h) {
                if (minX > 0) {
                    minX = Math.min(minX, rect.x - this.position.x - this.size.x / 2)
                } else if (minX < 0) {
                    minX = Math.max(minX, rect.x + rect.w - this.position.x + this.size.x / 2)
                }
                this.velocity.x = 0
                this.inFrontOfTheBlock = true
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
    }

    walk() {
        if (this.position.x > player.position.x) {
            this.velocity.x = Math.max(this.velocity.x - 0.03125, -0.15)
        }
        else {
            this.velocity.x = Math.min(this.velocity.x + 0.03125, 0.15)
        }
        if (this.isOnGround && this.inFrontOfTheBlock) {
            this.velocity.y -= 0.5
        }
        this.velocity.y = Math.min(this.velocity.y + 0.03125, 2)
    }

    update() {
        this.move(this.velocity.x, this.velocity.y)
        this.walk()
        drawRect("green", { x: this.position.x - this.size.x / 2, y: this.position.y - this.size.y }, { x: this.size.x * 8, y: this.size.y * 8 })
        if (this.position.x + this.size.x / 2 > player.position.x - player.size.x / 2 && this.position.x - this.size.x / 2 < player.position.x + player.size.x / 2 &&
            this.position.y > player.position.y - player.size.y && this.position.y - this.size.y < player.position.y) {
            explode(Math.round(this.position.x), Math.round(this.position.y))
            this.health = 0
        }
    }
}