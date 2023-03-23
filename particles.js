let particles = new Map()

async function fetchParticles() {

    let response = await fetch("particles.json")

    let particlesJSON = await response.json()

    for (let particle of particlesJSON.particles) {
        particle.img = new Image()
        particle.img.src = "textures/particles/" + particle.id + ".png"
        particles.set(particle.id, particle)
        delete particles.get(particle.id).id
    }
}
fetchParticles()

class particle {
    constructor(type, position, velocity, time) {
        this.type = type
        this.position = position
        this.velocity = velocity
        this.time = time
    }
    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.x = Math.max(Math.abs(this.velocity.x) - 0.015625, 0) * (this.velocity.x / Math.abs(this.velocity.x))
        this.velocity.y = Math.max(Math.abs(this.velocity.y) - 0.015625, 0) * (this.velocity.y / Math.abs(this.velocity.y))
        drawImage(particles.get(this.type).img, this.position)
        this.time--
    }
}

class blockParticle {
    constructor(type, position, velocity, time) {
        this.type = type
        this.position = position
        this.velocity = velocity
        this.time = time
    }
    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.x = Math.max(Math.abs(this.velocity.x) - 0.015625, 0) * (this.velocity.x / Math.abs(this.velocity.x))
        this.velocity.y = Math.max(Math.abs(this.velocity.y) - 0.015625, 0) * (this.velocity.y / Math.abs(this.velocity.y))

        drawImage(blocksParticles.get(this.type), this.position)
        this.time--
    }
}