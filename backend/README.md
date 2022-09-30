
# A Complete Backend functional Server with MERN Auth.
A REST API Service on a non-relational Database (MongoDB) with protected endpoints.
This can be used with any JavaScript frontend framework.

## Script/Frontend
```
"scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js",
    "client": "npm start --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"
  },
```
At the package.json file, a script has been arranged to run the program as shown above: 
*It is now adviceable to name your frontend folder as 'frontend' to enable this script works well else update the script as approprate. 

**Description:*

* "start": "run only the backend server and restart everytime you make changes",

* "server": "run only the backend server with automatic restart everytime you make changes. This is possible because of ```nodemon``` dependancy at work",

* "client": "run frontend alone",

* "dev": "automatically run both frontend and backend at once by the help of ```conccurrently``` dependancy",

* "heroku-postbuild": "command to prepare the programe for deployment to heroku"



## Endpoints
Using Postman, you can access this endpoints.
* NOTE: Bearer Token MUST be pass to the Heasders for authorization and access.
See Examples bellow the Goals/Users note:


### GOALS
* Create goals (Private: Only an authenticated user can create goal)
* POST: http://localhost:5001/api/goals

e.g:
* Sending...
**Content-Type:* application/json
**Token:* Bearer Token passed as to the headers


{
    "text": "My first goal"
}

* Received (data)

{
    "_id": "63365b163e6bcc914c46072d",
    "user": "633659bc009ec83f9a790ce8",
    "text": "My first goal",
    "createdAt": "2022-09-30T02:57:26.864Z",
    "updatedAt": "2022-09-30T02:59:47.981Z",
    "__v": 0
}

**Data Description:**

* _id: goal id
* user: id of the user that created the goal (owner)
* text: goal content/text
* createdAt: Date the goal was created
* updatedAt: Date the goal was last updated



* Get goals (Private: Having authenticated, User can get all their goals with this endpoint)
* GET: http://localhost:5001/api/goals

e.g:
**Response:*

[
    {
        "_id": "63365b0f3e6bcc914c46072a",
        "user": "633659bc009ec83f9a790ce8",
        "text": "My first goal",
        "createdAt": "2022-09-30T02:57:19.602Z",
        "updatedAt": "2022-09-30T02:57:19.602Z",
        "__v": 0
    },
    {
        "_id": "63365b163e6bcc914c46072d",
        "user": "633659bc009ec83f9a790ce8",
        "text": "My Second goal",
        "createdAt": "2022-09-30T02:57:26.864Z",
        "updatedAt": "2022-09-30T02:59:47.981Z",
        "__v": 0
    }
]


* Get goals by :id (Private: Only an authenticated user can also do this)
* GET: http://localhost:5001/api/goals/63365b0f3e6bcc914c46072a

e.g:
**Response:*

{
        "_id": "63365b0f3e6bcc914c46072a",
        "user": "633659bc009ec83f9a790ce8",
        "text": "My first goal",
        "createdAt": "2022-09-30T02:57:19.602Z",
        "updatedAt": "2022-09-30T02:57:19.602Z",
        "__v": 0
    },


* Update goals by :id (Private: Only an authenticated user can also do this)
* PUT: http://localhost:5001/api/goals/63365b163e6bcc914c46072d

e.g:
* Sending...
**Content-Type:* application/json
**Token:* Bearer Token passed as to the headers


{
    "text": "My first goal now updated"
}

* Received (data)

{
    "_id": "63365b163e6bcc914c46072d",
    "user": "633659bc009ec83f9a790ce8",
    "text": "My first goal now updated",
    "createdAt": "2022-09-30T02:57:26.864Z",
    "updatedAt": "2022-09-30T02:59:47.981Z",
    "__v": 0
}

**Data Description:**

* _id: goal id
* user: id of the user that created the goal (owner)
* text: updated goal content/text
* createdAt: Date the goal was created
* updatedAt: Date the goal was last updated



* Delete goals by :id (Private: Only an authenticated user can also do this)
* DELETE: http://localhost:5001/api/goals/63365b163e6bcc914c46072d



### USERS
* Register User (Public: a user must be register before they can be authenticated and they cannot be able to get authentication token if they are not registered)

* POST: http://localhost:5001/api/users/register

e.g:
* Sending...
**Content-Type:* application/json
* No Token needed (Bearer Token, privateKey and publicKey will be generated when a user's registraton is successfull (status: 200). 


{
    "name": "Christotle Agholor",
    "email": "abc@gmail.com",
    "phone": "09011100022",
    "password": "1234567"
}

* Received (data)

{
    "_id": "633659bc009ec83f9a790ce8",
    "name": "Christotle Agholor",
    "email": "abc@gmail.com",
    "phone": "09011100022",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzY1OWJjMDA5ZWM4M2Y5YTc5MGNlOCIsImlhdCI6MTY2NDUwNjMwMCwiZXhwIjoxNjY3MDk4MzAwfQ.yugYYzG2juXy7TGZ2hyoXmDbwTE2LOUmMiDqfpu7mTg",
    "privateKey": "pv_6VEpXP3to4qQFLjfWZZcgDZ1R",
    "publicKey": "pk_e3GBOb9SUIxqYpabLS5fK1tdb"
}

**Data Description:**

* _id: user id
* name: username
* email: user's email
* phone: user's phone number
* token: user's Bearer Token
* privateKey: user's private key
* publicKey: user's public key



* Login User (Public: a user must be loged-in before facing authentication)

* POST: http://localhost:5001/api/users/login

e.g:
* Sending...
**Content-Type:* application/json
* No Token needed (password and email will be use to authenticate login access) 


{
    "email": "abc@gmail.com",
    "password": "1234567"
}

* Received (data)

{
    "_id": "633659bc009ec83f9a790ce8",
    "name": "Christotle Agholor",
    "email": "abc@gmail.com",
    "phone": "09011100022",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzY1OWJjMDA5ZWM4M2Y5YTc5MGNlOCIsImlhdCI6MTY2NDUwNjMwMCwiZXhwIjoxNjY3MDk4MzAwfQ.yugYYzG2juXy7TGZ2hyoXmDbwTE2LOUmMiDqfpu7mTg",
    "privateKey": "pv_6VEpXP3to4qQFLjfWZZcgDZ1R",
    "publicKey": "pk_e3GBOb9SUIxqYpabLS5fK1tdb"
}

**Data Description:**

* _id: user id
* name: username
* email: user's email
* phone: user's phone number
* token: user's Bearer Token
* privateKey: user's private key
* publicKey: user's public key



* Get Current User (Private: Only an authenticated user can also do this)

GET: http://localhost:5001/api/users/me
**Token:* Bearer Token passed as to the headers

e.g:
**Response:*

{
    "_id": "633659bc009ec83f9a790ce8",
    "name": "Christotle Agholor",
    "email": "abc@gmail.com",
    "phone": "09011100022",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzY1OWJjMDA5ZWM4M2Y5YTc5MGNlOCIsImlhdCI6MTY2NDUwNjMwMCwiZXhwIjoxNjY3MDk4MzAwfQ.yugYYzG2juXy7TGZ2hyoXmDbwTE2LOUmMiDqfpu7mTg",
    "privateKey": "pv_6VEpXP3to4qQFLjfWZZcgDZ1R",
    "publicKey": "pk_e3GBOb9SUIxqYpabLS5fK1tdb"
}


**Data Description:**

* _id: user id
* name: username
* email: user's email
* phone: user's phone number
* token: user's Bearer Token
* privateKey: user's private key
* publicKey: user's public key



[Author: Christotle Agholor](https://github.com/johnchristotle)