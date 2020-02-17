# AYLIEN

- JS-SDK: https://docs.aylien.com/textapi/sdks/#node-js-sdk
- On src/server/

```bash
yarn add aylien_textapi
```

- Install dotenv

```bash
yarn add dotenv
```

Create .env enviroment

## Allowing ES&6 imports

I want to move all related API code to the `/api/` folder so what I am going to do is intall babel but try to install it with webpack so I can use that. This means I need to have a webpack config for server and client, lets start with server by now :D

```
yarn add -D @babel/core @babel/preset-env
yarn add -D babel-loader
```

Also I set the `webpack.dev.js` file and the .babelrc`

I am having problems with .env and webpack :D, this might help: https://stackoverflow.com/questions/46224986/how-to-pass-env-file-variables-to-webpack-config

The problem was that .env needs to be on the complete route of the project not inside the server

> I did this on branch `server-webpack`

This might not be needed later but as I began with server (from clean project)
I wanted to test if I could use ES6 imports/exports.

I will use require from now on, just wanted to test webpack without copy&pasting
