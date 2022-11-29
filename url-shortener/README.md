# Task 2

## Task 2 requirement

I was assigned to create an url shortener web service that meets the following requirements:

- Users can shorten their url without login.
- Users can keep track of their url 's visit times.
- Users can delete their shorten urls.

## Data Modelling Step

To meet the requirement, we will need to stores infomation about user account (username, password) and the url detail (the shorten one, the original one).

So the question here is should we use embedded or reference for the relationship between user and the url.

There are something to consider :

- The relation here is one to many and one user will likely not create too much shorten urls, therefore, we might skip consider about the massive array problem.
- This web service will likely have the redirect function as the most used one therefore the url fetching step will need to be optimized the most.

In conclusion, the reference method seems to be the one to go for this situation.

## Workflow for task 2

1. Create Model for users and urls.
2. Create route for create-new-user, login, shorten-url, statics.
3. Implement the methods.

## Optimization

### Using Reddis for storing user session

As in the ``express-session`` document:

``The default server-side session storage, MemoryStore, is purposely not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.``

That means, we should not use the MemoryStore for storing the user session. That could lead to unexpected side-effect in production environment.

Beside, if we need to reload the server due to some process being crash. The memory will be clear, and the user they all need to login again.

## Some features the app provides

Admins:

1. Admin can see the dashboard the URL and users.
2. Admin can disable user and if at that time the user has already logined, they will be logged out. (/user-management)
3. Admin can delete URL.

Users and guest:

1. User and guests can create and access the shortened link.
2. The shoterned can have expiration time.
3. Guest will have default shortened link existed of 1 week.
4. User can login using google account.
5. User can delete the URL.
6. The server will check if the link is valid.
7. Track user-abnormality.
