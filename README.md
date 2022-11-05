# backend-mongodb

<!-- TABLE OF CONTENTS -->
## ${\color{orange}Table}$ ${\color{orange}of}$ ${\color{orange}Contents}$

- [backend-mongodb](#backend-mongodb)
  - [${\color{orange}Table}$ ${\color{orange}of}$ ${\color{orange}Contents}$](#colororangetable-colororangeof-colororangecontents)
  - [${\color{orange}Requirement}$](#colororangerequirement)
  - [${\color{orange}Database}$ ${\color{orange}terminologies}$](#colororangedatabase-colororangeterminologies)
    - [${\color{89CFF0}ORM}$ ${\color{89CFF0}and}$ ${\color{89CFF0}Driver}$](#color89cff0orm-color89cff0and-color89cff0driver)
    - [${\color{89CFF0}Schema}$](#color89cff0schema)
  - [${\color{orange}MongoDB}$ ${\color{orange}and}$ ${\color{orange}NoSQL}$ ${\color{orange}database}$](#colororangemongodb-colororangeand-colororangenosql-colororangedatabase)
    - [${\color{89CFF0}What}$ ${\color{89CFF0}is}$ ${\color{89CFF0}NoSQL}$ ${\color{89CFF0}database?}$](#color89cff0what-color89cff0is-color89cff0nosql-color89cff0database)
    - [${\color{89CFF0}NoSQL}$ ${\color{89CFF0}vs}$ ${\color{89CFF0}SQL}$](#color89cff0nosql-color89cff0vs-color89cff0sql)
    - [${\color{89CFF0}Schema}$ ${\color{89CFF0}in}$ ${\color{89CFF0}NoSQL}$](#color89cff0schema-color89cff0in-color89cff0nosql)
    - [${\color{89CFF0}What}$ ${\color{89CFF0}is}$ ${\color{89CFF0}populate?}$](#color89cff0what-color89cff0is-color89cff0populate)
    - [${\color{89CFF0}MongoDB}$ ${\color{89CFF0}relationship}$ ${\color{89CFF0}design}$ ${\color{89CFF0}best}$ ${\color{89CFF0}practice}$](#color89cff0mongodb-color89cff0relationship-color89cff0design-color89cff0best-color89cff0practice)
    - [${\color{89CFF0}How}$ ${\color{89CFF0}indexing}$ ${\color{89CFF0}work}$ ${\color{89CFF0}in}$ ${\color{89CFF0}MongoDB}$](#color89cff0how-color89cff0indexing-color89cff0work-color89cff0in-color89cff0mongodb)
  - [${\color{orange}Mongoose}$](#colororangemongoose)
    - [${\color{89CFF0}Basic}$ ${\color{89CFF0}commands}$](#color89cff0basic-color89cff0commands)
      - [**Create schema**](#create-schema)
      - [**Create model**](#create-model)
      - [**Create data instance**](#create-data-instance)
      - [**Save instance to collection**](#save-instance-to-collection)
      - [**find and findById**](#find-and-findbyid)
    - [${\color{89CFF0}Schema}$ ${\color{89CFF0}types}$ ${\color{89CFF0}in}$ ${\color{89CFF0}mongoose}$](#color89cff0schema-color89cff0types-color89cff0in-color89cff0mongoose)
      - [**Embedded Schema**](#embedded-schema)
      - [**Reference Schema**](#reference-schema)
    - [${\color{89CFF0}Schema}$ ${\color{89CFF0}validation}$](#color89cff0schema-color89cff0validation)

<!-- overview -->
## ${\color{orange}Requirement}$

This time we are required to learn about MongoDb - a NoSQL database management system and Mongoose - a npm library built for working with mongodb database. Below are some specific requirements we need to work on:

- The difference between ORM and Driver
- What is Schema? What is it used for?
- CRUD in Mongoose
- What is populate ?
- How to design the relationship in MongoDb
- What is NoSQL? How is it different from SQL?
- Indexing in MongoDb

## ${\color{orange}Database}$ ${\color{orange}terminologies}$

### ${\color{89CFF0}ORM}$ ${\color{89CFF0}and}$ ${\color{89CFF0}Driver}$

ORM stands for (Object-Relational Mapping) is a layer of software used to abstract away the work with database. Instead of working with raw data and raw query, user is now works with object, therefore user doesn't need to know how to work with the database driver to query them. When a query is executed, it will first be transform into raw queries first.
On the other hand, database driver require users to work directly with raw queries, and the users also need to handle much more low-level concept and works.

**When to use ORM and when not?**

As ORM simplifies the work with database, you should use it when the requirement for querying database is basic, where ORM does support it.
However in complicated project that requires high performance database queries, It is better to opt for working with driver (raw queries) instead.

### ${\color{89CFF0}Schema}$

A database schema defines how data is organized within a relational database; this is inclusive of logical constraints such as, table names, fields, data types, and the relationships between these entities. Schemas commonly use visual representations to communicate the architecture of the database, becoming the foundation for an organization’s data management discipline. This process of database schema design is also known as data modeling.

## ${\color{orange}MongoDB}$ ${\color{orange}and}$ ${\color{orange}NoSQL}$ ${\color{orange}database}$

### ${\color{89CFF0}What}$ ${\color{89CFF0}is}$ ${\color{89CFF0}NoSQL}$ ${\color{89CFF0}database?}$

NoSQL database like its name conveys, is non-tabular database in which they have no fixed schema. They may be document, key-value, graph, or wide-column stores.

### ${\color{89CFF0}NoSQL}$ ${\color{89CFF0}vs}$ ${\color{89CFF0}SQL}$

Weak points over SQL (**${\color{green}ACID}$** property):

- Atomic
- Consistency
- Isolation
- Durability

Strong points over SQL:

- Schema free
- Replication of data stores to avoid Single Point of Failure.
- Can handle Data variety and huge amounts of data.
- Scalability
- NoSQL can store unstructured, semi-structured data or structured data. While SQL is only for structured data.

**${\color{green}BASE}$** property of NoSQL:

- Basically Available: Guarantees the availability of the data . There will be a response to any request (can be failure too).
- Soft state: The state of the system could change over time.
- Eventual consistency: The system will eventually become consistent once it stops receiving input.

### ${\color{89CFF0}Schema}$ ${\color{89CFF0}in}$ ${\color{89CFF0}NoSQL}$

### ${\color{89CFF0}What}$ ${\color{89CFF0}is}$ ${\color{89CFF0}populate?}$

Populating is the process of adding data to table in MongoDB.
There are two mains way of doing that:

- Adding one by one
- Bulk Adding

### ${\color{89CFF0}MongoDB}$ ${\color{89CFF0}relationship}$ ${\color{89CFF0}design}$ ${\color{89CFF0}best}$ ${\color{89CFF0}practice}$

### ${\color{89CFF0}How}$ ${\color{89CFF0}indexing}$ ${\color{89CFF0}work}$ ${\color{89CFF0}in}$ ${\color{89CFF0}MongoDB}$

## ${\color{orange}Mongoose}$

Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. The part below will discuss how to use mongoose.

_**${\color{#FFCC00}NOTE:}$** Mongoose supports both promises and callbacks._

### ${\color{89CFF0}Basic}$ ${\color{89CFF0}commands}$

- Database connection command

In mongoose, we can use the below syntax to connect with the database:

```js
  mongoose.connect('mongodb://<HostIP>:<PORT>/<Database>');
```

The mongoose.connect is an async function and the time for connecting to mongodb server is quite large but mongoose has a queue for database commands, where all commands will be save there, waiting for the connection to establish and then run.

#### **Create schema**

In mongoose, we can use the below syntax to create a new database schema:

```js
  new mongoose.Schema({
    attribute1: dataType1,
    attribute2: dataType2,
    ...
  });
```

We need a schema to create a model for ORM queries later.

#### **Create model**

In mongoose, we can use the below syntax to create a new model:

```js
  mongoose.model('<collectionName>', schema);
```

The collectionName is the collection name of the collection in the database. The mongoose by default will auto lowercase the first character of the collectionName and convert it to plural state. If you didn't create a collection with that name before, mongoose will also create it for you.

The variable schema is the schema your created before.

For example:

```js
  collectionName: User  =>  users
```

#### **Create data instance**

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

#### **Save instance to collection**

After created new instance, use can save them by the command:

```js
  newUser.save();
```

#### **find and findById**

### ${\color{89CFF0}Schema}$ ${\color{89CFF0}types}$ ${\color{89CFF0}in}$ ${\color{89CFF0}mongoose}$

In MongoDB, we can have reference data model and embedded data model, the section below will discuss how to create one and when to use it.

#### **Embedded Schema**

It is suggest that for one-to-one relation and one-to-many relation, when the data is often used together, we should opt for embedded model to include them inside one document as it still maintains the data consistency but also the query speed.

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

#### **Reference Schema**

Reference model on the other hand is suitable for many-to-many relation or the case when the data is to big to be stored inside one document or the related data is not often queried along, it is better to use reference model.

Here is the syntax where you can define one in mongoose:

```js
  const userSchema = new mongoose.Schema({
    userName: String,
    passWord: String,
    // Reference here
    bestFriend: mongoose.Schema.ObjectId,
  })
```

### ${\color{89CFF0}Schema}$ ${\color{89CFF0}validation}$

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
