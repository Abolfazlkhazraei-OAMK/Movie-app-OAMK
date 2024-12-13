-- Creating Users table.
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Creating Favourites table.
CREATE TABLE Favorites (
    favorite_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    movie_id INT REFERENCES Movies(movie_id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating Reviews table.
CREATE TABLE Reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    movie_id INT REFERENCES Movies(movie_id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating Groups table.
CREATE TABLE Groups (
    group_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    owner_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description VARCHAR(255),
    created_by INTEGER,
    CONSTRAINT fk_owner_id FOREIGN KEY (owner_id) REFERENCES Users(user_id) ON DELETE CASCADE
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

-- Add trigger on Groups table to automatically insert owner as an admin when a group is created
CREATE TRIGGER after_group_creation
AFTER INSERT ON Groups
FOR EACH ROW
EXECUTE FUNCTION add_owner_to_group_members();

-- Creating enum type for status column in GroupMembers table.
CREATE TYPE status_enum AS ENUM ('pending', 'accepted', 'rejected');

-- Creating GroupMembers table.
CREATE TABLE GroupMembers (
    group_member_id SERIAL PRIMARY KEY,
    group_id INT REFERENCES Groups(group_id) ON DELETE CASCADE,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(255),
    is_owner BOOLEAN DEFAULT FALSE,
    status status_enum DEFAULT 'pending',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Creating enum type for status column in group_requests table.
CREATE TYPE status_enum2 AS ENUM ('pending', 'approved', 'rejected');

-- Creating group_requests table.
CREATE TABLE join_requests (
    group_request_id SERIAL PRIMARY KEY,
    group_id INT REFERENCES Groups(group_id) ON DELETE CASCADE,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(255),
    status status_enum2 DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Function to add group member
CREATE OR REPLACE FUNCTION add_group_member()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'approved' THEN
        INSERT INTO GroupMembers (group_id, user_id, status)
        VALUES (NEW.group_id, NEW.user_id, 'accepted');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql

-- Trigger to call the function
CREATE TRIGGER trigger_add_group_member
AFTER UPDATE ON join_requests
FOR EACH ROW
WHEN (NEW.status = 'approved')
EXECUTE FUNCTION add_group_member(); 

-- Function to delete group member when status is set to 'accepted' or 'rejected'
CREATE OR REPLACE FUNCTION delete_on_status_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the status is set to 'approved' or 'rejected'
    IF NEW.status IN ('approved', 'rejected') THEN
        DELETE FROM join_requests WHERE group_request_id = NEW.group_request_id;
    END IF;

    RETURN NULL; -- No need to return the row since it is deleted
END;
$$ LANGUAGE plpgsql;



-- Trigger to call the function
CREATE TRIGGER trigger_delete_on_status_change
AFTER UPDATE ON join_requests
FOR EACH ROW
EXECUTE FUNCTION delete_on_status_change();
