let chat = require(`../send.js`)
module.exports = async (uhg, pmsg) => {
    let content = pmsg.content.replaceAll("/", "").trim().split(" ")
    console.log(content)
    if (!content.length || content.length !==3) return
    console.log(content)
    let x = content[0]
    let y = content[1]
    let z = content[2]
    if (!Number(x)||!Number(y)||!Number(z)) return
    console.log("Souřadnice fungují")
}
