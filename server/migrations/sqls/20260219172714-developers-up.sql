CREATE TABLE developers(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(250) UNIQUE NOT NULL,
    photo TEXT NOT NULL,
    location TEXT [] NOT NULL,
    active boolean NOT NULL,
    description Text NOT NULL
);