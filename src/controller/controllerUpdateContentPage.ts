const { request: Req } = require('express')
const { response: Res } = require('express')
const { Datastore } = require("@google-cloud/datastore");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../.env") });

const KIND = "contact_page"
const datastore = new Datastore();

const controllerUpdateContentPage = async (req: typeof Req, res: typeof Res) => {
    const {
        titleContact,
        introContact,
        items
    } = req.body

    try{
        const query = datastore.createQuery(KIND)
        const [entities] = await datastore.runQuery(query);
        const keys = entities.map((entity:any) => entity[datastore.KEY]);
        const taskKey = datastore.key(keys[0])
        const task = {
            key: taskKey,
            data:{
                titleContact: titleContact,
                introContact: introContact,
                items: JSON.stringify(items)
            }
        }

        await datastore.update(task)


        res.status(200).send("update sucess.")
    }catch(err){
        console.log("fail to save intro!")
        res.status(500).send(err)
    }
    
}

export {controllerUpdateContentPage}