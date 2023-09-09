import { Request, Response } from "express"
import  Jwt  from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();


    const validarJWT   = async (req:Request, res:Response ,next: any) =>{
        
        const token = req.header('Authorization');

        if(!token){
        return res.status(401).json({
            msg: 'No se encuentra autorizado para esta petición'
        });
       }

       try {
         
      Jwt.verify(
        token,
        process.env.SECRETORPRIVATEKEY as string,
        (error: any, decoded) => {
          if (error) {
            throw new Error("Invalid authorization token");
          }
          console.log(decoded);
          
          // const _decoded = decoded as object;
          // req.body.clientData = { ..._decoded };
          // req.body.token = token;
          return next();
        },
      );
       } catch (error) {
            console.log(error);
            res.status(401).json({
                msg: 'Token no válido'
            })
       }
       return;
    }


    export {
        validarJWT
    }