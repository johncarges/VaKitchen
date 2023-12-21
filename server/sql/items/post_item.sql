INSERT INTO items (name, price, description)
VALUES ( %(name)s, %(price)s, %(description)s )
RETURNING *;