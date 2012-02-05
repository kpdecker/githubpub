# githubpub

PubNub endpoint for Github Post-Receive URLs

## Install

Heroku

    heroku create -s cedar
    heroku install pubnub:minimal
    git push heroku master

Standalone

    export PUBNUB_PUBLISH_KEY=$publishKey
    export PUBNUB_SUBSCRIBE_KEY=$subscribeKey
    node githubpub.js
