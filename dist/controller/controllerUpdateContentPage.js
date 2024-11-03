"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerUpdateContentPage = void 0;
const { request: Req } = require('express');
const { response: Res } = require('express');
const { Datastore } = require("@google-cloud/datastore");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../.env") });
const KIND = "contact_page";
const datastore = new Datastore();
const STATIC_UPDATE_ID = "content_page_update";
const controllerUpdateContentPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titleContact, introContact, items } = req.body;
    try {
        const query = datastore.createQuery(KIND).filter("content_page_update", "=", STATIC_UPDATE_ID);
        const [entities] = yield datastore.runQuery(query);
        const entityID = entities[0][datastore.KEY]['id'];
        const taskKey = datastore.key([KIND, parseInt(entityID)]);
        const task = {
            key: taskKey,
            data: {
                content_page_update: STATIC_UPDATE_ID,
                titleContact: titleContact,
                introContact: introContact,
                items: JSON.stringify(items)
            }
        };
        yield datastore.update(task);
        res.status(200).send("update sucess.");
    }
    catch (err) {
        console.log("fail to save intro!");
        res.status(500).send(err);
    }
});
exports.controllerUpdateContentPage = controllerUpdateContentPage;
