SELECT * FROM plans
WHERE is_current AND id = %(id)s;