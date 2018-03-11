# README

## How to run the dev server locally

### Start an local instance of MongoDB

Firstly, make sure you have MongoDB installed locally, and start a local instance.

On Mac:

```shell
mongod --dbPath /data/mongodb
```

Note that the path to `mongod.exe` and the path to your data folder could be different on your system.

On Windows:

```shell
"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --dbpath C:\mongodb\data
```

Depending on the security level of your system, Windows may pop up a Security Alert dialog box about blocking “some features” of C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe from communicating on networks. All users should select Private Networks, such as my home or work network and click Allow access. 

### Start the server

Before you start the server, you need to setup the environment variables for running the server locally. A sample configuration is provided in `.env.example`. You can use it by copy it to `.env` file.

```shell
cp .env.example .env
yarn start
```

## How to run all test cases

```shell
yarn test
```

## How to deploy to Heroku

TODO