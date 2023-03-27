const asyncHandler = require("express-async-handler");
const db = require('../models');
const Rule = db.rule;
const Permission = db.permission;


// @DESC - Get all Rule | @Route - /rule/ | @Access - Private Only Super Admin  
const getRules = asyncHandler(async (req , res) => {
    try {
        const rules = await Rule.findAll();
        res.status(200).json(rules);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ err:error , message:"Some error occur while get the Rules"});
    }
});


//----------------------------------------Add Rules------------------------------------------------

// @DESC - Add Rule | @Route - /rule/ | @Access - Private
const addRule = asyncHandler(async (req , res) => {
    const {Rule_name} = req.body;
    console.log(Rule_name);


    // If Rule is already Exits
    const ruleExits = await Rule.findOne({where:{Rule_name:Rule_name}})
    if(ruleExits){
        return res.status(400).json({message:"oops ! Sir Rule is Already Exits"});
    }

    try {
        const rule = await Rule.create({
            Rule_name
        });

        //fetch all permissions
        const AllPermissions = await Permission.findAll();
        
        const PermissionArr = [];
        AllPermissions.map((element) => {
            PermissionArr.push(element.Permission_code);
        });

        PermissionArr.map(async (Permission_code) => {

            //Find The Permission
            const PermissionRecord = await Permission.findOne({where:{Permission_code}});
            const RuleRecord = await Rule.findOne({where:{Rule_name}});

            // Addpermission on Rules
            await PermissionRecord.addRule(RuleRecord);
        })
        
        if(rule){
            res.status(200).json({message:"Sucessfully Added rule"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Some errors is occur While adding the rule"});
    }
});

//------------------------------------------------------------------------------------------------

//@DESC - Update Rule | @Route - /rule/:ruleid | @Access - Private
const updateRule = asyncHandler(async (req , res) => {
    const {Rule_id} = req.params;
    
    //role_id is exits not in our nor
    try {
        const ruleid = await Rule.findOne({where:{Rule_id:Rule_id}});
        if(!ruleid){
             return res.status(404).json({message:"Oops ! Rule id is not found"})
        }
        if(ruleid.Rule_name == req.body.Rule_name){
            return res.status(400).json({message:`${req.body.Rule_name} is already exits`});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"oops ! some error found while finding the Rule id"});
    }

    // All updated data
    const rules = {
        Rule_id:req.body.Rule_id,
        Rule_name:req.body.Rule_name
    };

    // Update Roles
    try {
        await Rule.update(rules , {where:{Rule_id}});
        return res.status(200).json({message:"Successfully Updtaed"});
        
    } catch (error) {
        console.log(error);
        throw new Error("Some error is Found while update the Rule");
    }
});

//@DESC - Update Rule | @Route - /rule/:ruleid | @Access - Private
const deleteRule = asyncHandler(async (req , res) => {
    const {Rule_id} = req.params;
    
    //Rule id  is exits not in our not
    try {
        const ruleid = await Rule.findOne({where:{Rule_id:Rule_id}});
        if(!ruleid){
             return res.status(404).json({message:"Oops ! role id  is not found"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"oops ! some error found while finding the role id"});
        
    }

     // Delete the Role
     try {
        await Rule.destroy({where:{Rule_id}});
        return res.status(200).json({message:"Successfully Deleted"});
        
    } catch (error) {
        console.log(error);
        throw new Error("Some error is Found while Delete the Rule");
    }
})

module.exports = {getRules , addRule , updateRule , deleteRule};


