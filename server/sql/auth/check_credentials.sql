select id, email, password_hash, plan_id from users
where email = %(email)s;