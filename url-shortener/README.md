<!-- TABLE OF CONTENTS -->
# **Table of Contents**

- [**Table of Contents**](#table-of-contents)
- [Task 1](#task-1)
  - [Task 1 requirement](#task-1-requirement)
  - [Workflow](#workflow)
  - [Main idea](#main-idea)
  - [Set up and run](#set-up-and-run)
- [Task 2](#task-2)
  - [Task 2 requirement](#task-2-requirement)
  - [Data Modelling Step](#data-modelling-step)
  - [Workflow for task 2](#workflow-for-task-2)
  - [Optimization](#optimization)
    - [Using Reddis for storing user session](#using-reddis-for-storing-user-session)
  - [Setting up and run](#setting-up-and-run)
- [Task 3 - Schema](#task-3---schema)
  - [Example](#example)

# Task 1

## Task 1 requirement

In ``mongoose``, there is a function named ``populate()`` in which it replace the path to the sub-document in the current document by the real sub-document. In this task, we are trying to implement the ``populate()`` method and optimize so that it will takes least call to the database as possible and try to minimize for useless data being transfered.

## Workflow

1. Set up model for book and author using mongoose.

2. Create fake data for books and authors using ``@faker-js/faker`` npm library.

    _${\color{yellow}{Note:}}$ The books will be randomly select author from the authors collections._

3. Write populate.js file simulate the ``populate()`` method in mongoose.

## Main idea

We need to call to database for simulating populate function in which:

1. The first call will find all the books we want. Then we will use an array to store all the authors the book references to.

2. The second call will find all the authors the book references and then we merge the current data with the first call data then return the result.

## Set up and run

Step 1: Run redis-server and try to connect.

Run redis-server by the following command.

```bash
  sudo service mongodb start
```

Step 2: Change the .env file.

```bash
  MONGODB_URI = mongodb://localhost:27017/test
```

Step 3: Uncomment the fake data function in the main function in populate.js.

```js
async function main() {
  await fakeAuthorData(1000);
  await fakeBookData(1000);
}
```

Step 4: Run the js file in the terminal to create fake data.

```bash
node populate.js
```

Step 5: Rewrite the main function in the populate.js file and run to see the result.

```js
async function main() {
  const books = await Book.find({}).limit(10);
  const result = await populate(books);
  console.log(result);
  console.log(result[0].authors[0]);
}
```

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

## Setting up and run

Step 1: Run ``redis-server``.

```bash
  sudo service redis-server start
```

Step 2: Install necessary library.

```bash
  npm install
```

Step 3: Change the .env config file.

Run the following command to download necessary library.

```bash
  SESSION_TIME_OUT = 300000
  PORT = 8081
  MONGODB_URI = mongodb://localhost/test
```

Step 4: Run the web-service.

```bash
  npm start
```

Step 5: Open browser and shorten URL without login on the front page.

Step 6: Login and sign-up

Step 7: Get the statistics about your urls by accessing the route (/statistics)

# Task 3 - Schema

By default, Mongoose queries return an instance of the Mongoose Document class. Documents are much heavier than vanilla JavaScript objects, because they have a lot of internal state for change tracking. Enabling the ``lean`` option tells Mongoose to skip instantiating a full Mongoose document and just give you the POJO.

## Example

  ```js
    const leanDoc = await MyModel.findOne().lean();
  ```

_${\color{yellow}{Note:}}$ Mongoose support using ``populate()`` with ``lean()`` option._
