import { Request, Response } from 'express';
import * as Yup from 'yup';
import { hash, compare } from 'bcryptjs';
import db from '../database/connection';

export default class UserController {
  async index(request: Request, response: Response) {
    const totalUsers = await db('users').count('* as total');

    const { total } = totalUsers[0];

    return response.json({ total });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      email,
      password,
      is_teacher,
    } = request.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      whatsapp: Yup.string().required().max(11),
      avatar: Yup.string().required(),
      bio: Yup.string().required(),
      password: Yup.string().required(),
      password_confirmation: Yup.string().when(
        'password',
        (password_confirmation: string, field: any) =>
          password_confirmation
            ? field.required().oneOf([Yup.ref('password')])
            : field,
      ),
      is_teacher: Yup.boolean().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const checkUser = await db('users').where('email', email).first();

    if (checkUser) {
      return response.status(400).json({ error: 'This email already exists' });
    }

    try {
      const hashPassword = await hash(password, 8);
      const userId = await db
        .insert(
          {
            name,
            avatar,
            whatsapp,
            bio,
            email,
            password: hashPassword,
            is_teacher,
          },
          ['id'],
        )
        .into('users');

      const user = await db('users').where('id', userId[0].id).first();

      delete user.id;

      return response.json(user);
    } catch (err) {
      console.log(err);
    }
  }

  async update(request: Request, response: Response) {
    const { name, avatar, whatsapp, bio, email, is_teacher } = request.body;

    let { password } = request.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      whatsapp: Yup.string().required().max(11),
      avatar: Yup.string().required(),
      bio: Yup.string().required(),
      is_teacher: Yup.boolean().required(),
      password: Yup.string().min(3),
      password_confirmation: Yup.string().when(
        'password',
        (password_confirmation: string, field: any) =>
          password_confirmation
            ? field.required().oneOf([Yup.ref('password')])
            : field,
      ),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const user_id = request.user.id;

    const user = await db('users').where('id', user_id).first();

    // verificando se já existe outro usuário com o email
    if (email !== user.email) {
      const checkUser = await db('users').where('email', email).first();

      if (checkUser) {
        return response
          .status(400)
          .json({ error: 'This email already exists' });
      }
    }

    // criptografando senha
    if (password) {
      password = await hash(password, 8);
    }

    const data = {
      name,
      avatar,
      whatsapp,
      bio,
      email,
      password,
      is_teacher,
    };

    await db('users').where({ id: user_id }).update(data);

    const res = await db.select('*').from('users').where('id', user_id).first();

    delete res.password;

    return response.json(res);
  }
}
