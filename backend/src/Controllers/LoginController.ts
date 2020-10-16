import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import User from '../models/User';
import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup'

interface LoggedInUser {
  name:string;
  email: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user: {
      name:string;
      email: string;
    }
  }
}



export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer Token...

  console.log(token);

  if(token) {
    const decoded = jwt.verify(token, process.env.SECRET as string) as LoggedInUser;
    req.user = {name: decoded.name, email: decoded.email}
    return next()
  } else {
    let err = new Yup.ValidationError([], "Authentication", "user");
            err.inner = [new Yup.ValidationError("User not authenticated", null, "user")];
            throw err;
  }
}

export async function login(req: Request, res: Response) {
  const userRepository = getRepository(User);

  const { email, password } = req.body;

  const user = await userRepository.findOne({email});

  if(!user) {
    let err = new Yup.ValidationError([], "User login", "user");
            err.inner = [new Yup.ValidationError("Login error", null, "email")];
            throw err;
  }

  const passwordMatched = await bcrypt.compare(password, user.password);

  if(passwordMatched) {
      const token = jwt.sign(
                      { name: user.name, email: email }, 
                      process.env.SECRET as string, 
                      { expiresIn: 43200 });
      
      return res.status(200).json({message: "Logged in", token: token});
  } else {
    let err = new Yup.ValidationError([], "User login", "user");
            err.inner = [new Yup.ValidationError("Wrong Password", null, "password")];
            throw err;
  }

}