<!-- TABLE OF CONTENTS -->
# **Table of Contents**

- [**Table of Contents**](#table-of-contents)
- [**MongoDB and NoSQL database**](#mongodb-and-nosql-database)
  - [**What is NoSQL database?**](#what-is-nosql-database)
  - [**NoSQL vs SQL**](#nosql-vs-sql)
  - [**Schema**](#schema)
  - [**Schema in NoSQL**](#schema-in-nosql)
  - [**MongoDB relationship design best practice**](#mongodb-relationship-design-best-practice)
  - [**How indexing work in MongoDB**](#how-indexing-work-in-mongodb)
- [**ORM and Driver**](#orm-and-driver)
- [**Mongoose**](#mongoose)
  - [**Basic commands**](#basic-commands)
    - [Create schema](#create-schema)
    - [Create model](#create-model)
    - [Create data instance](#create-data-instance)
    - [Save instance to collection](#save-instance-to-collection)
    - [Read using find() and findById()](#read-using-find-and-findbyid)
    - [Populate](#populate)
    - [Complex filter object](#complex-filter-object)
    - [Complex update object](#complex-update-object)
    - [Read Modifiers](#read-modifiers)
  - [**Schema types in mongoose**](#schema-types-in-mongoose)
    - [Embedded Schema](#embedded-schema)
    - [Reference Schema](#reference-schema)
  - [**Schema validation**](#schema-validation)

# **MongoDB and NoSQL database**

## **What is NoSQL database?**

NoSQL database like its name conveys, is `non-tabular database` in which they have no fixed schema. They may be `document`, `key-value`, `graph`, or `wide-column` stores.

## **NoSQL vs SQL**

Weak points over SQL (**${\color{lightblue}ACID}$** property):

- Atomic
- Consistency
- Isolation
- Durability

Strong points over SQL:

- Schema free
- Replication of data stores to avoid Single Point of Failure.
- Can handle Data variety and huge amounts of data.
- Scalability
- Can store unstructured, semi-structured data or structured data. While SQL is only for structured data.

**${\color{lightblue}BASE}$** property of NoSQL:

- Basically Available: Guarantees the availability of the data . There will be a response to any request (can be failure too).
- Soft state: The state of the system could change over time.
- Eventual consistency: The system will eventually become consistent once it stops receiving input.

## **Schema**

A database schema defines how data is `organized`, this is inclusive of logical constraints such as data types, and the `relationships between entities`.

Schemas commonly use visual representations to communicate the `architecture of the database`, becoming the foundation for an organization’s data management discipline. This process of database schema design is also known as `data modeling`.
## **Schema in NoSQL**

NoSQL doesn't have a fixed schema, but when working with NoSQL, there are some library that support createing Schema for your collection.

Aside from defining the structure of your documents and the types of data you're storing, a Schema handles the definition of:

- Validators (async and sync)
- Defaults
- Getters
- Setters
- Indexes
- Middleware
- Methods definition
- Statics definition
- Plugins
- pseudo-JOINs

// TODO: Give examples in mongoose.

## **MongoDB relationship design best practice**

// TODO

## **How indexing work in MongoDB**

// TODO

# **ORM and Driver**

`ORM` stands for `Object-Relational Mapping`, is a layer of software used to abstract away the work with database. Instead of working with raw data and raw query, user is now works with `object`, therefore user doesn't need to know how to work with the database driver to query them. When a query is executed, it will first be transform into raw queries first.

On the other hand, `database driver` require users to work directly with `raw queries`, and the users also need to handle much more low-level concept and works.

**When to use ORM and when not?**

As ORM simplifies the work with database, you should use it when the requirement for querying database is basic, where ORM does support it.

However in complicated project that requires high performance database queries, It is better to opt for working with driver (raw queries) instead.
# **Mongoose**

Mongoose is a MongoDB `object modeling tool` designed to work in an `asynchronous environment`. The part below will discuss how to use mongoose.

_**${\color{yellow}NOTE:}$** Mongoose supports both `promises` and `callbacks`._

## **Basic commands**

- Database connection command

In mongoose, we can use the below syntax to connect with the database:

```js
  mongoose.connect('mongodb://<HostIP>:<PORT>/<Database>');
```

The mongoose.connect is an async function and the time for connecting to mongodb server is quite large but mongoose has a `queue for storing database commands`, where all commands will be save there, waiting for the connection to establish and then run.

### Create schema

In mongoose, we can use the below syntax to create a new database schema:

```js
  new mongoose.Schema({
    attribute1: dataType1,
    attribute2: dataType2,
    ...
  });
```

We need a schema to create a model for ORM queries later.

### Create model

In mongoose, we can use the below syntax to create a new model:

```js
  mongoose.model('<collectionName>', schema);
```

The collectionName is the collection name of the collection in the database. The mongoose by default will auto `lowercase` the first character of the collectionName and convert it to `plural` state. If you didn't create a collection with that name before, mongoose will also create it for you.

The variable schema is the schema your created before.

For example:

```js
  collectionName: User  =>  users
```

### Create data instance

The model object created before can be used to add data to the collection.

```js
  const newUser1 = new User({ 
    name: 'Duy Tan',
    age: 19,
  });

  const newUser2 = User.Create({
    name: 'Duy Tan',
    age: 19,
  })
```

The instance created is infact an object in JS, you can access and modify the data of it.

```js
  const userSchema = mongoose.Schema({
    name: 'Duy Tan',
    age: 19,
  });
  newUser.name = 'Truong Tran Duy Tan';
```

### Save instance to collection

After created new instance, use can save them by the command ``document.save()`` or ``documents.bulkSave()`` for saving mutiple records at one time:

_${\color{yellow}NOTE:}$ Don't use documents.bulkSave() for bulk-create this will cause error because bulkSave() use bulkWrite() under the hood and bulkWrite() doesn't support insertMany() or replaceMany()._

```js
  newUser.save();
  updatedUsers.bulkSave();
```

### Read using find() and findById()

Each object in MongoDB has an unique ID string, in mongoose you can search for an object by its ID or by search for it by its key-value pair.

```js
  const users = await User.find({ name: 'Duy Tan' });
  // Return all the object in the collection that has the pair: name: 'Duy Tan';
```

_${\color{yellow} Note:}$ There are functions that mongoose supports such as ``findOneAndUpdate()``, ``findByIdAndUpdate()`` but they are recommended ``not to use`` because it will pass the validation step._

### Populate

In relational database, we have join method, but for non-relational database, we have a concept called populate, where all the the reference to other object is resolve.

// TODO Populate in mongoose.

### Complex filter object

- $eq: Check for equality
- $ne: Check for not equal

```js
  User.find({ name: { $eq: 'Duy Tan' } });
  User.find({ name: { $ne: 'Duy Tan' } });
```

- $gt / $gte: Check for greater than/ greater than or equal 
- $lt / $lte: Check for less than/ less than or equal

```js
  User.find({ age: { $gt: 12 } })
  User.find({ age: { $gte: 15 } })
  User.find({ name: { $lt: 25 } });
  User.find({ name: { $lte: 24 } });
```

- $in: Check if the value is one of many values.
- $nin: Check if the value is none of many values.

```js
  User.find({ name: {
    $in: ['Duy Tan', 'Dai Ca Tan'],
  } });
  User.find({ name: {
    $nin: ['Duy Tan', 'Dai Ca Tan'],
  } });
```

- $and: Check if all of the mutiple conditions are true.
- $or: Check if one of mutiple conditions is true.
- $not: Negate the filter

```js
  User.find({ $and: [{ name: 'Duy Tan' }, { age: 19 }]});
  User.find({ $or: [{ name: 'Duy Tan' }, { age: 19 }]});
  User.find({ $not: { name: 'Duy Tan' } });
```

- $exist: Check if a field exist.

```js
  User.find({ name: { $exists: true } });
```

- $expr: Do comparisons between different fields.

```js
  User.find({ $expr: { $gt: [“$balance”, “$debt”] } });
```

### Complex update object

- $set: Update only the fields passed to $set. This will not affect
any fields not passed to $set.

```js
  User.updateOne({ age: 12 }, { $set: { name: “Hi” } });
  // Update the name of the first user with the age of 12 to the value Hi.
```

- $inc: Increment the value of the field by the amount given.

```js
  User.updateOne({ age: 12 }, { $inc: { age: 2 } });
  // Add 2 to the age of the first user with the age of 12.
```

- $rename: Rename a field.

```js
  User.updateMany({}, { $rename: { age: “years” } });
  // Rename the field age to years for all users
```

- $unset: Remove a field.

```js
  User.updateOne({ age: 12 }, { $unset: { age: “” } });
  // Remove the age field from the first user with an age of 12
```

- $push: Add a value to an array field.

```js
  User.updateMany({}, { $push: { friends: “John” } });
  // Add John to the friends array for all users
```

- $pull: Remove a value from an array field.
.

```js
  Users.updateMany({}, { $pull: { friends: “Mike” } });
  // Remove Mike from the friends array for all users
```

### Read Modifiers

- sort: Sort the results of a find by the given fields
- limit: Only return a set number of documents
- skip: Skip a set number of documents from the beginning

```js
  User.find().sort({ name: 1, age: -1 });
  // Get all users sorted by name in alphabetical order and then if any names are the same sort by age in reverse order.
  User.find().limit(2);
  // Only return the first 2 users.
  User.find().skip(4);
  // Skip the first 4 users when returning results. This is great for pagination when combined with limit.
```

// TODO Update and Delete in mongoose.

## **Schema types in mongoose**

In MongoDB, we can have `reference` data model and `embedded` data model, the section below will discuss how to create one and when to use it.

### Embedded Schema

It is suggest that for `one-to-one relation` and `one-to-many relation`, when the data is often `used together`, we should opt for embedded model to include them inside one document as it still maintains the data consistency but also the query speed.

Take user-info and the user-account for example, Normally, when a user login, we will also need to get user-info later on, so in that case, we can merge the user-info collection and the user-account collection as one collection.

There are two ways to create embedded schema:

- Here is the syntax for the first way where you can define everything in one command:

```js
  const userSchema = new mongoose.Schema({
    userName: String,
    passWord: String,
    // Embedded here
    userInfo: {
      name: String,
      age: Number,
    }
  });
```

- Or you can create another schema and then link them together:

```js
  const userInfoSchema = new mongoose.Schema({
    name: String,
    age: Number,
  });

  const userInfoSchema = new mongoose.Schema({
    userName: String,
    passWord: String,
    // Embedded here
    userInfo: userInfoSchema,
  })
```

### Reference Schema

Reference model on the other hand is suitable for `many-to-many` relation or the case when the data is `too big to be stored inside one document` or the related data is `not often queried along`, it is better to use reference model.

Here is the syntax where you can define one in mongoose:

```js
  const userSchema = new mongoose.Schema({
    userName: String,
    passWord: String,
    // Reference here
    bestFriend: mongoose.Schema.ObjectId,
  })
```

## **Schema validation**

Mongoose supports addding constraint to the instance you created.

For example:

```js
  const userSchema = new mongoose.Schema({
    name: String,
    age: {
      type: Number,
      max: 100, // Upper-bound
      min: 1, // Lower-bound
      validate: {
        validator: v => v % 2,
        message: props => `${props.value} is not an event number`,
      },
    },
    email: {
      type: String,
      minLength: 10, // Lower-bound for length
      maxLength: 100, // Upper-bound for length
      required: true, // Not NULL constraint
      lowercase: true, // Auto lowercase convert
    },
    createAt: {
      type: Date,
      immutable: true,
      // User cannot change one assigned.
      default: () => Date.now(),
      // Give default value if user doesn't input.
    },
  });
```
