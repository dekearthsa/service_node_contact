const { request: Req } = require('express')
const { response: Res } = require('express')
const { Datastore } = require("@google-cloud/datastore");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../.env") });

const KIND = "contact_page"
const datastore = new Datastore();
const STATIC_UPDATE_ID = "content_page_update"
const controllerUpdateContentPage = async (req: typeof Req, res: typeof Res) => {
    const {
        titleContact,
        introContact,
        items
    } = req.body

    try{
        const query = datastore.createQuery(KIND).filter("content_page_update", "=", STATIC_UPDATE_ID);
        const [entities] = await datastore.runQuery(query);
        const entityID = entities[0][datastore.KEY]['id']
        const taskKey = datastore.key([KIND, parseInt(entityID)])
        const task = {
            key: taskKey,
            data:{
                content_page_update: STATIC_UPDATE_ID,
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