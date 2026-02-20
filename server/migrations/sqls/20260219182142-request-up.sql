/* Replace with your SQL commands */
CREATE TABLE requests(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id TEXT,
    request TEXT
);