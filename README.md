
# A Complete Backend functional Server with MERN Auth.
A REST API Service on a non-relational Database (MongoDB) with protected endpoints.
This can be used with any JavaScript frontend framework.

## Tools:
* [Express.js](https://expressjs.com/en/guide/routing.html)
* [Node.js](https://nodejs.org/en/about/)
* [mongoose (mongoDB)](https://mongoosejs.com/)
* [jsonwebtoken](https://jwt.io/introduction)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [cryptojs](https://www.npmjs.com/package/crypto-js)
* [express-async-handler](https://www.npmjs.com/package/express-async-handler)


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

```
e.g:
* Sending...
**Content-Type:* application/json
**Authorization:* Bearer_token XXXXXX passed as to the headers


{
    "text_title": "My first goal"
    "text": "This is the body of the text/goal"
}

* Received (data)

{
    "_id": "63365b163e6bcc914c46072d",
    "user": "633659bc009ec83f9a790ce8",
    "text_title": "My first goal"
    "text": "This is the body of the text/goal",
    "createdAt": "2022-09-30T02:57:26.864Z",
    "updatedAt": "2022-09-30T02:59:47.981Z",
    "__v": 0
}

```

**Data Description:**

* _id: goal id
* user: id of the user that created the goal (owner)
* text_title: Text/Goal Title
* text: goal content/text
* createdAt: Date the goal was created
* updatedAt: Date the goal was last updated



* Get goals (Private: Having authenticated, User can get all their goals with this endpoint)
* GET: http://localhost:5001/api/goals

```
e.g:
**Response:*

[
    {
        "_id": "63365b0f3e6bcc914c46072a",
        "user": "633659bc009ec83f9a790ce8",
        "text_title": "My first goal",
        "text": "This is the body of the text/goal"
        "createdAt": "2022-09-30T02:57:19.602Z",
        "updatedAt": "2022-09-30T02:57:19.602Z",
        "__v": 0
    },
    {
        "_id": "63365b163e6bcc914c46072d",
        "user": "633659bc009ec83f9a790ce8",
        "text_title": "My Second goal",
        "text": "This the second goal's body text",
        "createdAt": "2022-09-30T02:57:26.864Z",
        "updatedAt": "2022-09-30T02:59:47.981Z",
        "__v": 0
    }
]

```

* Get goals by :id (Private: Only an authenticated user can also do this)
* GET: http://localhost:5001/api/goals/63365b0f3e6bcc914c46072a

```
e.g:
**Response:*

{
        "_id": "63365b0f3e6bcc914c46072a",
        "user": "633659bc009ec83f9a790ce8",
        "text_title": "My first goal",
        "text": "This is the body of the text/goal",
        "createdAt": "2022-09-30T02:57:19.602Z",
        "updatedAt": "2022-09-30T02:57:19.602Z",
        "__v": 0
    },

```

* Update goals by :id (Private: Only an authenticated user can also do this)
* PUT: http://localhost:5001/api/goals/63365b163e6bcc914c46072d

```
e.g:
* Sending...
**Content-Type:* application/json
**Authorization:* Bearer_token XXXXXX passed as to the headers


{
    "text_title": "My Second goal",
    "text": "My Second goal now updated",
}

* Received (data)

{
  "_id": "63365b163e6bcc914c46072d",
        "user": "633659bc009ec83f9a790ce8",
        "text_title": "My Second goal",
        "text": "My Second goal now updated",
        "createdAt": "2022-09-30T02:57:26.864Z",
        "updatedAt": "2022-09-30T02:59:47.981Z",
        "__v": 0
}

```

**Data Description:**

* _id: goal id
* user: id of the user that created the goal (owner)
* text_title: Text/Goal Title
* text: updated goal content/text
* createdAt: Date the goal was created
* updatedAt: Date the goal was last updated



* Delete goals by :id (Private: Only an authenticated user can also do this)
* DELETE: http://localhost:5001/api/goals/63365b163e6bcc914c46072d



### USERS
* Register User (Public: a user must be register before they can be authenticated and they cannot be able to get authentication token if they are not registered)

* POST: http://localhost:5001/api/users/register

```
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

```

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

```
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

```

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
**Authorization:* Bearer_token XXXXXX as to the headers

```
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

```

**Data Description:**

* _id: user id
* name: username
* email: user's email
* phone: user's phone number
* token: user's Bearer Token
* privateKey: user's private key
* publicKey: user's public key




* Get All Users (Public: But this can be adjusted and allow only Admin to see it)

GET: http://localhost:5001/api/users/all

```
e.g:
* Response...
* No Token needed (But can be adjusted to allow only admin to access this full record) 

[
    {
        "_id": "647d4c3b000362a1a6336cee",
        "name": "Christotle Agholor",
        "email": "abc@gmail.com",
        "phone": "09011100022",
        "password": "$2a$10$JX73Ui7Ma4gtfSV.L2I8P.gSbiBk/cIzRV7CcELDQz8kzL9K31mr6",
        "privateKey": "pv_i8EqSgSfG9IcbmPHaErVXNzTy",
        "publicKey": "pk_G1xUAWBfIDHPYyWTpSwZq5Psq",
        "createdAt": "2023-06-05T02:45:15.569Z",
        "updatedAt": "2023-06-05T02:45:15.569Z",
        "__v": 0
    },
    {
        "_id": "647d4c89000362a1a6336cf1",
        "name": "Rose John",
        "email": "xyz@gmail.com",
        "phone": "07011100022",
        "password": "$2a$10$VeBOFOusikI4I8YC3J.yHO4vgQ2oVH/Da3R1OIL6NsoSIh0De4wnu",
        "privateKey": "pv_MfW2Nezb6a76GsuD9ydfBPt8x",
        "publicKey": "pk_7rbaronhq0YlmuH7kcCJtV8h6",
        "createdAt": "2023-06-05T02:46:33.540Z",
        "updatedAt": "2023-06-05T02:46:33.540Z",
        "__v": 0
    },
    {
        "_id": "647d4ca7000362a1a6336cf4",
        "name": "Kate Ubaka",
        "email": "kateuba@gmail.com",
        "phone": "01034100022",
        "password": "$2a$10$yKNNM8jWYh0iLXdmepeU1.6Q/0ZdJ6GLFyFSeOEwUIftcjcHf800y",
        "privateKey": "pv_QUtf3xP3vTIFZ69N3RMb8xVbw",
        "publicKey": "pk_iM0BvWQuhDbdvDrCNP6OspbNT",
        "createdAt": "2023-06-05T02:47:03.704Z",
        "updatedAt": "2023-06-05T02:47:03.704Z",
        "__v": 0
    },
    {
        "_id": "647d7606ac03c40722938e0d",
        "name": "Christian Amah",
        "email": "123@gmail.com",
        "phone": "09012345678",
        "password": "$2a$10$ixJmNtPgMnWJf.zAD5v8aejWjXFu8sVG8Ci0JP5Zp59HIN.jFjxm6",
        "privateKey": "pv_pJyEOF856bj053PFCiQnOvc28",
        "publicKey": "pk_y1pinbifPVNitL5FDkEV3ks85",
        "createdAt": "2023-06-05T05:43:34.332Z",
        "updatedAt": "2023-06-05T05:43:34.332Z",
        "__v": 0
    },
    {
        "_id": "647d7650ac03c40722938e10",
        "name": "James Fubara",
        "email": "uba@gmail.com",
        "phone": "020145645678",
        "password": "$2a$10$Nugq77HySeqr.gCwtts73u9Sdx8dMoiLIzzdMnhMZFZDZnEwB63wG",
        "privateKey": "pv_4zpS2tRESSqPiVqsYhG1YpzJL",
        "publicKey": "pk_mw3Bs5UlZFbPni1ahXqoiXMxK",
        "createdAt": "2023-06-05T05:44:48.157Z",
        "updatedAt": "2023-06-05T05:44:48.157Z",
        "__v": 0
    },
    {
        "_id": "647d76ebac03c40722938e13",
        "name": "Rosy Manukwor",
        "email": "sory@gmail.com",
        "phone": "020145645678",
        "password": "$2a$10$CfZUNLAr4cxcKsPNEzKUP.EdL/pEpU9vR2oitS.ItGTnq8GvszG/q",
        "privateKey": "pv_lpbzTqqIojB7aIHCQwMcWLW0o",
        "publicKey": "pk_PnkU4UfLg77s5O3PGn9700Nzy",
        "createdAt": "2023-06-05T05:47:23.352Z",
        "updatedAt": "2023-06-05T05:47:23.352Z",
        "__v": 0
    },
    {
        "_id": "647d7741ac03c40722938e16",
        "name": "Johna Dapson",
        "email": "josh@gmail.com",
        "phone": "030145645678",
        "password": "$2a$10$Fgomc1zlGZ6MeXx7o5PW2.tb73DEJW1i7H7yozSQCssoaTz8X/VGi",
        "privateKey": "pv_TQTahiB4120HrpleqrpWeMyTp",
        "publicKey": "pk_algWaapNZ2lGTj6OtFmDCbJlg",
        "createdAt": "2023-06-05T05:48:49.048Z",
        "updatedAt": "2023-06-05T05:48:49.048Z",
        "__v": 0
    },
    {
        "_id": "647e03d1ac03c40722938e19",
        "name": "Peter Akpan",
        "email": "petertak@gmail.com",
        "phone": "030145645678",
        "password": "$2a$10$uRC8vaoojq6VJyhyPc1AjuF1f92gH7cUIUEig/gqD3092XXKBi5jW",
        "privateKey": "pv_qfF10jb69UysxUTErgiSXljOq",
        "publicKey": "pk_U7M7ItSLDfqHTx0e3iL0yGSzW",
        "createdAt": "2023-06-05T15:48:33.711Z",
        "updatedAt": "2023-06-05T15:48:33.711Z",
        "__v": 0
    },
    {
        "_id": "647e138eac03c40722938e1d",
        "name": "Uche Oladi",
        "email": "ucheo@gmail.com",
        "phone": "060145645678",
        "password": "$2a$10$tbkru8DfdtSrGPJnHjer3e347JXQaWrzT2bDX.nd/YTN1LvJoPqg.",
        "privateKey": "pv_RL16nKuwcgVl2EQPwBoXs6fh2",
        "publicKey": "pk_lK7fTT95tAzj8fpt79M12yK6A",
        "createdAt": "2023-06-05T16:55:42.112Z",
        "updatedAt": "2023-06-05T16:55:42.112Z",
        "__v": 0
    },
    {
        "_id": "647e2113ac03c40722938e21",
        "name": "Blessing Ogenika",
        "email": "blessingg@gmail.com",
        "phone": "060145645678",
        "password": "$2a$10$2y5.ml3bOzm2L7LwXQoDF.jvmqRvmad7jl4gD2NVIyq2kDnyk2O0S",
        "privateKey": "pv_iml6d5HZ8actNQ7P7YeIiJQQQ",
        "publicKey": "pk_bG3hXJ2uKpHfLPuRnZzrrnwn5",
        "createdAt": "2023-06-05T17:53:23.833Z",
        "updatedAt": "2023-06-05T17:53:23.833Z",
        "__v": 0
    },
    {
        "_id": "647e9ff8ac03c40722938e27",
        "name": "Chika Animali",
        "email": "chigirl@gmail.com",
        "phone": "060145645678",
        "password": "$2a$10$1dMj0s/6qiVpSXkZG2e27OXBPxN3.t3vb96YIktOoM9wV/coqRzZW",
        "privateKey": "pv_YNVoM5Qvox3Wuq0T82jK96YFu",
        "publicKey": "pk_4PBoGbY25yhxw424GVYWJDHdJ",
        "createdAt": "2023-06-06T02:54:48.094Z",
        "updatedAt": "2023-06-06T02:54:48.094Z",
        "__v": 0
    },
    {
        "_id": "647ea047ac03c40722938e2c",
        "name": "Anamali Chika",
        "email": "anychigirl@gmail.com",
        "phone": "060145645678",
        "password": "$2a$10$NReRlL3nQN93I1Fkhe4KIuyBJdEB.tMtVvN2SLR35pG/IqtAfee0K",
        "privateKey": "pv_0tRV8E5URw7PuOIahUOjXnF5p",
        "publicKey": "pk_eiS7jczFwphdRIt5EcVSe6xKt",
        "createdAt": "2023-06-06T02:56:07.346Z",
        "updatedAt": "2023-06-06T02:56:07.346Z",
        "__v": 0
    },
    {
        "_id": "647ea2acac03c40722938e2f",
        "name": "Developer Christotle",
        "email": "devchris@gmail.com",
        "phone": "060145645678",
        "password": "$2a$10$m4/v8MUHvlhwqdy7cXHpHenrMaT9EvQlsmT6uN32B.PYud/fqIGIO",
        "privateKey": "pv_r3wcsxZdxf0y2YzT30kWzVlKR",
        "publicKey": "pk_NmWVmpo1eUXC0lm2EJD2i2BcO",
        "createdAt": "2023-06-06T03:06:20.884Z",
        "updatedAt": "2023-06-06T03:06:20.884Z",
        "__v": 0
    }
]
```


[Author: Christotle Agholor](https://github.com/johnchristotle)