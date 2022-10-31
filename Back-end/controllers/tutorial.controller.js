const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

//Create and Save a new Tutoral
exports.create = (req, res) => {
    //Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content tidak boleh kosong !!!"
        });
        return;
    };

    //Create a tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    //Save tutorial in database
    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial"
            });
        });
};

//Retrieve all tutorial from database
exports.findAll = (req, res) => {
    const title = req.query.title;
    const description = req.query.description;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null || description ? { description: { [Op.iLike]: `%${description}%` } } : null;
    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials"
            });
        });
};

/*
//Find By Description
exports.findAllDescription = (req, res) => {
    const description = req.query.description;
    var condition = description ? { description: { [Op.iLike]: `%${description}%` } } : null;
    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials"
            });
        });
}
*/

//Find a single tutorial from the database
exports.findOne = (req, res) => {
    const id = req.params.id;
    Tutorial.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Tidak bisa dicari tutorial dengan id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving tutorial with id=" + id
            });
        });
};

//Update a tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Tutorial.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial berhasil diupdate"
                });
            } else {
                res.send({
                    message: `Cannot update tutorial with id=${id}. Maybe tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error Updating tutorial with id=" + id
            });
        });
};

//Delete a tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Tutorial.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Berhasil Menghapus Tutorial!"
                });
            } else {
                res.send({
                    message: `Cannot delete tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete tutorial with id=" + id
            });
        });
};

//Delete all tutorials from the database
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorial were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tutorials."
            });
        });
};

//Find all published tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};