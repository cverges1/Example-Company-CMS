INSERT INTO department (id, name)
VALUES (001, "Housekeeping"),
       (002, "Front Desk"),
       (003, "Room Service"),
       (004, "Security");

INSERT INTO  role (id, title, salary, department_id)
VALUES (001, "Room Attendant", 30000.00, 001),
       (002, "Room Inspector", 35000.00, 001),
       (003, "Manager of Housekeeping", 72000.00, 001),
       (004, "Front Desk Agent", 33000.00, 002),
       (005, "Overnight Front Desk Agent", 34500.00, 002),
       (006, "Manager of Operations", 72500.00, 002),
       (007, "Phone Operator", 30500.00, 003),
       (008, "Food Runner", 27500.00, 003),
       (009, "Manager of Food and Beverage", 74000.00, 003),
       (010, "Security Gaurd", 34000.00, 004),
       (011, "Overnight Security Gaurd", 35500.00, 004),
       (012, "Manager of Security", 72500.00, 004);

INSERT INTO  employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Kathe", "Fitzsimons", 003, null),
       (002, "Barbara", "Gregory", 006, null),
       (003, "Scott", "Merkin", 009, null),
       (004, "Kevin", "Monahan", 012, null),
       (005, "Chelsea", "Perety", 001, 001),
       (006, "Kyle", "Cummings", 001, 001),
       (007, "Stefan", "Klinkenberg", 001, 001),
       (008, "Joanna", "Signal", 002, 001),
       (009, "Chris", "Tribecka", 004, 002),
       (010, "Chase", "Goodmiller", 004, 002),
       (011, "Alyssa", "Sway", 005, 002),
       (012, "Trip", "Jennings", 007, 003),
       (013, "Bailey", "Brady", 007, 003),
       (014, "Gisele", "Crowley", 007, 003),
       (015, "Scott", "Jericho", 008, 003),
       (016, "Parker", "Baker", 008, 003);








