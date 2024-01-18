select plans.id, plans.name, plans.monthly_cost, plans.monthly_points from users
join plans
on plans.id = users.plan_id
where users.id = %(user_id)s