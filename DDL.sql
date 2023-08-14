-- CS340 INTRO to DATABASE
-- Project Step 2 Draft
-- Anisa Ramirez and Steven McIntyre

-- Data Definition Queries 

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Creating tables 
-- Table 'Species' information about the different dinosaur species

CREATE TABLE Species (
    species_ID INT NOT NULL AUTO_INCREMENT,
    species_name VARCHAR(55) NOT NULL,
    period VARCHAR(55) NOT NULL,
    type VARCHAR(55) NOT NULL,
    diet VARCHAR(55) NOT NULL,
    PRIMARY KEY (species_ID),
    UNIQUE INDEX species_name_UNIQUE (species_name ASC)
);

-- Table 'Exhibits' records details of each exhibit

CREATE TABLE Exhibits(
    exhibit_ID INT AUTO_INCREMENT NOT NULL,
    exhibit_name VARCHAR(55) NOT NULL,
    has_dinosaurs BOOL,
    aquatic BOOL,
    land BOOL,
    flying BOOL,
    PRIMARY KEY (exhibit_ID),
    UNIQUE INDEX exhibit_ID_UNIQUE (exhibit_ID ASC),
    UNIQUE INDEX exhibit_name_UNIQUE (exhibit_name ASC)
);

-- Table 'Dinosaurs' list each specific individual dinosaur

CREATE TABLE Dinosaurs (
    dinosaur_ID INT AUTO_INCREMENT NOT NULL,
    species_ID INT NOT NULL,
    exhibit_ID INT NOT NULL,
    dinosaur_name VARCHAR(55) NOT NULL,
    dinosaur_birthdate DATE NOT NULL,
    PRIMARY KEY (dinosaur_ID),
    FOREIGN KEY (species_ID) REFERENCES Species(species_ID) ON DELETE
    CASCADE,
    FOREIGN KEY (exhibit_ID) REFERENCES Exhibits(exhibit_ID)
);

-- Table 'Employees' records the details of each employee and volunteer at Meso Isle (volunteers have employee_hourly of 0.00)

CREATE TABLE Employees (
    employee_ID INT AUTO_INCREMENT NOT NULL,
    employee_name VARCHAR(55) NOT NULL,
    employee_job_title VARCHAR(55) NOT NULL,
    employee_hourly FLOAT(5,2) NOT NULL,
    PRIMARY KEY (employee_ID),
    UNIQUE INDEX employee_ID_UNIQUE (employee_ID ASC)
);

-- Table 'Shifts' records the details of each work shift at Meso Isle 

CREATE TABLE Shifts (
    shift_ID INT AUTO_INCREMENT NOT NULL,
    employee_ID INT NOT NULL,
    duties VARCHAR(255) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    PRIMARY KEY (shift_ID),
    FOREIGN KEY (employee_ID) REFERENCES Employees(employee_ID) ON DELETE CASCADE, 
    UNIQUE INDEX shift_ID_UNIQUE (shift_ID ASC)
);

CREATE OR REPLACE TABLE ExhibitShifts (
    exhibit_ID INT NOT NULL,
    shift_ID INT NOT NULL,
    FOREIGN KEY (exhibit_ID) REFERENCES Exhibits(exhibit_ID) ON UPDATE CASCADE
    FOREIGN KEY (shift_ID) REFERENCES Shifts(shift_ID) ON UPDATE CASCADE
);

-- Adding data to the tables we just created 

-- Add to species 

INSERT INTO Species (species_ID, species_name, period, type, diet)
VALUES (1, 'Tyrannosaurs', 'Cretaceous', 'land', 'carnivore'),
(2, 'Sauropods', 'Jurassic','land', 'herbivore'),
(3, 'Mosasaurus', 'Cretaceous', 'aquatic', 'carnivore');

-- Add to Exhibits

INSERT INTO Exhibits (exhibit_ID, exhibit_name, has_dinosaurs, aquatic, land, flying)
VALUES (1, 'horned land creatures', TRUE, FALSE, TRUE, FALSE),
(2, 'sea creatures of the past', TRUE, TRUE, FALSE, FALSE),
(3, 'Apex Predator', TRUE, FALSE, TRUE, FALSE),
(4, 'Flying wonders', FALSE, FALSE, FALSE, TRUE);

-- Add to dinosaurs

INSERT INTO Dinosaurs (dinosaur_ID, species_ID, exhibit_ID, dinosaur_name, dinosaur_birthdate)
VALUES (1, 1, 2, 'Teddy', 20221115),
(2, 3, 3, 'Lilith', 20220917),
(3, 2, 1, 'Diablo', 20221031);


-- Add to Employees

INSERT INTO Employees (employee_ID, employee_name, employee_job_title, employee_hourly)
VALUES (1, 'Anisa Ramirez', 'Exhibit Floater', 17.00),
(2, 'Steven McIntyre', 'Exhibit Floater', 17.00),
(3, 'Danni Cabato', 'Volunteer', 0.00);

-- Add to Shifts

INSERT INTO Shifts (shift_ID, employee_ID, exhibit_ID, duties, start_time, end_time)
VALUES (1, 1, 2, 'Monitor the aquatic creatures and answer questions about Lilith if guests have any', 0800, 1300),
(2, 2, 3, 'Make sure no one gets too close to Teddy and answer questions about him if asked', 1000, 1500),
(3, 3, 4, 'Explain to guests that this exhibit is currently closed as the dinosaur is at the vet', 0900, 1200);

-- Display all tables

SHOW TABLES;

DESCRIBE Species;
DESCRIBE Dinosaurs;
DESCRIBE Exhibits;
DESCRIBE Employees;
DESCRIBE Shifts;

SELECT * FROM Species;
SELECT * FROM Dinosaurs;
SELECT * FROM Exhibits;
SELECT * FROM Employees;
SELECT * FROM Shifts;


SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
