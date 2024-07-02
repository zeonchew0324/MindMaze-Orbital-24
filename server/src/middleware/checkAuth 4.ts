import { Request, Response } from "express";
const { admin } = require('../firebase/firebase-config')

export async function decodeToken(req: Request, res: Response, next: any) { // ANY TO BE CHANGED
  const token =  req.headers.authorization?.split(' ')[1]
  
  try {
    const decodeValue = admin.auth().verifyIdToken(token)
    if (decodeValue) {
      return next()
    }
    return res.json({ message: 'Unauthorized!' })
  } catch (error) {
    return res.json({ message: 'Internal Error' })
  }
}

module.exports = { decodeToken }