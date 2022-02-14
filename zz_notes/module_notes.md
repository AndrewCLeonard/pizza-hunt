# Module 18 Notes

## Introduction to Module 18: NoSQL Databases

NoSQL

-   store/retrieve unstructured data
-   faster performance
-   MongoDB using BSON format
-   Mongoose as Object-Document Mapper (ODM)
-   1st step to Progressive Web Application (PWA) using IndexedDB as a NoSQL client-side storage API in browser instead of cookies

### 18.0.2 Roadmap

Necessary Skills:

-   Execute CRUD methods with MongoDB.
-   Integrate Mongoose in an API.
-   Create query builders to populate documents using refs.

#### What I'll learn:

-   Explain the difference between SQL and NoSQL.
-   Configure Heroku for deployment of a Node.js application using MongoDB.
-   Explain and execute CRUD methods with MongoDB.
-   Integrate Mongoose in a full-stack web application.
-   Create query builders to populate documents using refs.
-   Implement client-side NoSQL using IndexedDB.

#### Weekly Tip: Embrace Errors

### 18.0.3 Getting Ready for Class

#### GitHub Packages Video

### 18.0.4 Up and Running

#### Module Project: Pizza Hunt

##### Video Explanation

#### getting Ready

-   MongoDB
-   Mongoose

#### MongoDB on Windows

#### MongoDB on macOS

just read the documentation!

## Lesson 1: Set Up the User Model

Objectives:

-   Integrate the API code with the client’s existing codebase.
-   Create a Pizza model using Mongoose.
-   Use Mongoose’s middleware to automate functionality.
-   Implement Mongoose’s pre-built methods for CRUD operations.
-   Complete a working front end to create a new pizza.

### 18.1.1: Introduction

NoSQL databases (e.g. Mongoose Library) allow for unknown db structures
Mongo ODM comparable to Sequelize ORM

1. create model for data
2. create means for interacting with that model

### 18.1.2: Preview

_create controller firnt in order to test functionality for testing routes_

1.  Set up the project.
1.  Create the Pizza model.
1.  Create the Pizza controller.
1.  Create Pizza API routes.
1.  Test API and connect the front-end form.

### 18.1.3: Set Up the Project

reviewing code, error in `add-pizza.html`. Closing div tag should move from line 184 --> 173!

### 18.1.4: Introducing MongoDB

| SQL                      | NoSQL                           |
| ------------------------ | ------------------------------- |
| Table                    | Collection                      |
| Row                      | Document                        |
| Column                   | Field                           |
| rigid structures         | unstructured data               |
| few columns with queries | hundreds or thousands of fields |
| fast response time       | large datasets                  |
| consistent dataset size  | evolving data structure         |

NoSQL db structure

-   typically handled in application layer
-   horizontally scalable on multiple servers

### 18.1.5: Install Mongoose and Create the Pizza Model

could use MongoDB Node.js library, but Mongoose is an ODM, offering more features.

-   create `models/Pizza.js`
-   import dependencies
-   create schema for pizza model given client specs
-   create `models/index.js` to package up all the models
-   Use `server.js` to set up Mongoose to connect when app is started.

    // top of file:

    ```
    const mongoose = require('mongoose');
    ```

    bottom right before `app.listen()` method

    -   `mongoose.connect()` tells Mongoose which db we want to connect to
    -   if env var `MONGODB_URI` exists, it will use that (like Heroku)
    -   otherwise, use local MongoDB server's db
    -   if db doesn't exist, it will create it.

    ```

    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/pizza-hunt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
    // log mongo queries being executed
    mongoose.set("debug", true);

    ```

### 18.1.6: Create the Pizza Controller

2 previous approaches:

1. `routes` dir holds routes and endpoint functionality
1. MVC pattern with routes and functionality in `controllers` dir

Now, use a structure to completely separate routes and functionality:

-   functionality in `controllers`
-   endpoints in `routes`

create `controllers` dir and `controllers/pizza-controller.js`, add routes

-   get all pizzas GET
-   get one pizza GET
-   post a pizza POST
-   update pizza PUT
-   delete pizza DELETE

js allows writing objects in two ways:

```
const dogObject = {
  // this...
  bark: function() {
    console.log('Woof!');
  },

  // ... is the same as this
  bark() {
    console.log('Woof!');
  }
}
```

