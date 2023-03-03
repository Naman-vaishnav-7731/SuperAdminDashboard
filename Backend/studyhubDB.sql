create database studyhub;
use studyhub;
select * from users;
select * from resource_permission;
select * from permission;
select * from resource;
show tables;
DESC admin;
DESC images;
truncate users;
drop table images;

update users set userType = "admin" where users.id = 1;