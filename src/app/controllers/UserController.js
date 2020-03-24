import * as Yup from 'yup';
import User from '../models/User';
import Session from './SessionController';

class UserController {
    async index(req, res) {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email'],
        });

        return res.json(users);
    }

    async show(req, res) {
        const user = await User.findByPk(req.params.id, {
            attributes: ['id', 'name', 'email'],
        });

        return res.json(user);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'Validation fails',
            });
        }

        const userExists = await User.findOne({
            where: { email: req.body.email },
        });
        if (userExists)
            return res.status(400).json({ error: 'User already exists' });

        const { id, name, email, provider } = await User.create(req.body);

        return res.json({
            id,
            name,
            email,
        });
    }

    async update(req, res) {
        const idUserCurrent = await Session.getUserCurrent();
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation fails' });

        const user = await User.findByPk(idUserCurrent);

        console.log(user);

        const { email } = req.body;
        if (email !== user.email) {
            const userExists = await User.findOne({ where: { email } });
            const { id } = userExists;
            console.log(id);
            if (userExists)
                return res.status(400).json({ error: 'User already exists' });
        }

        const { oldPassword } = req.body;
        if (oldPassword && !(await user.checkPassword(oldPassword)))
            return res.status(401).json({ error: 'Password does not match' });

        const { id, name, provider } = await user.update(req.body);

        return res.json({
            id,
            name,
            email,
            provider,
        });
    }
}

export default new UserController();
