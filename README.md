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
    - [${\color{89CFF0}What}$ ${\color{89CFF0}is}$ ${\color{89CFF0}populate}$ ${\color{89CFF0}and}$ ${\color{89CFF0}how}$ ${\color{89CFF0}to}$ ${\color{89CFF0}do}$ ${\color{89CFF0}it}$ ${\color{89CFF0}using}$ ${\color{89CFF0}mongoose}$ ${\color{89CFF0}or}$ ${\color{89CFF0}mongoDB}$ ${\color{89CFF0}native?}$](#color89cff0what-color89cff0is-color89cff0populate-color89cff0and-color89cff0how-color89cff0to-color89cff0do-color89cff0it-color89cff0using-color89cff0mongoose-color89cff0or-color89cff0mongodb-color89cff0native)
      - [Adding in native MongoDB and mongoose](#adding-in-native-mongodb-and-mongoose)
      - [Bulk-adding in MongoDB and mongoose](#bulk-adding-in-mongodb-and-mongoose)
    - [${\color{89CFF0}MongoDB}$ ${\color{89CFF0}relationship}$ ${\color{89CFF0}design}$ ${\color{89CFF0}best}$ ${\color{89CFF0}practice}$](#color89cff0mongodb-color89cff0relationship-color89cff0design-color89cff0best-color89cff0practice)
    - [${\color{89CFF0}How}$ ${\color{89CFF0}indexing}$ ${\color{89CFF0}work}$ ${\color{89CFF0}in}$ ${\color{89CFF0}MongoDB}$](#color89cff0how-color89cff0indexing-color89cff0work-color89cff0in-color89cff0mongodb)
  - [${\color{orange}mongoose}$](#colororangemongoose)

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

_**${\color{#FFCC00}NOTE}$**: When to use ORM and when not?_

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

### ${\color{89CFF0}What}$ ${\color{89CFF0}is}$ ${\color{89CFF0}populate}$ ${\color{89CFF0}and}$ ${\color{89CFF0}how}$ ${\color{89CFF0}to}$ ${\color{89CFF0}do}$ ${\color{89CFF0}it}$ ${\color{89CFF0}using}$ ${\color{89CFF0}mongoose}$ ${\color{89CFF0}or}$ ${\color{89CFF0}mongoDB}$ ${\color{89CFF0}native?}$

Populating is the process of adding data to table in MongoDB.
There are two mains way of doing that:

- Adding one by one
- Bulk Adding

#### Adding in native MongoDB and mongoose

#### Bulk-adding in MongoDB and mongoose

### ${\color{89CFF0}MongoDB}$ ${\color{89CFF0}relationship}$ ${\color{89CFF0}design}$ ${\color{89CFF0}best}$ ${\color{89CFF0}practice}$

### ${\color{89CFF0}How}$ ${\color{89CFF0}indexing}$ ${\color{89CFF0}work}$ ${\color{89CFF0}in}$ ${\color{89CFF0}MongoDB}$

## ${\color{orange}mongoose}$
