const db = require('../models');


module.exports = {
    async getAll(req, res) {
        return await db.User.findAll().then((result) => {
            res.status(200).send(result)
        }).catch((err) => {
            res.status(500).send('error server: ' + err);
        });
    },

    async create(req, res) {
        let data = {
            company_name: req.body.company_name,
            contact_firstname: req.body.contact_firstname,
            contact_lastname: req.body.contact_lastname,
            contact_email: req.body.contact_email
        }
        return await db.User.create(data).then((result) => {
            res.status(200).send(result)
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
    }


}