const validator =  require('validator');

const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password,} = req.body;
    if(!firstName || !lastName ){
        throw new Error("First name and last name are required.");
    }else if(!emailId || !validator.isEmail(emailId)){
        throw new Error("A valid email address is required.");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter strong password.");
    }
    }

const validateEditProfileData = (req) => {
    const allowedFields = ['firstName', 'lastName', 'emailId', 'age', 'skills'];

    const isEditAllowed = Object.keys(req.body).every(field => allowedFields.includes(field));
    
    return isEditAllowed ;
}
    module.exports = {
        validateSignupData,
        validateEditProfileData
    };