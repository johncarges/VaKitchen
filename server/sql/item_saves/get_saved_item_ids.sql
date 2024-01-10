SELECT items.id
FROM item_saves
JOIN items ON items.id=item_saves.item_id
WHERE item_saves.user_id=%(user_id)s;