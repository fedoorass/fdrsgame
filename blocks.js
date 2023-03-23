let blocks = new Map()
let blocksParticles = new Map()

async function fetchBlocks() {

    let response = await fetch("blocks.json")

    let blocksJSON = await response.json()

    for (let block of blocksJSON.blocks) {
        if (block.textureType == "simple") {
            block.texture = { middle: new Image() }
            block.texture.middle.src = "textures/blocks/" + block.id + ".png"
        } else {
            block.texture = {
                single: new Image(),
                middle: new Image(),
                left: new Image(),
                right: new Image(),
                top: new Image(),
                bottom: new Image(),
                leftRight: new Image(),
                leftRightBottom: new Image(),
                leftRightTop: new Image(),
                topBottom: new Image(),
                topBottomLeft: new Image(),
                topBottomRight: new Image(),
                leftTopCorner: new Image(),
                rightTopCorner: new Image(),
                leftBottomCorner: new Image(),
                rightBottomCorner: new Image()
            }
            block.texture.single.src = "textures/blocks/" + block.id + "/single.png"
            block.texture.middle.src = "textures/blocks/" + block.id + "/middle.png"
            block.texture.left.src = "textures/blocks/" + block.id + "/left.png"
            block.texture.right.src = "textures/blocks/" + block.id + "/right.png"
            block.texture.top.src = "textures/blocks/" + block.id + "/top.png"
            block.texture.bottom.src = "textures/blocks/" + block.id + "/bottom.png"
            block.texture.leftRight.src = "textures/blocks/" + block.id + "/leftRight.png"
            block.texture.leftRightTop.src = "textures/blocks/" + block.id + "/leftRightTop.png"
            block.texture.leftRightBottom.src = "textures/blocks/" + block.id + "/leftRightBottom.png"
            block.texture.topBottom.src = "textures/blocks/" + block.id + "/topBottom.png"
            block.texture.topBottomLeft.src = "textures/blocks/" + block.id + "/topBottomLeft.png"
            block.texture.topBottomRight.src = "textures/blocks/" + block.id + "/topBottomRight.png"
            block.texture.leftTopCorner.src = "textures/blocks/" + block.id + "/leftTopCorner.png"
            block.texture.rightTopCorner.src = "textures/blocks/" + block.id + "/rightTopCorner.png"
            block.texture.leftBottomCorner.src = "textures/blocks/" + block.id + "/leftBottomCorner.png"
            block.texture.rightBottomCorner.src = "textures/blocks/" + block.id + "/rightBottomCorner.png"
        }
        block.replaceable = block.replaceable == "true"
        blocks.set(block.id, block)
        delete blocks.get(block.id).id
    }


    //Партиклы блоков
    for (let block of blocks.keys()) {
        let tempCVS = document.createElement("canvas")
        let tempCTX = tempCVS.getContext("2d")
        tempCVS.width = 2
        tempCVS.height = 2
        blocks.get(block).texture.middle.onload = () => {
            tempCTX.drawImage(blocks.get(block).texture.middle, -3, -3)
            blocksParticles.set(block, new Image())
            blocksParticles.get(block).src = tempCVS.toDataURL()
            tempCVS.remove()
        }
    }
}
fetchBlocks()

console.log(blocks)
console.log(blocksParticles)



let blockSelecion = new Image()
blockSelecion.src = "textures/blockSelection.png"

function drawBlockSelection(position) {
    if (position != false) {
        drawImage(blockSelecion, { x: position.x - 0.125, y: position.y - 0.125 })
    }
}