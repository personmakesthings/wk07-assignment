-- The names of the tables have `wk07_` because I'm using one database for several projects, due to Supabase free account limitations.
-- It's just so I know that these tables are for my wk07-assignment at a glance

-- DROP TABLES TO REFRESH EVERYTHING, FOR DEVELOPMENT PURPOSES
DROP TABLE IF EXISTS wk07_submissions_species;
DROP TABLE IF EXISTS wk07_submissions;
DROP TABLE IF EXISTS wk07_species;


-- SPECIES TABLE ("categories")
CREATE TABLE IF NOT EXISTS wk07_species (
    id SERIAL PRIMARY KEY,
    species VARCHAR(25) NOT NULL
);


-- SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS wk07_submissions (
    id SERIAL PRIMARY KEY,
    submission_date VARCHAR(50) NOT NULL,
    username VARCHAR(25) NOT NULL,
    location VARCHAR(25) NOT NULL,
    hamster_name VARCHAR(25) NOT NULL,
    hamster_story VARCHAR(500) NOT NULL,
    img_url VARCHAR(500) NOT NULL,
    species INT NOT NULL,
    FOREIGN KEY (species) REFERENCES wk07_species (id),
    likes INT
);


-- JUNCTION TABLE
CREATE TABLE IF NOT EXISTS wk07_submissions_species (
    submission_id INT NOT NULL,
    species_id INT NOT NULL,
    FOREIGN KEY (submission_id) REFERENCES wk07_submissions (id) ON DELETE CASCADE, -- ON DELETE CASCADE will delete an entry in this table if a linked entry is deleted in wk07_submissions
    FOREIGN KEY (species_id) REFERENCES wk07_species (id)
);


-- SEED SPECIES TABLE
INSERT INTO wk07_species (id, species) VALUES
('1', 'Syrian'),
('2', 'Hybrid Dwarf'),
('3', 'Roborovski Dwarf'),
('4', 'Chinese'),
('5', 'European');


-- SEED SUBMISSIONS TABLE
INSERT INTO wk07_submissions (submission_date, username, location, hamster_name, hamster_story, img_url, species, likes) VALUES
('2024-01-01', 'hamster lover', 'york', 'cutie', 'where can I get a cute hamster like the one in this pic without mum and dad knwoing?', 'https://www.reptilecymru.co.uk/wp-content/uploads/2021/03/Syrian-Hamster-.png', 1, 0),
('2024-01-01', 'Jane Doe', 'Leeds', 'Snowflake', 'my little snowflake is just the cutest!!!', 'https://www.animalfunfacts.net/images/stories/pets/hamster/djungarian_dwarf_hamster_l.jpg', 2, 0),
('2024-01-01', 'CHOCO IS DA BEST', 'Liverpool', 'Choco', 'Chinese hamsters never get enough love. So give it up for my lil guy Choco!', 'https://www.editedbyamey.com/wp-content/uploads/2013/09/IMG_5017-1024x683.jpg', 4, 0),
('2024-01-01', 'Hamster Survivor', 'South England', 'Attack Eyebrows', 'Do not get on the wrong side of Attack Eyebrows. You have been warned.', 'https://crittery.co.uk/images/gen/species-list/robo-hamster.jpg', 3, 0),
('2024-01-01', 'Anonymous', 'Vienna, Austria', 'Call him Big Chungus', 'I saw these wild, black-bellied hamsters on a recent trip to Vienna. They were massive! Nothing like the small little pets I had as a kid.', 'https://d1jyxxz9imt9yb.cloudfront.net/medialib/4122/image/s768x1300/AdobeStock_347974747_438127_reduced.jpg', 5, 5),
('2024-01-01', 'John Smith', 'London', 'Peanuts', 'My hamster is the greediest gremlin alive! He is plotting against us, and planning to steal, pouch, and store away all the food in the house. Before long, us hoomans will be left with nothing, and with no choice but to starve! Peanuts has me fearing for my life, and the lives of my family. Please, anyone who happens to read this post, send help. Save us from this diabolical rodent.', 'https://www.thesprucepets.com/thmb/93KCeFOyy9MViphsujDftH6MMdc=/4089x0/filters:no_upscale():strip_icc()/close-up-of-a-hamster-eating-groundnut-635096689-5c525f88c9e77c0001d7c1fa.jpg', 1, 0),
('2024-01-01', 'Anonymous', 'Vienna, Austria', 'Chungus', 'So I found out that those big hamsters I saw in Vienna were European hamsters, which is super cool. I never really thought about wild hamsters until I saw them actually out in the wild. Unfortunately though it seems they are an endangered species, which is really sad. Man, if only we could domesticate them, I would have one as a pet in a heartbeat. Best keep them to the conservationists to look after, I guess.', 'https://rewilding-danube-delta.com/wp-content/uploads/sites/4/2022/10/Hamsters-in-Kyiv-Zoo2-1024x683.jpg', 5, 0),
('2024-01-01', 'joshua', 'hull', 'marshmallow', 'no text', 'https://qph.cf2.quoracdn.net/main-qimg-b251e71f32765a395a48178b27f895fb-lq', 2, 0),
('2024-01-01', 'Hamster Owner', 'Glasgow', 'Goofball', 'She is so goofy and sweet.', 'https://static.wixstatic.com/media/55ba84_306fe993c7ed4d37ab7945b93c762c1e~mv2.png', 1, 0),
('2024-01-01', 'Sarah', 'Bristol', 'Billy', 'This is Billy. He is silly.', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRFrqQeVnz0HTiZhtnqHR3pHVPyLBLOa_mAIW6CnrZAX1yI4MUZ', 2, 0);


-- SEED SUBMISSIONS_SPECIES TABLE
INSERT INTO wk07_submissions_species (submission_id, species_id) VALUES
(1, 1),
(2, 2),
(3, 4),
(4, 3),
(5, 5),
(6, 1),
(7, 5),
(8, 2),
(9, 1),
(10, 2);





-- FUNCTION TO UPDATE WK07_SUBMISSIONS_SPECIES TABLE ALONG WITH WK07_SUBMISSIONS
-- i.e. when the form is updated on the website
-- `OR REPLACE` is required because I'm re-runinng this code several times while debugging.
CREATE OR REPLACE FUNCTION update_wk07_submissions_species()
-- RETURNS TRIGGER is meant to make the function 'trigger' when a specific event occurs
RETURNS TRIGGER AS $$
BEGIN
    -- Standard practice is to indent function contents.
    -- This function will insert a new row into wk07_submissions_species when a new row/post is made to wk07_submissions
    INSERT INTO wk07_submissions_species (submission_id, species_id)
    VALUES (NEW.id, NEW.species);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- `AS $$ ... $$` is used to determine the start and end of procedural language code.
-- `LANGUAGE plpgsql;` is the procedural language of the function. This stands for Procedural Language/PostgreSQL

-- FUNCTION TRIGGER - CALLS FUNCTION AFTER ROW IS INSERTED ON WK07_SUBMISSIONS TABLE
CREATE TRIGGER submissions_insert -- submissions_insert is just the name
AFTER INSERT ON wk07_submissions
FOR EACH ROW
EXECUTE FUNCTION update_wk07_submissions_species();