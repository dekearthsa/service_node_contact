const { request: Req } = require('express')
const { response: Res } = require('express')
const { Datastore } = require("@google-cloud/datastore");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../.env") });

const KIND = "contact_botton_bar"
const datastore = new Datastore();

const controllerGetBottonBar = async (req: typeof Req, res: typeof Res) => {
    try{
        const query = datastore.createQuery(KIND)
        const [entities] = await datastore.runQuery(query);
        res.status(200).send(entities[0]) 
    }catch(err){
        console.log("error in controllerGetBottonBar: "+err);
        res.status(500).send(err)
    }

}

export {controllerGetBottonBar}