import * as Yup from 'yup';
import User from '../models/User';

class RecipientController {
    async index(req, res) {
        return res.json({ message: 'ok' });
    }

    async show(req, res) {
        return res.json({ message: 'ok' });
    }

    async store(req, res) {
        return res.json({ message: 'ok' });
    }

    async update(req, res) {
        return res.json({ message: 'ok' });
    }

    async delete(req, res) {
        return res.json({ message: 'ok' });
    }
}

export default new RecipientController();
