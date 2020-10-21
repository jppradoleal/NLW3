import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup'
import crypto from 'crypto';
import mailer from '../modules/mailer';

import User from '../models/User';

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

function YupError(errorPath: string, errorMessage: string) {
  let err = new Yup.ValidationError([], errorPath, 'user');
  err.inner = [new Yup.ValidationError(errorMessage, null, errorPath)];
  return err;
}

export default {
  authenticate(req: Request, res: Response, next: NextFunction) {
    if(req.user) return YupError('Authentication', 'Already logged in')
    
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer Token...
  
    if(token) {
      const decoded = jwt.verify(token, process.env.SECRET as string) as LoggedInUser;
      req.user = {name: decoded.name, email: decoded.email}
      return next()
    } else {
      throw YupError('Authentication', 'User not authenticated');
    }
  },
  
  async login(req: Request, res: Response) {
    const userRepository = getRepository(User);
    
    const { email, password } = req.body;
    
    const user = await userRepository.findOne({email});
    
    if(!user) {
      throw YupError('Login', 'User not found');
    }
    
    const passwordMatched = await bcrypt.compare(password, user.password);
    
    if(passwordMatched) {
      const token = jwt.sign(
        { name: user.name, email: email }, 
        process.env.SECRET as string, 
        { expiresIn: 43200 });
      
      return res.status(200).json({message: 'Logged in', token: token});

    } else {
      throw YupError('Reset Password', 'Wrong password');
    }
  },

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    try {
      const userRepository = getRepository(User);

      const user = await userRepository.findOne({ email });

      if(!user) {
        throw YupError('Forgot Password', 'User not found');
      }

      const token = crypto.randomBytes(20).toString('hex');

      const now = new Date();
      now.setHours(now.getHours() + 1);

      await userRepository.update({ email }, {
        passwordResetToken: token,
        passwordResetExpires: now
      });

      mailer.sendMail({
        to: email,
        from: 'noreply@happy.com.br',
        text: 'Forgot your password? Dont worry, here is your reset token: ' + token,
      }, err => {
        if(err) return res.status(400);
      });

      return res.status(200).json({message: 'Mail sent! Check your email.'})
    } catch (err) {
      res.status(400).json({err: 'Failed, try again!'})
    }
  },

  async resetPassword(req: Request, res: Response) {
    const { email, token, password } = req.body;

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ email });

    const newPassword = await bcrypt.hash(password, 5);

    if(!user)
      throw YupError('Reset Password', 'User not found');

    if(token !== user.passwordResetToken) 
      throw YupError('Reset Password', 'Token mismatch');

    if(new Date() > user.passwordResetExpires)
      throw YupError('Reset Password', 'Token expired');

    userRepository.update({ email }, {
      passwordResetToken: '',
      passwordResetExpires: new Date(),
      password: newPassword
    })

    return res.status(200).json({message: 'Password updated'})
  }
}