// with the help of validator implement the server side validations
const validator = require('validator');
const isEmpty = require('is-empty');

const validateAdminlogin = (data) =>{
    // error object contains all errors
    const errors = {};
 
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
   
    if(validator.isEmpty(data.admin_email)){
        errors.email = "Email address is required";
    }else if(!validator.isEmail(data.admin_email)){
        errors.email = "Email is invalid";
    }

    if(validator.isEmpty(data.password)){
        errors.password = "password is required";
    }else if(!validator.isLength(data.password , {min:6 , max:6})){
        errors.password = "Password must be 6 char";
    }

    return{
        errors,
        isValid:isEmpty(errors)
    }
}
module.exports = validateAdminlogin;