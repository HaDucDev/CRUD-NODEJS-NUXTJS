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
    },

    update(req, res) {
        const id = req.params.id;
        return db.User.update(req.body, { where: { id: id } }).then((result) => {
            console.log(result)
            if (result == 1) {
                res.send({
                    message: "updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
                });
            }
        }).catch((err) => {
            res.status(500).send({
                message: "Error updating with id=" + id
            });
        });
    },

    delete(req, res) {
        const id = req.body.id;
        console.log(id)
        return db.User.destroy({ where: { id: id } }).then((result) => {
            if (result == 1) {
                res.send({
                    message: " deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete with id=${id}. Maybe users was not found!`
                });
            }
        }).catch((err) => {
            res.status(500).send({
                message: "Could not delete  with id=" + id + " error: " + err
            });
        });
    },


}