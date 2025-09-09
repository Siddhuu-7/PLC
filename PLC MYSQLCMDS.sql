create database PLC;
use PLC;
select * from Users;
select * from admins;
select * from attendence;
delete from admins;
delete from Users;
show tables;
drop table admin;
drop table Users;
CREATE TABLE Users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    registerNumber VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    branch VARCHAR(255) NOT NULL,
    mobileNumber bigint,
    year INT,
    userImg VARCHAR(255),
    courses JSON,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
) ENGINE=InnoDB;
CREATE TABLE Admins (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    registerNumber VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    branch VARCHAR(255) NOT NULL,
    mobileNumber bigint,
    year INT,
    userImg VARCHAR(255),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
) ENGINE=InnoDB;
drop table attendences;
select *  from attendences;
create table attendences(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
userName VARCHAR(255) NOT NULL,
 registerNumber VARCHAR(255) NOT NULL,
 year INt not null,
 classattend int,
  classHeld Int,
 createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL) ENGINE=InnoDB;
SET sql_safe_updates = 0;
