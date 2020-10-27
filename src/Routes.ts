import {Request, Response} from "express";
import {ServiceInformation, GetAaetladurFaedingardagur, GetAaetladurFaedingardagurByKennitala, GetFaedingarorlofstekjur, GetFaedingarorlofstekjurByKennitala} from "./Controller";
import {MakeHelpPage} from "./libs/InfoPage";

class Routes {

    constructor() {
    }

    public routes(app): void {
        app.route('/')
            .get((request: Request, response: Response) => {
                GetAaetladurFaedingardagur
                response.status(200)
                    .send(MakeHelpPage('Soap vefþjónustuupplýsingar', 'Sækir upplýsingar um soap þjónustu.'));
                    console.log('Root OK')
            });
        app.route('/info')
            .get(ServiceInformation);

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