# URL-shortener app

## Some features the app provides

Admins:

1. Admin account can be created, and admin can use that account to login next time, then they can log out.

    POST /admin/sign-up
    Require parameter: Email, password

    POST /admin/login
    Require parameter: Email, password

    GET /admin/log-out

2. Admin can delete any URLs, users (normal users) from database.

    DELETE /admin/url/:url
    DELETE /admin/user/:email

3. Admin can disable user and if at that time the user has already logined, they will be logged out at all devices.

    GET /admin/disable/:email)

Users and guest:

1. Guest can create account.

    POST /create-user
    Required parameter: Email, password

2. User can login and log-out.

    POST /login
    Required parameter: Email, password

    Get /log-out

3. User can login using Google or Facebook.

    GET /auth/google
    GET /auth/facebook

4. Reset password.

    POST /forgot-password
    Required parameter: email
    POST /reset-password/:token
    Required parameter: newPassword

5. User can delete the URL and see statistic about all the links they have.

    DELETE /:url
    GET /statistics

6. User can see the device login into their account and can logout from a specific device. (This function can only be done when user have already logined)

    GET /device/list
    GET /device/disable/:device

## Data Modelling

To meet the requirement, we will need to stores infomation about user account (email, password) and the url detail (the shorten one, the original one).

So the question here is should we use embedded or reference for the relationship between user and the url.

There are something to consider :

- The relation here is one to many and one user will likely not create too much shorten urls, therefore, we might skip consider about the massive array problem.
- This web service will likely have the redirect function as the most used one therefore the url fetching step will need to be optimized the most.

In conclusion, the reference method seems to be the one to go for this situation.

## Using Reddis for storing user session

As in the ``express-session`` document:

``The default server-side session storage, MemoryStore, is purposely not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.``

That means, we should not use the MemoryStore for storing the user session. That could lead to unexpected side-effect in production environment.

Beside, if we need to reload the server due to some process being crash. The memory will be clear, and the user they all need to login again.
