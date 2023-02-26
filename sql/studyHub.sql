show DATABASES;
use studyhub;
select * from users;

update users set userType = "admin" where users.id = 2;