In MongoDB, methods for adding data to a collection are `.insertOne()` or `.insertMany()`. But in Mongoose, we use the `.create()` method, which will actually handle either one or multiple inserts.

#### Create the Find Methods

### 18.1.7: Create the Pizza API Routes

create `routes/api` and `routes/api/pizza-routes.js`

-   combining HTTP route methods
-   keeps route files cleaner, to the point because not writing out route functionality
-   abstracts db methods from the routes, giving us the option to write unit tests with Jest

```
const router = require('express').Router();

// Set up GET all and POST at /api/pizzas
router
  .route('/')
  .get()
  .post();

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
  .route('/:id')
  .get()
  .put()
  .delete();

module.exports = router;
```

#### Implement Controller Methods

import functionality and hook it up with the routes:
instead of importing entire object and doing `pizzaController.getAllPizza()`, destructure the method names out of the imported object and use them directly

2nd line of `pizza-routes.js`

```
const {
	getAllPizza, //
	getPizzaById,
	createPizza,
	updatePizza,
	deletePizza,
} = require("../../controllers/pizza-controller");
```

implement them into the routes in `pizza-routes.js`

update `/api/pizzas`:

-   methods set up to accept `req` and `res` as parameters, so I can simply provide the name of the controller method as a callback.

```
// /api/pizzas
router
  .route('/')
  .get(getAllPizza)
  .post(createPizza);
```

```
// /api/pizzas/:id
router
  .route('/:id')
  .get(getPizzaById)
  .put(updatePizza)
  .delete(deletePizza);
```

#### Integrate API Routes into the Server

-   create `api/index.js` to import all of API routes, prefix their endpoints, package them up
-   file already imported and used in `server.js`, so no update needed there

### 18.1.8: Test the API and Connect the Front-End Form

add routes to insomnia

-   for the `"_id"`, for `getOne`, `UPDATE` and `DELETE` copy one from one of the added pizzas

when testing the `delete` route, run it twice because the first time will return the deleted data. The second should be empty.

#### Add POST Functionality to the Front-End Form

```
fetch('/api/pizzas', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
})
  .then(response => response.json())
  .then(postResponse => {
    alert('Pizza created successfully!');
    console.log(postResponse);
  })
  .catch(err => {
    console.log(err);
  });
```

### 18.1.9: Reflection

-   Integrated the API code with the client’s existing codebase.
-   Created a Pizza model using Mongoose.
-   Used Mongoose’s middleware to automate functionality.
-   Implemented Mongoose’s prebuilt methods for CRUD operations.
-   Built a working front end to create a new pizza.

## Lesson 2: Add Comments

### 18.2.1: Introduction

new functionality:

-   Create a Mongoose model.
-   Set up CRUD methods that use Mongoose models.
-   Create a relationship between two models.

learn how to:

-   Interact with arrays in Mongoose.
-   Work with subdocuments in Mongoose.
-   Implement getters with Mongoose.

### 18.2.2: Preview

-   build a comment section on pizza detail
-   tie comments to their pizzas to reduce server requests
    -   use Mongoose to create a relationsihp between two models
-   enable user to comment on a pizza

### 18.2.3: Create the Comment Model

-   new branch `feature/comment-model`

each comment should have:

1. `writtenBy`
1. `commentBody`
1. `createdAt`

### 18.2.4: Associate the Pizza and Comments Models

**Create db Connections**

| Sequelize                                                     | Mongoose                                                 |
| ------------------------------------------------------------- | -------------------------------------------------------- |
| store a reference of the parent data's id with the child data | recommended to tell parent to keep track of its children |

in `Pizza.js`

-   add `comments` array field to the schema.
    -   tell Mongoose to expect an `ObjectId` and its data comes from `Comment` model
    -   `ref: 'Comment'` tells `Pizza` model which documents to search to find the right comments
-   **Virtuals** allow us to add more info to a db response so we don't have to add the info manually with a helper before responding to the API request.

```
const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    size: {
      type: String,
      default: 'Large'
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});
```

import `Comment.js` model into `models/index.js` to package up both models:

```
const Pizza = require('./Pizza');
const Comment = require('./Comment');

module.exports = { Pizza, Comment };
```

### 18.2.5: Create the Pizza Controller Methods

-   create `controllers/comment-controller.js`
-   import models
-   create `commentController` object for adding and removing comments

Mongo DB-based has functions like `$push` that start with a dollar sign so you know what's built in and what's not.

