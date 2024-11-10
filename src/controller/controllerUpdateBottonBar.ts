const { request: Req } = require('express')
const { response: Res } = require('express')
const { Datastore } = require("@google-cloud/datastore");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../.env") });

const KIND = "contact_botton_bar"
const datastore = new Datastore();

const controllerUpdateBottonBar = async (req: typeof Req, res: typeof Res) => {
    const {
        email,
        tel
    } = req.body

    try{
        const query = datastore.createQuery(KIND)
        const [entities] = await datastore.runQuery(query);
        const entityID = entities[0][datastore.KEY]['id']
        const taskKey = datastore.key([KIND, parseInt(entityID)])
        const task = {
            key: taskKey,
            data:{
                email: email,
                tel: tel
            }
        }

        await datastore.update(task)
        res.status(200).send("update sucess.") 
    }catch(err){
        console.log("error in controllerUpdateBottonBar: ", err)
        res.status(500).send(err) 
    }
    
}

export {controllerUpdateBottonBar}