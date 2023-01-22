import {body} from "express-validator";
import {checkDateWithToday} from "./checkToday";
import any = jasmine.any;
import {ObjectId} from "mongodb";

const regexDate = /^(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])\-(19|20)\d{2}$/
export const validBodyString = (field:string,min:number=1,max:number=30)=> body(field).isString().trim().isLength({min,max})
export const validBodyNumber = (field:string,min:number=1,max:number=100000)=> body(field).trim().isInt({min,max})
export const validBoolBody = (field:string)=> body(field).isBoolean()
export const validIdBody = (field:string)=> body(field).trim().custom((id:string)=>ObjectId.isValid(id))
export const validBodyDate = ()=> body('date').isString().trim().custom((date:string) => {
    if(regexDate.test(date)){
return checkDateWithToday(date)
    } else {


        return false
    }
});
