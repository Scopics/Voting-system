--1. Вывод всех голосований в порядке убывания

SELECT * FROM votings ORDER BY start_date DESC;

--2. Вывод только тех голосований которые идут сейчас

-- По дате и времени

SELECT * FROM votings WHERE (start_date < NOW() AND NOW() < end_date);

-- Только по дате

SELECT * FROM votings WHERE (DATE(end_date) >= CURRENT_DATE) AND (DATE(start_date) <= CURRENT_DATE);

--3. Вывод всех петиций в порядке убывания

SELECT * FROM petitions ORDER BY start_date DESC;

--4. Вывод тех петиций которые идут сейчас

-- По дате и времени

SELECT * FROM petitions WHERE (start_date < NOW() AND NOW() < end_date);

-- Только по дате

SELECT * FROM petitions WHERE (DATE(end_date) >= CURRENT_DATE) AND (DATE(start_date) <= CURRENT_DATE); 

--5. Запрос на добавление новой петиции

INSERT INTO petitions VALUES (default, ${name}, ${description}, ${author_user_id}, ${start_date}, ${end_date});

--6. Запрос на добавление нового голосования

INSERT INTO votings VALUES (default, ${name}, ${description}, ${start_date}, ${end_date});

--7. Запрос на добавление вариантов для голосования

INSERT INTO variants VALUES (default, ${voting_id}, ${name}, ${description});

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

SELECT variant_id, COUNT(variant_id) AS num_voters
    FROM voting_results
    WHERE voting_id = ${voting_id}
    GROUP BY variant_id
    ORDER BY num_voters DESC;



--11. Запрос для подсчёта голосов за определенную петицию

SELECT petition_id, COUNT(petition_id) AS num_voters FROM petition_results WHERE petition_id = ${petition_id} GROUP BY petition_id;



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

SELECT variants.name, COUNT(users.name) AS votes
    FROM voting_results, users, variants
    WHERE voting_results.user_id = users.user_id AND voting_results.variant_id = variants.variant_id AND
        voting_results.voting_id = ${voting_id} AND users.district_id = ${district_id}
    GROUP BY variants.name
    ORDER BY votes DESC;


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


SELECT petition_id, u.district_id, COUNT(pr.petition_id) AS num_voters
    FROM petition_results pr
    LEFT JOIN users u
        ON u.user_id=pr.user_id
    WHERE pr.petition_id = ${petition_id}
    GROUP BY pr.petition_id, u.district_id
    ORDER BY num_voters DESC;

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

SELECT petition_id, districts.region_id, COUNT(*)
    FROM petition_results
    INNER JOIN users ON petition_results.user_id = users.user_id
    INNER JOIN districts ON users.district_id = districts.district_id
    WHERE petitions_id = ${petition_id}
    GROUP BY petition_id, districts.region_id
    ORDER BY count DESC, region_id;

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
                                   
--17. Запрос для записи выбора в голосовании

INSERT INTO voting_results VALUES (${voting_id}, ${variant_id}, ${user_id});
                                   
--18. Запрос на изменение статуса юзера

UPDATE users SET status = ${status} WHERE user_id = ${user_id}; 

--19. Вывод вариантов для определенного голосования

SELECT * FROM variants WHERE voting_id = ${voting_id};

--20. Запрос для записи выбора в петиции

INSERT INTO petition_results VALUES (${petition_id}, ${user_id});
