<!-- TABLE OF CONTENTS -->
# **Table of Contents**

- [**Table of Contents**](#table-of-contents)
- [Task 1](#task-1)
  - [Task 1 requirement](#task-1-requirement)
  - [Workflow](#workflow)
  - [Main idea](#main-idea)
  - [Set up and run](#set-up-and-run)
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

# Task 3 - Schema

By default, Mongoose queries return an instance of the Mongoose Document class. Documents are much heavier than vanilla JavaScript objects, because they have a lot of internal state for change tracking. Enabling the ``lean`` option tells Mongoose to skip instantiating a full Mongoose document and just give you the POJO.

## Example

  ```js
    const leanDoc = await MyModel.findOne().lean();
  ```

_${\color{yellow}{Note:}}$ Mongoose support using ``populate()`` with ``lean()`` option._
