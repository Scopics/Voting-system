


--5. Запрос на добавление новой петиции

INSERT INTO petitions VALUES (default, ${name}, ${description}, ${author_user_id}, ${start_date}, ${end_date});






--9. Запрос на добавление фальсификации

INSERT INTO falsifications VALUES (default, ${author_user_id}, ${voting_id}, ${title}, ${description});






--11. Запрос для подсчёта голосов за определенную петицию



SELECT petitions.name, count(petitions.petition_id) AS votes
    FROM petitions
    INNER JOIN petition_results
        ON petitions.petition_id = petition_results.petition_id
    WHERE petitions.petition_id = 1
    GROUP BY petitions.name
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



