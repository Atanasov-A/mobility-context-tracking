
CREATE TABLE IF NOT EXISTS users (
  id int(11) NOT NULL AUTO_INCREMENT,
  password varchar(255) NOT NULL,
  email varchar(100) NOT NULL,
  created_date datetime,
  PRIMARY KEY (id)
);