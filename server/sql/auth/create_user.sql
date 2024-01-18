insert into users (email, password_hash, plan_id)
values ( %(email)s, %(password_hash)s, %(plan_id)s)
returning *