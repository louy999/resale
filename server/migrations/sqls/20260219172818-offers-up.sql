/* Replace with your SQL commands */
CREATE TABLE offers(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    photos TEXT[] NOT NULL,
    title Text,
    sale_status VARCHAR(250) NOT NULL,
    price VARCHAR(250) NOT NULL,
    developer_id uuid REFERENCES developers(id),
    type VARCHAR(250) NOT NULL,
    areas VARCHAR(250) NOT NULL,
    bed VARCHAR(250),
    bath VARCHAR(250),
    delivery_date VARCHAR(250),
    finished VARCHAR(250),
    location VARCHAR(250) NOT NULL,
    down_payment VARCHAR(250) NOT NULL,
    installment VARCHAR(250) NOT NULL,
    description Text NOT NULL,
    active BOOLEAN NOT NULL,
    category VARCHAR(250) NOT NULL
);