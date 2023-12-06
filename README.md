To setup the project, Firstly clone the project
```shell
git clone https://github.com/ishan-18/SB_Assignment
```

Then cd into that folder
```shell
cd [folder_name]
```

Then you have to run the following command:
```shell
npm install .
```

The above command will install the dependencies.

Now you have to setup a .env file into the src/config directory. You can cd into config, by typing the following command
```shell
cd config
```

You can create a .env file using touch command
```shell
touch .env
```

Now refer the .env.example file, and fill the fields according to that
```shell
PORT=4000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/sbdatabase
JWT_SECRET_KEY=dhajsdhyuewuhfkdsnknvjkfnvjkfjfhjkhfjahd
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_EMAIL=
SMTP_PASSWORD=
FROM_EMAIL=noreply@dev.io
FROM_NAME=UnknownDeveloper
```

To get the value of env variables like `SMTP_EMAIL`, `SMTP_PASSWORD`, go to
```shell
https://mailtrap.io/
```
Setup your account here, its completely free. After setting the account, Go to
Email Testing -> Inboxes -> My Inbox -> Show Credentials
![ss](Screenshot from 2023-12-06 08-55-24.png)

SMTP_EMAIL must be your username and SMTP_PASSWORD must be your password.

Now If you are on Windows, you have to change a package.json a little bit, I am using Linux (UBUNTU). For Windows, do 
```shell
"scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "start": "set NODE_ENV=production && node dist/src/server.js", // its a slight change here
    "test": "jest",
    "build": "tsc"
},
```

Now If you want to run the server in Development mode, you have to run the following command.
```shell
npm run dev
```

OR

If you want to run the server in Production mode, you have to run the following command.
```shell
npm run start
```

If you want to run the tests you can run, 
```shell
npm run test
```

API Documentation
1) Register User:- http://127.0.0.1:4000/api/v1/register
cURL:- 
```shell
curl --location --request POST 'http://127.0.0.1:4000/api/v1/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Alice Smith",
    "email": "alice@example23.com",
    "password": "alice@12345",
    "phone": {
        "country_isd_code": "+91",
        "number": "9799999893"
    },
    "address": {
        "street": "string",
        "city": "string",
        "state": "string",
        "postalCode": "string",
        "country": "string"
    },
    "role": "ADMIN"
}'
```
Expected Response:
```shell
{
    "success": true,
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJiNDczMjc3ZS02ZWM2LTQ1MGEtOTg3OC0zMTIxZjFjMDNlMGMiLCJlbWFpbCI6ImFsaWNlQGV4YW1wbGUyMy5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MDE4MzQ4OTEsImV4cCI6MTcwMTgzODQ5MX0.-jj94kug1ddRef9bw5NjEcmuuNOuYCiQp7IxFL1sYwo"
}
```

2) Login User:- http://127.0.0.1:4000/api/v1/login
cURL:-
```shell
curl --location --request POST 'http://127.0.0.1:4000/api/v1/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "alice@example20.com",
    "password": "alice@12345"
}'
```
Expected Response:
```shell
{
    "success": true,
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxOWJkZDA0OS04Njg0LTRhN2UtOWQ3Zi1lNzhkNDlkNDdmNGEiLCJlbWFpbCI6ImFsaWNlQGV4YW1wbGUyMC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MDE4MzUwMDUsImV4cCI6MTcwMTgzODYwNX0.Fg4fWJBOGn-coESMbfxZNEF5ezy1If56eezDS2l1GkA"
}
```

3) Forgot Password:- http://127.0.0.1:4000/api/v1/forgotpassword
cURL:
```shell
curl --location --request POST 'http://127.0.0.1:4000/api/v1/forgotpassword' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "pilitix576@gyxmz.com"
}'
```
Expected Response:-
```shell
{
    "success": true,
    "data": "Email sent"
}
```

