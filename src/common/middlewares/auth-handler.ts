import { Request, Response } from 'express';

export const checkApiKey = async(req:Request,res:Response,next:any) =>{
    const apiKey = req.headers['api'];
    if(apiKey === '123'){
        next();
    }else{
            res.status(401).json({
            msg: 'Api key no valido'
        })
    }

}
