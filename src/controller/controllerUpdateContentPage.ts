const { request: Req } = require('express')
const { response: Res } = require('express')
const { Datastore } = require("@google-cloud/datastore");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../.env") });

const kindContentIntro = "contact_page_content"
const kindContentContact = "contact_page_contact" 
const datastore = new Datastore();

interface ArrayContact {
    image: string,
    title: string,
    description: string
}

const controllerUpdateContentPage = async (req: typeof Req, res: typeof Res) => {
    const {
        titleContact,
        introContact,
        items
    } = req.body

    try{
        const taskKeyIntro = datastore.key([kindContentIntro])
        const taskKeyContact = datastore.key([kindContentContact])
        
        const taskIntro = {
            key: taskKeyIntro,
            data:{
                titleContact: titleContact,
                introContact: introContact
            }
        }

        await datastore.save(taskIntro)

        items.map(async(item:ArrayContact) => {
            const taskContact = {
                key: taskKeyContact,
                data: item
            }
            
            await datastore.save(taskContact)

        });

        res.status(200).send("update sucess.")
    }catch(err){
        console.log("fail to save intro!")
        res.status(500).send(err)
    }
    
}

export {controllerUpdateContentPage}