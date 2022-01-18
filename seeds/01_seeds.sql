INSERT INTO users (name, email, password)
VALUES ('Rachel Green', 'rachelgreen@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ross Geller', 'rossgeller@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Monica Geller', 'monicageller@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Chandler Bing', 'chandlerbing@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Phoebe Buffay', 'phoebebuffay@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Joey Tribbiani', 'joeytribbiani@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (3, 'Full House', 'description', 'https://unsplash.com/photos/R-LK3sqLiBw', 'https://unsplash.com/photos/eofm5R5f9Kw', 700, 1, 2, 3, 'Canada', 'Simcoe Street', 'Toronto', 'ON', 'MAH123', true),
(1, 'Deja Blue', 'description', 'https://unsplash.com/photos/-eLfQTmDfLk', 'https://unsplash.com/photos/HkAbnEf0Jwc', 1500, 2, 2, 4, 'United States', 'Long Beach', 'Los Angeles', 'CA', '12345', true),
(2, 'Vibe n Joy', 'description', 'https://unsplash.com/photos/L7EwHkq1B2s', 'https://unsplash.com/photos/ZET7VRHZwl0', 500, 1, 1, 2, 'Canada', 'Main Street', 'Vancouver', 'BC', 'ABC987', true);

INSERT INTO reservations (property_id, guest_id, start_date, end_date)
VALUES (1, 5, '2019-08-24', '2019-08-27'),
(3, 3, '2019-11-11', '2019-11-17'),
(1, 2, '2019-12-19', '2019-12-20'),
(2, 4, '2020-01-08', '2020-01-12'),
(2, 5, '2020-01-15', '2020-01-17'),
(1, 6, '2020-02-14', '2020-02-24'),
(3, 1, '2020-03-01', '2020-03-03');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 1, 3, 5, 'messages'),
(4, 2, 4, 4, 'messages'),
(6, 1, 6, 5, 'messages'),
(5, 1, 1, 3, 'messages'),
(1, 3, 7, 5, 'messages');