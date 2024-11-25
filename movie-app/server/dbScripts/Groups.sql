CREATE TABLE Groups (
    group_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    owner_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	description VARCHAR(255)
);

-- Add trigger function to automatically insert owner as a member when a group is created
CREATE OR REPLACE FUNCTION add_owner_to_group_members()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO GroupMembers (group_id, user_id, is_owner, status)
    VALUES (NEW.group_id, NEW.owner_id, TRUE, 'accepted');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;