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
DEBUG - All in app logs goes to 'app*'.
PORT - What port server is listening.

AMQP_URL - RabbitMQ url.
DATABASE_URL - db connection url.

PUBSUB_ID - pub/sub provider id.
PUBSUB_KEY - pub/sub provider secret key.

EMAIL_KEY - email provider secret key. 
EMAIL_FROM - for example noreply@tep.io

PUSH_KEY - AWS key.
PUSH_SECRET - AWS secret.
PUSH_REGION - AWS SNS region.
PUSH_TITLE - Title for push notifications.
GSM_APP_ARN - Android ARN for AWS SNS.
APNS_APP_ARN - Apple iOS ARN for AWS SNS.
```

## API

API Docs - [http://docs.pingeon.apiary.io](http://docs.pingeon.apiary.io)

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
