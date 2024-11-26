-- Add trigger on Groups table to automatically insert owner as an admin when a group is created
CREATE TRIGGER after_group_creation
AFTER INSERT ON Groups
FOR EACH ROW
EXECUTE FUNCTION add_owner_to_group_members();

CREATE TYPE status_enum AS ENUM ('pending', 'accepted', 'rejected');

CREATE TABLE GroupMembers (
    group_member_id SERIAL PRIMARY KEY,
    group_id INT REFERENCES Groups(group_id) ON DELETE CASCADE,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    is_owner BOOLEAN DEFAULT FALSE,
    status status_enum DEFAULT 'pending',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
