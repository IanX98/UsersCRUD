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
        res.status(500).send(`Error while adding student ${firstName}.`);
    })
};

exports.goToAddStudentPage = (req: any, res: any, next: any) => {
    console.log('Add Student GET');
    const classId = req.params.id;
    res.render('add-student', {
        classId: classId
    });
};

exports.goToEditStudentPage = (req: any, res: any, next: any) => {
    console.log('Edit student GET');
    const studentId = req.params.id;
    const classId = req.params.classId;

    res.render('edit-student', {
        studentId: studentId,
        classId: classId
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

exports.getSelectedStudent = async (req: any, res: any, next: any) => {
    console.log('GET SELECTED STUDENT');
    const studentId = req.params.id;
    const classId = req.params.classId;

    await User.findByPk(studentId)
    .then((rows: any) => {
        res.render('selectedStudent', {
            student: rows,
            classId: classId
        });
    })
    .catch((err: any) => {
        console.error(err);
        res.status(500).send(`Error while getting student ${studentId}.`);
    });
};

exports.deleteStudent = async (req: any, res: any, next: any) => {
    console.log('DELETE STUDENT');
    const studentId = req.params.id;
    const classId = req.params.classId;
    console.log(classId)

    try {
        await User.destroy({
            where: {
                id: studentId
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error while deleting user ${studentId} in Controller.`);
    } finally {
        res.redirect(`/students/${classId}`);
    }
};

exports.editStudent = async (req: any, res: any, next: any) => {
    console.log('EDIT STUDENT');
    const studentId = req.params.id;
    const classId = req.params.classId;

    const updatedFirstname = req.body.first_name;
    const updatedLastname = req.body.last_name;
    const updatedAge = req.body.age;
    const updatedEmail = req.body.email;

    try {
        await User.findByPk(studentId)
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
            res.redirect(`/student/${classId}/${studentId}`);
        })
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error while editing student ${studentId} in Controller.`);
    }
};
