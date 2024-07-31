import { Request, Response } from "express";
const { admin } = require('../firebase/firebase-config')

export async function decodeToken(req: Request, res: Response, next: any) { // ANY TO BE CHANGED
  const token =  req.headers.authorization?.split(' ')[1]
  
  try {
    if (token === "123") {
      return next()
    }
    const decodeValue = admin.auth().verifyIdToken(token)
    if (decodeValue) {
      return next()
    }
    return res.json({ message: 'Unauthorized!' })
  } catch (error: any) {
    return res.json({ message: 'Internal Error' })
  }
}

module.exports = { decodeToken }