import { Friendrequestusers } from './friendrequestusers';

export class Friendrequestmodel {

    requestid:      number;
    senderid:       number;
    geterid:        number;
    senddate:       Date;
    sendTime:       string;
    delete:         string;
    requestdetails: Friendrequestusers;
    deletedchange : boolean=false;
}
