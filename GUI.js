function drawGUI() {
    drawHealthBar()
}
function drawHealthBar() {
    ctx.fillStyle = "grey"
    ctx.fillRect(cvs.width - 260, 40, 220, 40)
    ctx.fillStyle = "red"
    ctx.fillRect(cvs.width - 250, 50, Math.max(player.health * 2, 0), 20)
}