const path = require('path');
const ClassRoom = require('../models/class');

exports.goToHomePage = (req: any, res: any, next: any) => {
    console.log('HOME PAGE');
    res.render('home');
};

exports.addClass = (req: any, res: any, next: any) => {
    console.log('Add CLASS POST');
    console.log('REQ BODY', req.body)
    const name = req.body.class_name;
    const year = req.body.class_year;
    const institution = req.body.class_institution;
    
    ClassRoom.create({
        name: name,
        year: year,
        institution: institution
    })
    .then((result: any) => {
        console.log(result)
        res.redirect('/classes');
    })
    .catch((err: any) => {
        console.log(err);
        res.status(500).send(`Error while adding class ${name}.`);
    })
};

exports.goToAddClassPage = (req: any, res: any, next: any) => {
    console.log('Add class GET');
    res.render('add-class');
};

exports.goToEditClassPage = (req: any, res: any, next: any) => {
    console.log('Edit class GET');
    const classId = req.params.id;
    res.render('edit-class', {
        classId: classId
    });
};

exports.getClasses = async (req: any, res: any, next: any) => {
    console.log('GET CLASSES');
    await ClassRoom.findAll()
    .then((rows: any) => {
        res.render('classes', {
            classes: rows,
        });
    })
    .catch((err: any) => {
        console.error(err);
        res.status(500).send('Error while getting classes.');
    });
};

exports.getSelectedClass = async (req: any, res: any, next: any) => {
    console.log('GET SELECTED CLASS');
    const classId = req.params.id;
    await ClassRoom.findByPk(classId)
    .then((rows: any) => {
        res.render('selectedClass', {
            selectedClass: rows,
        });
    })
    .catch((err: any) => {
        console.error(err);
        res.status(500).send(`Error while getting class ${classId}.`);
    });
};

exports.deleteClass = async (req: any, res: any, next: any) => {
    console.log('DELETE CLASS');
    const classId = req.params.id;
    try {
        await ClassRoom.destroy({
            where: {
                id: classId
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error while deleting class ${classId} in Controller.`);
    } finally {
        res.redirect('/classes');
    }
};

exports.editClass = async (req: any, res: any, next: any) => {
    console.log('EDIT Class');
    const classId = req.params.id;
    console.log(req.body)
    const updatedName = req.body.class_name;
    const updatedYear = req.body.class_year;
    const updatedInstitution = req.body.class_institution;

    try {
        await ClassRoom.findByPk(classId)
        .then((selectedClass: any) => {
            selectedClass.name = updatedName,
            selectedClass.year = updatedYear,
            selectedClass.institution = updatedInstitution

            return selectedClass.save();
        })
        .then((result: any) => {
            console.log('UPDATED CLASS');
            res.redirect('/classes');
        })
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error while editing class ${classId} in Controller.`);
    }
};

exports.getClassStudents = async (req: any, res: any, next: any) => {
    console.log('GET SELECTED CLASS STUDENTS');
    const classId = req.params.id;
    await ClassRoom.findByPk(classId)
    .then((rows: any) => {
        res.render('selectedClass', {
            selectedClass: rows,
        });
    })
    .catch((err: any) => {
        console.error(err);
        res.status(500).send(`Error while getting class ${classId}.`);
    });
};
