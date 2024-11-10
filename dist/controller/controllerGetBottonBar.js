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
exports.controllerGetBottonBar = void 0;
const { request: Req } = require('express');
const { response: Res } = require('express');
const { Datastore } = require("@google-cloud/datastore");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../.env") });
const KIND = "contact_botton_bar";
const datastore = new Datastore();
const controllerGetBottonBar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = datastore.createQuery(KIND);
        const [entities] = yield datastore.runQuery(query);
        res.status(200).send(entities[0]);
    }
    catch (err) {
        console.log("error in controllerGetBottonBar: " + err);
        res.status(500).send(err);
    }
});
exports.controllerGetBottonBar = controllerGetBottonBar;
