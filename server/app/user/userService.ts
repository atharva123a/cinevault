import { Request, Response } from 'express';
import createAPIError from '../utils/error';
import { StatusCodes } from 'http-status-codes';

import User from './userSchema';
import { createTokenUser } from '../utils/createTokenUser';
import { getTokens } from '../utils/jwt';

const getUser = async (req: any, res: Response) => {
  try {
    let userId = parseInt(req.user.id);

    const resp = await User.getUserById(userId);

    if (resp.success == false) {
      return createAPIError(StatusCodes.NOT_FOUND, resp.message, res);
    }

    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: resp.data });
  } catch (error) {
    let message = error.msg || 'Something went wrong!';
    createAPIError(StatusCodes.INTERNAL_SERVER_ERROR, message, res);
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return createAPIError(
        StatusCodes.BAD_REQUEST,
        'Please provide email!',
        res
      );
    }

    if (!password) {
      return createAPIError(
        StatusCodes.BAD_REQUEST,
        'Please provide password!',
        res
      );
    }

    const resp = await User.isUserUnique(email);
    if (resp.success && resp.data == false) {
      return createAPIError(
        StatusCodes.BAD_REQUEST,
        `User with email: ${email} already exists!`,
        res
      );
    }

    const user = await User.createUser({ email, password });

    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: 'User registered successfully!' });
  } catch (error) {
    let message = error.msg || 'Something went wrong!';
    createAPIError(StatusCodes.INTERNAL_SERVER_ERROR, message, res);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return createAPIError(
        StatusCodes.BAD_REQUEST,
        `Please provide email!`,
        res
      );
    }

    if (!password) {
      return createAPIError(
        StatusCodes.BAD_REQUEST,
        `Please provide password`,
        res
      );
    }

    const resp = await User.loginUser({ email, password });

    if (!resp.success) {
      return createAPIError(StatusCodes.NOT_FOUND, resp.message, res);
    }

    const user = resp.data;

    const tokenUser = createTokenUser(user);

    const tokens = getTokens(tokenUser);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Login successful!',
      data: tokens
    });
  } catch (error) {
    console.log(error, 'error');
    let message = error.msg || 'Something went wrong!';
    createAPIError(StatusCodes.INTERNAL_SERVER_ERROR, message, res);
  }
};

export = { getUser, login, register };
