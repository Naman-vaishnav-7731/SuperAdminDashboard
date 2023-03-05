create database studyhub;
use studyhub;
select * from user;
select * from resource_permission;
select * from permission;
select * from role;
select * from rule;
select * from permission;
select * from admin;
select * from userpermission;
select * from permissionrule;
show tables;
DESC admin;
DESC images;
truncate users;
drop table role;

INSERT INTO permission (Permission_code, Permission_name) VALUES (1, 'read');
update users set userType = "admin" where users.id = 1;