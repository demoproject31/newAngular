import { Allpostlist } from './allpostlist';

export class Postdetails {

    postid:       number;
    message:      string;
    postdate:     Date;
    posttime:     string;
    delete:       number;
    originalname: string;
    filetype:     string;
    filesize:     number;
    filedata:     any;
    likescount : string;
    sharecount : string;
    userdetails : Allpostlist;
    

    constructor(){
        
    }


}
