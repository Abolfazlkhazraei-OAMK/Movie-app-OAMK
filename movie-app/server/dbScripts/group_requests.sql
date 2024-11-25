CREATE TYPE status_enum2 AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE group_requests (
    group_request_id SERIAL PRIMARY KEY,
    group_id INT REFERENCES Groups(group_id) ON DELETE CASCADE,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    status status_enum2 DEFAULT 'pending',
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
