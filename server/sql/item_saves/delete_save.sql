DELETE FROM item_saves
WHERE item_id=%(item_id)s AND user_id=%(user_id)s
RETURNING *;