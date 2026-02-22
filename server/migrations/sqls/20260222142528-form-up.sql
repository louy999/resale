/* Replace with your SQL commands */
CREATE TABLE forms(
     id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    request TEXT NOT NULL,
    calls VARCHAR(255) NOT NULL
);