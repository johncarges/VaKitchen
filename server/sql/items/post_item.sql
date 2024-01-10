INSERT INTO items (name, price, description, image_url)
VALUES ( %(name)s, %(price)s, %(description)s, %(image_url)s )
RETURNING *;