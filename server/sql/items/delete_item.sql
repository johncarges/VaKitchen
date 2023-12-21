DELETE FROM items
WHERE id = %(id)s
RETURNING *;