On Your Email you will recieve the `Reset Password Link`, Copy that and paste it in postman
4) Reset Password:- http://127.0.0.1:4000/api/v1/resetpassword/904d1bf56b02104ca5f0e22135bf19f7f3115aef
cURL:
```shell
curl --location --request PUT 'http://127.0.0.1:4000/api/v1/resetpassword/904d1bf56b02104ca5f0e22135bf19f7f3115aef' \
--header 'Content-Type: application/json' \
--data-raw '{
    "password": "demo@1234"
}'
```shell
Expected Response:-
{
    "status": true,
    "data": {
        "_id": "7c38364c-2eca-4ba0-9922-f557ece84ccd",
        "name": "Alice Smith",
        "email": "pilitix576@gyxmz.com",
        "password": "$2b$10$lFNGUjUV9L9EoZy52rMbK./UBHStT72o1op4PccRd5Nh6ht6a9u/.",
        "phone": {
            "country_isd_code": "+91",
            "number": "9999999995",
            "_id": "656f6895bc19454f49a5fc93"
        },
        "address": {
            "street": "string",
            "city": "string",
            "state": "string",
            "postalCode": "string",
            "country": "string",
            "_id": "656f6895bc19454f49a5fc94"
        },
        "role": "ADMIN",
        "createdAt": "2023-12-05T18:14:45.827Z",
        "updatedAt": "2023-12-06T04:12:09.209Z",
        "__v": 0,
        "reset_password_expire": "2023-12-06T04:22:09.203Z",
        "reset_password_token": "81118aa05d060262a7eceacad3536bc2d20c5b0a996b7b4d3954bfa00ee2d434"
    }
}
```

5) Get User Details By Id:- http://127.0.0.1:4000/api/v1/me
cURL:-
```shell
curl --location --request GET 'http://127.0.0.1:4000/api/v1/me' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJmMjUyOGE5ZC1iMzdkLTQ4NWYtYjcyMS05YjhhMmFkZjIzYTIiLCJlbWFpbCI6ImFsaWNlQGV4YW1wbGUyLmNvbSIsInJvbGUiOiJOT1JNQUxVU0VSIiwiaWF0IjoxNzAxODE0ODA3LCJleHAiOjE3MDE4MTg0MDd9.uBoH7NOYOdKDWje_8gwnpzE6hPS2vMLj3OMMAUxe_Xg'
```
Expected Response:-
```shell
{
    "success": true,
    "data": {
        "_id": "48a9412c-7c4f-4c0d-addc-b9c24805c3ff",
        "name": "Alice Smith",
        "email": "alice@example1.com",
        "password": "$2b$10$kCdq7mIaunZAtB1sPRxK4OPWmfPvBpXF93mWLvnqZsXnk5rNCHjvW",
        "phone": {
            "country_isd_code": "+91",
            "number": "9999999998",
            "_id": "656f4922372d95e6190c49a9"
        },
        "address": {
            "street": "string",
            "city": "string",
            "state": "string",
            "postalCode": "string",
            "country": "string",
            "_id": "656f4922372d95e6190c49aa"
        },
        "role": "NORMALUSER",
        "createdAt": "2023-12-05T16:00:34.805Z",
        "updatedAt": "2023-12-05T16:00:34.805Z",
        "__v": 0
    }
}
```

6) Admin Route: Get All Users:- http://127.0.0.1:4000/api/v1/getusers
cURL: 
```shell
curl --location --request GET 'http://127.0.0.1:4000/api/v1/getusers' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0OGE5NDEyYy03YzRmLTRjMGQtYWRkYy1iOWMyNDgwNWMzZmYiLCJlbWFpbCI6ImFsaWNlQGV4YW1wbGUxLmNvbSIsInJvbGUiOiJOT1JNQUxVU0VSIiwiaWF0IjoxNzAxODE0ODMyLCJleHAiOjE3MDE4MTg0MzJ9.O8L2tat_4XVPiwJ0ahPNIi18qvPtOyQ0Pj5s6d6NzZY'
```
Expected Response:-
```shell
{
    "success": true,
    "data": [
        {
            "_id": "624a9aa2-09f2-42e8-a395-4b5f03c1d78a",
            "name": "Alice Smith",
            "email": "alice@example.com",
            "password": "$2b$10$8QYk1s1JqX2s9mR.otvCl.pcpsK7yCTTFBWpSH2j4soThZDBkx/4y",
            "phone": {
                "country_isd_code": "+91",
                "number": "9999999999",
                "_id": "656f421cbed208409cfe88a7"
            },
            "address": {
                "street": "string",
                "city": "string",
                "state": "string",
                "postalCode": "string",
                "country": "string",
                "_id": "656f421cbed208409cfe88a8"
            },
            "role": "NORMALUSER",
            "createdAt": "2023-12-05T15:30:36.524Z",
            "updatedAt": "2023-12-05T15:30:36.524Z",
            "__v": 0
        },
        {
            "_id": "48a9412c-7c4f-4c0d-addc-b9c24805c3ff",
            "name": "Alice Smith",
            "email": "alice@example1.com",
            "password": "$2b$10$kCdq7mIaunZAtB1sPRxK4OPWmfPvBpXF93mWLvnqZsXnk5rNCHjvW",
            "phone": {
                "country_isd_code": "+91",
                "number": "9999999998",
                "_id": "656f4922372d95e6190c49a9"
            },
            "address": {
                "street": "string",
                "city": "string",
                "state": "string",
                "postalCode": "string",
                "country": "string",
                "_id": "656f4922372d95e6190c49aa"
            },
            "role": "NORMALUSER",
            "createdAt": "2023-12-05T16:00:34.805Z",
            "updatedAt": "2023-12-05T16:00:34.805Z",
            "__v": 0
        },
        {
            "_id": "f2528a9d-b37d-485f-b721-9b8a2adf23a2",
            "name": "Alice Smith",
            "email": "alice@example2.com",
            "password": "$2b$10$vISzWfmHro3qQVUv7h0Zd.Vrp2J2oQMH9cv8X4T10LKNWuWxUsIEm",
            "phone": {
                "country_isd_code": "+91",
                "number": "9999999997",
                "_id": "656f4a4163381ebd797c1455"
            },
            "address": {
                "street": "string",
                "city": "string",
                "state": "string",
                "postalCode": "string",
                "country": "string",
                "_id": "656f4a4163381ebd797c1456"
            },
            "role": "NORMALUSER",
            "createdAt": "2023-12-05T16:05:21.543Z",
            "updatedAt": "2023-12-05T16:05:21.543Z",
            "__v": 0
        },
        {
            "_id": "472cbf40-b1e3-409d-add1-7e3a1cc20e4c",
            "name": "Alice Smith",
            "email": "alice@example3.com",
            "password": "$2b$10$3geyXwEeN.yKoR0cDOuZsuYZ5Vs63TsC607tGXv8bKBqPze4nVBkq",
            "phone": {
                "country_isd_code": "+91",
                "number": "9999999996",
                "_id": "656f547c67dbfb1e85074b32"
            },
            "address": {
                "street": "string",
                "city": "string",
                "state": "string",
                "postalCode": "string",
                "country": "string",
                "_id": "656f547c67dbfb1e85074b33"
            },
            "role": "ADMIN",
            "createdAt": "2023-12-05T16:49:00.815Z",
            "updatedAt": "2023-12-05T16:49:00.815Z",
            "__v": 0
        }
    ]
}
```

7) Get All Posts:- http://127.0.0.1:4000/api/v1/posts/all
cURL:
```shell
curl --location --request GET 'http://127.0.0.1:4000/api/v1/posts/all' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3YzM4MzY0Yy0yZWNhLTRiYTAtOTkyMi1mNTU3ZWNlODRjY2QiLCJlbWFpbCI6InBpbGl0aXg1NzZAZ3l4bXouY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzAxODM1OTcyLCJleHAiOjE3MDE4Mzk1NzJ9.bmJc3otHwM9-VeC9ls-SLZymhjkX0iW9JdRM_YauyDE'
```
Expected Response:-
```shell
{
    "success": true,
    "data": [
        {
            "_id": "73ec26e2-bdba-477c-b93e-490028d0e2a4",
            "title": "Title 1",
            "desc": "Desc 1",
            "is_offensive": false,
            "report": false,
            "user": {
                "_id": "7c38364c-2eca-4ba0-9922-f557ece84ccd",
                "name": "Alice Smith",
                "email": "pilitix576@gyxmz.com"
            },
            "createdAt": "2023-12-06T04:19:45.545Z",
            "updatedAt": "2023-12-06T04:19:45.545Z",
            "__v": 0
        }
    ]
}
```

8) Create a Post:- http://127.0.0.1:4000/api/v1/post
cURL:
```shell
curl --location --request POST 'http://127.0.0.1:4000/api/v1/post' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3YzM4MzY0Yy0yZWNhLTRiYTAtOTkyMi1mNTU3ZWNlODRjY2QiLCJlbWFpbCI6InBpbGl0aXg1NzZAZ3l4bXouY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzAxODM1OTcyLCJleHAiOjE3MDE4Mzk1NzJ9.bmJc3otHwM9-VeC9ls-SLZymhjkX0iW9JdRM_YauyDE' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Title 1",
    "desc": "Desc 1"
}'
```
Expected Response:
```shell
{
    "success": true,
    "data": {
        "_id": "73ec26e2-bdba-477c-b93e-490028d0e2a4",
        "title": "Title 1",
        "desc": "Desc 1",
        "is_offensive": false,
        "report": false,
        "user": "7c38364c-2eca-4ba0-9922-f557ece84ccd",
        "createdAt": "2023-12-06T04:19:45.545Z",
        "updatedAt": "2023-12-06T04:19:45.545Z",
        "__v": 0
    }
}
```

9) Update Post Report:- http://127.0.0.1:4000/api/v1/post/:postId/report
cURL:
```shell
curl --location --request PUT 'http://127.0.0.1:4000/api/v1/post/73ec26e2-bdba-477c-b93e-490028d0e2a4/report' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxOWJkZDA0OS04Njg0LTRhN2UtOWQ3Zi1lNzhkNDlkNDdmNGEiLCJlbWFpbCI6ImFsaWNlQGV4YW1wbGUyMC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MDE4MTM4MTUsImV4cCI6MTcwMTgxNzQxNX0.gplJcvRiTX65dCiVWF36rhtvyNHunmhxad3B_eoSkeg' \
--header 'Content-Type: application/json' \
--data-raw '{
    "report": true
}'
```
Expected Response:
```shell
{
    "success": true,
    "data": {
        "_id": "73ec26e2-bdba-477c-b93e-490028d0e2a4",
        "title": "Title 1",
        "desc": "Desc 1",
        "is_offensive": true,
        "report": true,
        "user": {
            "_id": "7c38364c-2eca-4ba0-9922-f557ece84ccd",
            "name": "Alice Smith",
            "email": "pilitix576@gyxmz.com"
        },
        "createdAt": "2023-12-06T04:19:45.545Z",
        "updatedAt": "2023-12-06T04:23:41.869Z",
        "__v": 0
    }
}
```

10) Admin Route: Delete Post only if it is reported and isOffensive is true:- http://127.0.0.1:4000/api/v1/post/73ec26e2-bdba-477c-b93e-490028d0e2a4
cURL:
```shell
curl --location --request DELETE 'http://127.0.0.1:4000/api/v1/post/73ec26e2-bdba-477c-b93e-490028d0e2a4/' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxOWJkZDA0OS04Njg0LTRhN2UtOWQ3Zi1lNzhkNDlkNDdmNGEiLCJlbWFpbCI6ImFsaWNlQGV4YW1wbGUyMC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MDE4MTQ4NjgsImV4cCI6MTcwMTgxODQ2OH0.59nBv0iH29PtDCNRjbdVWtwHaxlW5pG1tP_LCo-uGa0'
```
Expected Output:
```shell
{
    "success": true,
    "msg": "Post deleted successfully"
}
```





