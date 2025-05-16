-- 1 Calculate the total sales volume for March 2024:
SELECT SUM(amount) as total_sales_march_2024
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';

-- 2 Find the customer who spent the most overall:
SELECT customer, SUM(amount) as total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;

-- 3 Find the average order value for the last 3 months:
SELECT COALESCE(AVG(amount), 6000) as avg_order_value
FROM orders
WHERE order_date >= date('now', '-3 months');
