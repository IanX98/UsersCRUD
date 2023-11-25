const path = require('path');
const User = require('../models/user');
const Class = require('../models/class');

exports.goToHomePage = (req: any, res: any, next: any) => {
    console.log('HOME PAGE');
    res.render('home');
};

exports.addStudent = (req: any, res: any, next: any) => {
    console.log('Add STUDENT POST');
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const age = req.body.age;
    const email = req.body.email;
    const classId = req.params.id;
    
    User.create({
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email,
        classId: classId
    })
    .then((result: any) => {
        console.log(result)
        res.redirect(`/students/${classId}`);
    })
    .catch((err: any) => {
        console.log(err);
        res.status(500).send(`Error while adding user ${firstName}.`);
    })
};

exports.goToAddStudentPage = (req: any, res: any, next: any) => {
    console.log('Add Student GET');
    const classId = req.params.id;
    res.render('add-student', {
        classId: classId
    });
};

exports.goToEditUserPage = (req: any, res: any, next: any) => {
    console.log('Edit user GET');
    const userId = req.params.id;
    res.render('edit-user', {
        userId: userId
    });
};

exports.getStudents = async (req: any, res: any, next: any) => {
    console.log('GET STUDENTS');
    const classId = req.params.id;

    try {
        const classInstance = await Class.findByPk(classId);

        const students = await User.findAll({
            where: { classId: classId },
        });
        
        res.render('students', { students, classInstance });
    } catch (err: any) {
        console.error(err);
        res.status(500).send(`Error while getting class ${classId}.`);
    }
};

exports.getSelectedUser = async (req: any, res: any, next: any) => {
    console.log('GET SELECTED USER');
    const userId = req.params.id;
    await User.findByPk(userId)
    .then((rows: any) => {
        res.render('selectedUser', {
            user: rows,
        });
    })
    .catch((err: any) => {
        console.error(err);
        res.status(500).send(`Error while getting user ${userId}.`);
    });
};

exports.deleteUser = async (req: any, res: any, next: any) => {
    console.log('DELETE USER');
    const userId = req.params.id;
    try {
        await User.destroy({
            where: {
                id: userId
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error while deleting user ${userId} in Controller.`);
    } finally {
        res.redirect('/users');
    }
};

exports.editUser = async (req: any, res: any, next: any) => {
    console.log('EDIT USER');
    const userId = req.params.id;
    const updatedFirstname = req.body.first_name;
    const updatedLastname = req.body.last_name;
    const updatedAge = req.body.age;
    const updatedEmail = req.body.email;

    try {
        await User.findByPk(userId)
        .then((user: any) => {
            console.log(user)
            user.firstName = updatedFirstname,
            user.lastName = updatedLastname,
            user.age = updatedAge,
            user.email = updatedEmail

            return user.save();
        })
        .then((result: any) => {
            console.log('UPDATED USER');
            res.redirect('/users');
        })
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error while editing user ${userId} in Controller.`);
    }
};
