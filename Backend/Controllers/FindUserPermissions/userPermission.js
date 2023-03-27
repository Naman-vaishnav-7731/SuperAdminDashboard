const asyncHandler = require("express-async-handler");
const db = require("../../models/index");
const user = db.user;
const Rule = db.rule;
const Permission = db.permission;
const Permission_Rule = db.Permission_Rule;
const User_Permission = db.User_Permission;

// @DESC - Get all Users
const getUsersPermission = asyncHandler(async (user_email) => {
 console.log("Function is called");
  try {
    //const users = await user.findAll();
    const AllUsers = [];

      let obj = {};
      obj.user = await user.findOne({ where: { user_email:user_email } });

      const userPermission = await User_Permission.findAll({
        where: { userUserEmail: obj.user.user_email },
      });

      obj.AllPermissions = [];
      for (let element of userPermission) {
        console.log(element.PermissionRuleId);
        const obj2 = {};
        const permission = await Permission_Rule.findAll({
          where: { id: element.PermissionRuleId },
        });

        // Fetch all Rules Accosicated With Permissions
        for(let ele of permission){
          obj2.rule = await Rule.findAll({where:{Rule_id:ele.RuleRuleId}});
        }

        // Fetch ALl Permission Accoisted with Permissions
        for(let ele of permission){
          obj2.Permissions = await Permission.findAll({where:{Permission_code:ele.PermissionPermissionCode}});
        }
        
        obj.AllPermissions.push(obj2);
      }
      AllUsers.push(obj);

     return AllUsers;

  } catch (error) {
    console.log(error);
  }
});

module.exports = {getUsersPermission};

console.log(getUsersPermission("pinaki@gmail.com"));

