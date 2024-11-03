const { request: Req } = require('express')
const { response: Res } = require('express')

const controllerDebug = (req: typeof Req, res: typeof Res) => {
    res.status(200).send("ok")
}

export {controllerDebug}