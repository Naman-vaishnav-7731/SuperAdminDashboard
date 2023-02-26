// with the help of validator implement the server side validations
const validator = require('validator');
const isEmpty = require('is-empty');

const validateRegistartion = (data) =>{
    // error object contains all errors
    const errors = {};
    data.fname = !isEmpty(data.fname) ? data.fname : "";
    data.lname = !isEmpty(data.lname) ? data.lname : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.pincode = !isEmpty(data.pincode) ? data.pincode : "";

    if(validator.isEmpty(data.fname)){
        errors.fname = "first name is required";
    }

    if(validator.isEmpty(data.lname)){
        errors.lname = "last name is required";
    }

    if(validator.isEmpty(data.email)){
        errors.email = "Email address is required";
    }else if(!validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    if(validator.isEmpty(data.password)){
        errors.password = "password is required";
    }else if(!validator.isLength(data.password , {min:6 , max:6})){
        errors.password = "Password must be 6 char";
    }

    if(validator.isEmpty(data.phone)){
        errors.phone = "phone is required";
    }else if(!validator.isMobilePhone(data.phone , ["en-IN"])){
        errors.phone = "phone number is invalid";
    }

    if(validator.isEmpty(data.address)){
        errors.adress= "phone is required";
    }

    if(validator.isEmpty(data.pincode)){
        errors.pincode = "Pincode is required";
    }else if(!validator.isPostalCode(data.pincode , ["IN"])){
        errors.pincode = "Pincode is invalid";
    }
  
    return{
        errors,
        isValid:isEmpty(errors)
    }
}

module.exports = validateRegistartion;