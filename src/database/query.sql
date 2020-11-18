
--2. Вывод только тех голосований которые идут сейчас

-- Только по дате

SELECT * FROM votings WHERE (DATE(end_date) >= CURRENT_DATE) AND (DATE(start_date) <= CURRENT_DATE);

--4. Вывод тех петиций которые идут сейчас



-- Только по дате

SELECT * FROM petitions WHERE (DATE(end_date) >= CURRENT_DATE) AND (DATE(start_date) <= CURRENT_DATE); 

--5. Запрос на добавление новой петиции

INSERT INTO petitions VALUES (default, ${name}, ${description}, ${author_user_id}, ${start_date}, ${end_date});




--8. Запрос на добавление нового юзера

INSERT INTO users VALUES (default, ${name}, ${surname}, ${birthday_date}, ${gender}, ${district_id}, ${email}, ${password}, ${status});

--9. Запрос на добавление фальсификации

INSERT INTO falsifications VALUES (default, ${author_user_id}, ${voting_id}, ${title}, ${description});

--10. Запрос для подсчёта голосов для определенного голосования по вариантам в порядке убывания

SELECT variants.name, count(users.name) AS votes
    FROM users
    INNER JOIN voting_results
        ON voting_results.user_id = users.user_id
    INNER JOIN variants
        ON voting_results.variant_id = variants.variant_id
    WHERE voting_results.voting_id = 3
    GROUP BY variants.name
    ORDER BY votes DESC;




--11. Запрос для подсчёта голосов за определенную петицию



SELECT petitions.name, count(petitions.petition_id) AS votes
    FROM petitions
    INNER JOIN petition_results
        ON petitions.petition_id = petition_results.petition_id
    WHERE petitions.petition_id = 1
    GROUP BY petitions.name
    ORDER BY votes DESC;




--12. Запрос для подсчёта голосов для определенного голосования по вариантам в определенной области в порядке убывания

SELECT vr.variant_id, COUNT(variant_id) AS num_voters 
    FROM voting_results vr
    LEFT JOIN users u
        ON u.user_id=vr.user_id
    WHERE vr.voting_id = ${voting_id} AND u.district_id = ${district_id}
    GROUP BY vr.variant_id
    ORDER by num_voters DESC;


--13. Запрос для подсчёта голосов для определенного голосования по вариантам в определенном регионе в порядке убывания



SELECT variants.name, COUNT(users.name) AS votes
    FROM users
    INNER JOIN voting_results
        ON voting_results.user_id = users.user_id
    INNER JOIN variants
        ON voting_results.variant_id = variants.variant_id
    INNER JOIN districts
        ON districts.district_id = users,district_id
    WHERE voting_results.voting_id = ${voting_id} AND districts.region_id = ${region_id}
    GROUP BY variants.neme
    ORDER BY votes DESC;

SELECT vr.variant_id, COUNT(variant_id) AS num_voters
    FROM voting_results vr
    INNER JOIN users u
        ON u.user_id = vr.user_id
    INNER JOIN districts d
        ON d.district_id = u.district_id
    WHERE vr.voting_id = ${voting_id} AND d.region_id = ${region_id}
    GROUP BY vr.variant_id
    ORDER BY num_voters DESC;

--14. Запрос для подсчёта голосов за определенную петицию по областям в порядке убывания




SELECT districts.name, count(users.name) AS votes 
    FROM users
    INNER JOIN petition_results
        ON petition_results.user_id = users.user_id
    INNER JOIN petitions
        ON petitions.petition_id = petition_results.petition_id
    INNER JOIN districts
        ON users.district_id = districts.district_id
    WHERE petitions.petition_id = 1
    GROUP BY districts.name
    ORDER BY votes DESC;

--15. Запрос для подсчёта голосов за определенную петицию по регионам в порядке убывания



SELECT regions.name, count(users.name) AS votes
    FROM users
    INNER JOIN petition_results
        ON petition_results.user_id = users.user_id
    INNER JOIN petitions
        ON petitions.petition_id = petition_results.petition_id
    INNER JOIN districts
        ON users.district_id = districts.district_id
    INNER JOIN regions
        ON regions.region_id = districts.region_id
    WHERE petitions.petition_id = 1
    GROUP BY regions.name
    ORDER BY votes DESC;




--16. Запрос на проверку логина и пароля для входа в систему

SELECT * FROM users
    WHERE users.email = ${user_id} AND users.password = ${password}; 

--18. Запрос на изменение статуса юзера

UPDATE users SET status = ${status} WHERE user_id = ${user_id}; 

--19. Вывод вариантов для определенного голосования

SELECT * FROM variants WHERE voting_id = ${voting_id}; -- Діма