// query db using prisma client:
import { PrismaClient } from '@prisma/client';
import { User } from './userInterface';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();
import * as bcrypt from 'bcryptjs';

const getUserById = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        movies: true
      }
    });

    if (!user) {
      return { success: false, message: `No user found by id: ${userId}` };
    }

    return { success: true, data: user };
  } catch (error) {
    const err = error.msg;
    return { success: false, message: err };
  }
};

const isUserUnique = async (email) => {
  try {
    const user = await await prisma.user.findUnique({
      where: {
        email: email
      },
      include: {
        movies: true
      }
    });

    if (user) {
      return { success: true, data: false };
    }
    return { success: true, data: true };
  } catch (error) {
    const err = error.msg;
    return { success: false, message: err };
  }
};

const createUser = async (data: User) => {
  try {
    // hash password using bcrypt:

    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    const created = await prisma.user.create({ data });

    return { succcess: true, data: created };
  } catch (error) {
    const err = error.msg;
    return { success: false, message: err };
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { movies: true }
    });

    if (!user) {
      return {
        success: false,
        message: `No user found with email: ${email}`
      };
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        success: false,
        message: `Invalid username or password!`
      };
    }

    return { success: true, data: user };
  } catch (error) {
    const err = error.msg;
    return { success: false, message: err };
  }
};

export = { getUserById, createUser, isUserUnique, loginUser };
