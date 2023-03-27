const db = require("../models");
const user = db.user;
const role = db.role;
const Rule = db.rule;
const Permission = db.permission;
const Permission_Rule = db.Permission_Rule;
const User_Permission = db.User_Permission;


const FindUserPermission = async (user_email) => {
    console.log(user_email);
    console.log("Callling function")
    try {
        const users = await user.findAll();
        // const AllUsers = [];
        // let obj = {};
        // let User = await user.findOne({ where: { user_email:"nv@gmail.com" } });
    
        //     // Find All User Permissions Accosiated With User
        //     const userPermission = await User_Permission.findAll({
        //         where: { userUserEmail: obj.user.user_email },
        //     });
          
        //     obj.AllPermissions = [];
        //     for (let element of userPermission) {
        //         console.log(element.PermissionRuleId);
        //         const obj2 = {};
        //         const permission = await Permission_Rule.findAll({
        //             where: { id: element.PermissionRuleId },
        //         });
        
        //         // Fetch all Rules Accosicated With Permissions
        //         for(let ele of permission){
        //         obj2.rule = await Rule.findAll({where:{Rule_id:ele.RuleRuleId}});
        //         }
    
        //         // Fetch ALl Permission Accoisted with Permissions
        //         for(let ele of permission){
        //         obj2.Permissions = await Permission.findAll({where:{Permission_code:ele.PermissionPermissionCode}});
        //         }
        //     obj.AllPermissions.push(obj2);
        //   }
    
        // AllUsers.push(obj);
        return users;
        }catch(err){
            console.log(err)
        }
    
};



module.exports = FindUserPermission;