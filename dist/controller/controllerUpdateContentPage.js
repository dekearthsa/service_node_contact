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
const kindContentIntro = "contact_page_content";
const kindContentContact = "contact_page_contact";
const datastore = new Datastore();
const controllerUpdateContentPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titleContact, introContact, items } = req.body;
    try {
        const taskKeyIntro = datastore.key([kindContentIntro]);
        const taskKeyContact = datastore.key([kindContentContact]);
        const taskIntro = {
            key: taskKeyIntro,
            data: {
                titleContact: titleContact,
                introContact: introContact
            }
        };
        yield datastore.save(taskIntro);
        items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const taskContact = {
                key: taskKeyContact,
                data: item
            };
            yield datastore.save(taskContact);
        }));
        res.status(200).send("update sucess.");
    }
    catch (err) {
        console.log("fail to save intro!");
        res.status(500).send(err);
    }
});
exports.controllerUpdateContentPage = controllerUpdateContentPage;
