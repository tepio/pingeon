# Pingeon - notification microservice

## About

This project uses [Feathers](http://feathersjs.com). An open source web  framework for building modern real-time applications.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies
    
    ```
    cd path/to/pingeon; npm install
    ```

3. Start your app
    
    ```
    npm start
    ```

## Environment Variables

```
DATABASE_URL
PUBSUB_ID
PUBSUB_KEY
EMAIL_KEY
EMAIL_FROM
```

## API

Autogenerated API Docs - [http://outfit-pingeon-staging.herokuapp.com/apiDocs](http://outfit-pingeon-staging.herokuapp.com/apiDocs)

#### Send pubsub message

```
POST /provider/pubsub/channel/:channel { message }
```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
