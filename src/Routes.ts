import {Request, Response} from "express";
import {GetAaetladurFaedingardagur, GetAaetladurFaedingardagurByKennitala, GetFaedingarorlofstekjur, GetFaedingarorlofstekjurByKennitala} from "./Controller";
import {MakePage} from "./libs/InfoPage";

class Routes {

    constructor() {
    }

    public routes(app): void {
        app.route('/')
            .get((request: Request, response: Response) => {
                
                response.status(200)
                    .send(MakePage('Vinnumálastofnun', 'Þjónusta sem gefur aðgang að upplýsingum frá soap þjónustu vinnumálastofnunar'));
                    console.log('Root OK')
            });

        app.route('/aaetladurfaedingardagur')
            .get(GetAaetladurFaedingardagur);
        app.route('/aaetladurfaedingardagur/:kennitala')
            .get(GetAaetladurFaedingardagurByKennitala);

        app.route('/faedingarorlofstekjur')
            .get(GetFaedingarorlofstekjur);
        app.route('/faedingarorlofstekjur/:kennitala')
            .get(GetFaedingarorlofstekjurByKennitala);
            
    }
}

export {Routes};