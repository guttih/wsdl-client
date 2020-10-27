import {Request, Response} from "express";
import * as soap from "soap";
import { MakePage } from "./libs/InfoPage";
const YAML = require('json-to-pretty-yaml');
//import { Request } from "soap/lib/http";

//const url = 'http://localhost:62991/Service.svc?wsdl';
const url = 'http://www2.ksi.is/vefthjonustur/mot.asmx?WSDL';

/**
 * Loads list of einstaklingar
 * Additional query strings are from and to 
 * the timestamp format is 'yyyy-mm-dd hh:mm:ss'
 */
export const GetAaetladurFaedingardagur = async (request:Request, response:Response) => {
    soap.createClient(url, function(err, client) {
        var args = {from: request.query.from, to: request.query.to};
        client.GetAaetladurFaedingardagur(args, function(err, result) {
            if(result  && result.GetAaetladurFaedingardagurResult){
                response.send(result.GetAaetladurFaedingardagurResult.AaetladurFaedingardagur);
            }
            else{
                response.send();
            }
        });
    });
}

export const GetAaetladurFaedingardagurByKennitala = async (request:Request, response:Response) => {

    soap.createClient(url, function(err, client) {
        var args = {kennitala: request.params.kennitala};
        client.GetAaetladurFaedingardagurByKennitala(args, function(err, result) {
            if(result){
                response.send(result.GetAaetladurFaedingardagurByKennitalaResult);
            }
            else {
                response.send();
            }
        });
    });
}

export const GetFaedingarorlofstekjur = async (request:Request, response:Response) => {
    soap.createClient(url, function(err, client) {
        client.GetFaedingarorlofstekjur({}, function(err, result) {
            if(response && result.GetFaedingarorlofstekjurResult){
                response.send(result.GetFaedingarorlofstekjurResult.Faedingarorlofstekjur);
            }
            else{
                response.send();
            }
        });
    });
}

export const GetFaedingarorlofstekjurByKennitala = async (request:Request, response:Response) => {

    soap.createClient(url, function(err, client) {
        var args = {kennitala: request.params.kennitala};
        client.GetFaedingarorlofstekjurByKennitala(args, function(err, result) {
            if(result){
                response.send(result.GetFaedingarorlofstekjurByKennitalaResult);
            }
            else{
                response.send();
            }
        });
    });
}
function removeSurroundingQuotes(a:String):string {
    if (a.length < 2 || a === null || a === undefined) {
        return String(a);
    }
    
    const firstChar = a[0];
    const lastChar = a.slice(-1);
    if (firstChar === lastChar) {
        return a.slice(1, -1);
    }

    return String(a);
}


const makeDebugHelpPage = (wsdl?:String):string =>{
    const help:string = `
            <div><p>
            Example: http://localhost:8000/debug?wsdl="http://www2.ksi.is/vefthjonustur/mot.asmx?WSDL"
            </p>
            </div>
            `;
    const rootStr = wsdl? ` at \"${wsdl}\"`:"";
            return MakePage("Client", 
                            "Error", 
                            `<p>Could not access service${rootStr}. </p>
                            ${rootStr}
                             ${help}`);
}
export const ServiceInformation = async (request:Request, response:Response) => {
    if (request.query.wsdl === undefined) {
        return response.status(400).send(makeDebugHelpPage());
    }
    let wsdl:string = String(request.query.wsdl);
    wsdl = removeSurroundingQuotes(wsdl);
    soap.createClient(wsdl, function(err, client) {
        if (err || client === undefined) {
            const help:string = `
            <div><p>
            Example: http://localhost:8000/info?wsdl="http://www2.ksi.is/vefthjonustur/mot.asmx?WSDL"
            </p>
            </div>
            `;
            response.status(400).send(MakePage(
                "Client", 
                "Error", 
                `<p>Could not access service at "${wsdl}".</p>${help}`));
            return;
        }
        const body = YAML.stringify(client.describe());
        response.send(MakePage("Client", `Web-Service:"${wsdl}"`, `<pre>${body}</pre>`));
    });
}