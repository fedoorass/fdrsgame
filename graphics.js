function drawImage(img, position) {
    ctx.drawImage(img, (position.x - player.position.x + player.w / 2) * z + cvs.width / 2 - z * player.w / 2, (position.y - player.position.y + player.h / 2) * z + cvs.height / 2, img.width / 8 * z, img.height / 8 * z)
}

function drawRect(color, position, size) {
    ctx.fillStyle = color
    ctx.fillRect((position.x - player.position.x + player.w / 2) * z + cvs.width / 2 - z * player.w / 2, (position.y - player.position.y + player.h / 2) * z + cvs.height / 2, size.x / 8 * z, size.y / 8 * z)
}

