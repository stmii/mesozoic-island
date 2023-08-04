-- CS340 INTRO to DATABASE
-- Project Step 3 Draft
-- Anisa Ramirez and Steven McIntyre

-- Database manipulation queries 

-- Select to retrieve all data
SELECT * FROM Species;
SELECT * FROM Dinosaurs;
SELECT * FROM Exhibits;
SELECT * FROM Employees;
SELECT * FROM Shifts;

-- Search species
SELECT diet FROM Species
WHERE diet = :diet; 

-- Search Exhibits
SELECT exhibit_name FROM Exhibits
Where exhibit_name = :exhibit_name 

-- add a new species 
INSERT INTO Species (species_name, period, type, diet)
VALUES (:species_name_input, :period_input, :type_input, :diet_input);

-- add a new dinosaur 
INSERT INTO Dinosaurs (dinosaur_name, dinosaur_birthdate, species_ID, exhibit_ID)
VALUES (:dinosaur_name_inset, :dinosaur_birthdate_insert, :species_ID_insert, :exhibit_ID_insert);

-- add a new exhibit
INSERT INTO Exhibits (exhibit_name, has_dinosaurs, aquatic, land, flying)
VALUES (:exhibit_name_insert, :has_dinosaurs_insert, :aquatic_insert, :land_insert, :flying_insert);

-- add a new shift
INSERT INTO Shifts (employee_ID, exhibit_ID, duties, start_time, end_time)
VALUES (:employee_ID_insert, :exhibit_ID_insert, :duties_insert, :start_time_insert, :end_time_insert);

-- add a new employee
INSERT INTO Employees (employee_name, employee_job_title, employee_hourly)
VALUES (:employee_name_insert, :employee_job_title_insert, :employee_hourly);

-- update species
UPDATE Species SET species_name = :species_name_input, period = :period_input, type = :type_input, diet = :diet_input
WHERE species_ID = species_ID_from_update;

-- update exhibits
UPDATE Exhibits SET exhibit_name = :exhibit_name, has_dinosaurs = :has_dinosaurs, aquatic = :aquatic, land = :land, flying = :flying
WHERE exhibit_ID = exhibit_ID_from_update;

-- delete from dinosaur 
DELETE FROM Dinosaurs WHERE dinosaur_id = :dinosaur_ID