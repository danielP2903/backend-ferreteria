import {  Response } from "express";

class ResponseExpress {
    successResponse(res: Response, data: any) {
        return res.status(200).json({ ...data, ok: true });
      }
    
      errorResponse(res: Response, data: Error) {
        const errorMessage: any = {
          error: data.message,
          name: data.name,
          stack: data?.stack,
          ok: false,
        };
        return res.status(400).json(errorMessage);

}

}
export default ResponseExpress;
