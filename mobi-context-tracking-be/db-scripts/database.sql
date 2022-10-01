CREATE DATABASE IF NOT EXISTS mobi_tracking_db;
CREATE TABLE IF NOT EXISTS users
(
    id           int(11)      NOT NULL AUTO_INCREMENT,
    password     varchar(255) NOT NULL,
    email        varchar(100) NOT NULL,
    created_date datetime,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS routes
(
    id                  int(11)        NOT NULL AUTO_INCREMENT,
    start_location_name varchar(255),
    end_location_name   varchar(255),
    start_location_lat  DECIMAL(10, 8) NOT NULL,
    start_location_lon  DECIMAL(11, 8) NOT NULL,
    end_location_lat    DECIMAL(10, 8) NOT NULL,
    end_location_lon    DECIMAL(11, 8) NOT NULL,
    created_date        datetime,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS travel_purposes
(
    id           int(11) NOT NULL AUTO_INCREMENT,
    job          boolean,
    education    boolean,
    business     boolean,
    shopping     boolean,
    leisure      boolean,
    accompanying boolean,
    vacation     boolean,
    created_date datetime,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS weather
(
    id           int(11) NOT NULL AUTO_INCREMENT,
    sunny        boolean,
    rainy        boolean,
    hot          boolean,
    stormy       boolean,
    cold         boolean,
    cloudy       boolean,
    windy        boolean,
    snowy        boolean,
    created_date datetime,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS transport_types
(
    id             int(11)      NOT NULL AUTO_INCREMENT,
    transport_name varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS mobility_activities
(
    id                        int(11)  NOT NULL AUTO_INCREMENT,
    route_id                  int      NOT NULL,
    weather_id                int      NOT NULL,
    travel_purpose_id         INT      NOT NULL,
    transport_type_id         INT      NOT NULL,
    user_id                   INT      NOT NULL,
    start_time                DATETIME NOT NULL,
    end_time                  DATETIME NOT NULL,
    reason_for_transport_type TEXT,
    created_date              datetime,
    PRIMARY KEY (id),
    FOREIGN KEY (route_id) REFERENCES routes (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (weather_id) REFERENCES weather (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (travel_purpose_id) REFERENCES travel_purposes (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (transport_type_id) REFERENCES transport_types (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO transport_types(transport_name)
VALUES ('car'),
       ('bike'),
       ('walking'),
       ('long_distance_train'),
       ('public_transport');


-- ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
-- flush privileges;