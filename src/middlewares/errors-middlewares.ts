import {validationResult} from "express-validator";
import {Request, Response,NextFunction} from "express";
export const errorsValidatorMiddleware =(req:Request,res:Response,next:NextFunction) =>{
    const errors = validationResult(req).array({ onlyFirstError: true }).map((item)=>{
        return {message:"If the inputModel has incorrect values",field:item.param}
    });
    if (errors.length) {
        res.status(errors[0].field === 'id'?404:400).json({ "errorsMessages":errors });
    } else{
        next()
    }
}
///
