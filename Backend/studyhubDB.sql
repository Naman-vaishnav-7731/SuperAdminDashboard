create database studyhub;
use studyhub;
select * from user;
select * from resource_permission;
select * from permission;
select * from role;
select * from rule;
select * from permission;
select * from admin;
select * from User_Permission;
select * from permission_rule;
select * from user;




select * from permission_rule where id = 1;
;
show tables;
DESC admin;
DESC images;
truncate userpermission;
truncate permissionrule;
drop table role;
select * from attribute_skus;
select * from product;

INSERT INTO permission (Permission_code, Permission_name , createdAt , updatedAt) VALUES (1, 'read' , "" ,"");
update users set userType = "admin" where users.id = 2;