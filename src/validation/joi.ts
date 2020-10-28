import {ObjectSchema} from 'joi'

export const validate = async (shema: ObjectSchema, payload: any)=>{
  try{
    await shema.validateAsync(payload, {abortEarly: false})
  }catch(e){
    throw new Error(e)
  }
}