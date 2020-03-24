import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
    async index(req, res) {
        const recipients = await Recipient.findAll();
        return res.json(recipients);
    }

    async show(req, res) {
        const recipient = await Recipient.findByPk(req.body.idRecipient);

        return res.json(recipient);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            rua: Yup.string().required(),
            numero: Yup.number().required(),
            complemento: Yup.string(),
            estado: Yup.string().required(),
            cidade: Yup.string().required(),
            cep: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        try {
            const {
                idRecipient,
                nome,
                rua,
                numero,
                complemento,
                estado,
                cidade,
                cep,
            } = await Recipient.create(req.json(req.body));

            return res.json({
                idRecipient,
                nome,
                rua,
                numero,
                complemento,
                estado,
                cidade,
                cep,
            });
        } catch (erro) {
            res.send({ erro: 'Ocorreu um erro inesperado!' });
        }
    }

    async update(req, res) {
        return res.json();
    }

    async delete(req, res) {
        return res.json();
    }
}

export default new RecipientController();
