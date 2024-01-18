# VaKitchen

The idea: full-stack web app to mock a subscription service that allows users to rent a variety of kitchen items.

## Technologies
- Front end built with React and the latest features of React Router Dom 6, including RouterProvider and component loaders
- Database in PostgreSQL with tables for users, items, orders, item saves (when a user 'favorites' a particular item, but doesn't place an order), and subscription plans (allowing users to hold onto their price and terms, which may no longer be offered). Connection to database through psycopg2.
- API built with FastAPI. Pydantic models for data validation. All database operations performed by reading raw sql files (no ORM, for fun/experience).
- User authentication on protected routes built around Oauth2 and JWT tokens

## User Features:
- Browse rentable kitchen items, filtering by type, points (price) per order. Save favorite items for future rental
- Create an account with a particular subscription plan, and view favorited items, current/upcoming/past orders

## Pages:
- Home page - see popular items and links to sign up, view plans, view all items
- About page - information on subscriptions and origin story
- Items - view, search, and filter items
- User 
    - See account details and settings
    - See saved items
    - See current, past, and queued orders


## Future Additions:
- Reviews: allow users to review rented items, and view reviews from others
- Create interactive system to mock order lifecycle and status.