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

    module.exports = {
        validateSignupData
    };