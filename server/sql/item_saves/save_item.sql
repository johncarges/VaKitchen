INSERT INTO item_saves (user_id, item_id)
VALUES (%(user_id)s, %(item_id)s)
RETURNING *;