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






