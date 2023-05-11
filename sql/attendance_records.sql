CREATE TABLE attendance_records (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    check_in_time TIMESTAMP NOT NULL,
    check_out_time TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