```
addComment({ params, body }, res) {
  console.log(body);
  Comment.create(body)
    .then(({ _id }) => {
      return Pizza.findOneAndUpdate(
        { _id: params.pizzaId },
        { $push: { comments: _id } },
        { new: true }
      );
    })
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => res.json(err));
}
```

#### `removeComment()` method

```
removeComment({ params }, res) {
  Comment.findOneAndDelete({ _id: params.commentId })
    .then(deletedComment => {
      if (!deletedComment) {
        return res.status(404).json({ message: 'No comment with this id!' });
      }
      return Pizza.findOneAndUpdate(
        { _id: params.pizzaId },
        { $pull: { comments: params.commentId } },
        { new: true }
      );
    })
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => res.json(err));
}
```

-   `.findOneAndDelete()` works like `findOneAndUpdate()`- deletes document while returning its data
-   take that data and use it to identify and remove it from the associated pizza using Mongo `$pull` operation
-   return the updated pizza data without the `_id` of teh comment in the `comments` array, and return it to the user.

### 18.2.6: Create and Test the Routes

set up `routes/api/comment-routes.js`

-   require Express
-   include destructured (?) objects from `controllers/comment-controller.js`, `addComment` and `removeComment`
-   export the router module
-   set up routes
    -   `/api/comments/:pizzaId` with `addComment()` as a POST callback
    -   `/api/comments/:pizzaId/:commentId` with `removeComment` method as a DELETE callback.
-   export routes to `/routes/api/index.js` with prefix of `/comments`

I want to see comments in JSON objects, not just MongoDB comment `_id`.

-   chain `.populate()` method onto the query
-   minus sign in `-__v` tells Mongo we don't want it returned
-   Mongoose `sort()` method to return newest pizzas first: `.sort({ _id: -1 })` for descending order

### 18.2.7: Integrate with the Front End and Refactor

- in `public/assets/js/pizza-list.js`
  - add function to get all pizza data and transform into JSON. 
  - call this function on bottom

**getter** is a special type of function that takes the stored data to be retrieved and modify/format it upon return. "Middleware for data."

use provided timestamp formatter as getter. 
- add the key `get` to the field in the schema. 
- tell Mongoose model to use all getter functions in model options `toJSON: {`...
- don't forget to import the function into the schema at the top

### 18.2.8: Reflection

-   Create a Comment model using Mongoose.
-   Associate the Pizza and Comment models.
-   Create CRUD functionality for creating a pizza.
-   Get all pizza data from the API to display in the application’s front end.

## Lesson 3: Set Up Replies

### 18.3.1: Introduction

### 18.3.2: Preview

1.  Set up front-end comment functionality. 
1.  Create a Reply schema for comments.
1.  Update the Comment controller and routes. 
1.  Integrate reply functionality with the front end

 Replies to a comment aren’t their own model, so we will create and remove them through their respective comments.

because we recently finished up the functionality for comments, we should complete all that on the front end so we can see what’s needed for a comment’s replies.

updating the Comment controller is going to lead right into creating routes. Neither of those tasks requires a lot of steps, so it’s best to keep them together.

Replies will be nested documents for a comment, so we need to add more comment-oriented functionality for adding and removing replies from a comment.

### 18.3.3: Set Up Front-End Comment Functionality

### 18.3.4: Create the Comment Reply Schema

### 18.3.5: Update the Comment Controller and Routes

### 18.3.6: Integrate Reply Functionality with the Front End

### 18.3.7: Reflection

## Lesson 4: Add Offline Persistence with IndexedDB

### 18.4.1: Introduction

### 18.4.2: Preview

### 18.4.3: Introducing IndexedDB

### 18.4.4: Create the IndexedDB Connection

### 18.4.5: Save Pizza Data to IndexedDB

### 18.4.6: Test the IndexedDB Functionality

### 18.4.7: Upload the Pizza Data

### 18.4.8: Reflection

## Lesson 5: Add Mongoose Validation

### 18.5.1: Introduction

### 18.5.2: Preview

### 18.5.3: Add Validation to the Pizza Model

### 18.5.4: Add Validation to the Comment Model and Reply Schema

### 18.5.5: Deploy to Heroku

### 18.5.6: Reflection Weekly Challenge 18. NoSQL Challenge: Social Network API

## Think Like a Developer

### 18. Reflection and Retrieval

### 18. Career Connection

### 18. Dessert Menu
