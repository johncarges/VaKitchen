UPDATE items SET 
name=%(name)s, 
price=%(price)s, 
description=%(description)s, 
is_available=%(is_available)s
WHERE id = %(id)s
RETURNING *;