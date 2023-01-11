import { NextFunction, Response } from "express";
import { ObjectSchema } from "joi";

function validatorHandler(schema:ObjectSchema,property:any){

    return(req:Request,res:Response,next:NextFunction) => {
        const data  = req.body;
        console.log(res);
        console.log(property);
        
        
        const {error} = schema.validate(data);

        if(error){
            next();
            console.log("usp");
            
        }
        next();
    }
}

export default validatorHandler