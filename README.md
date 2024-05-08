## Simple Wallet Update Service 

A simple service to allow collections from mobile money wallets into my Crypto wallet app . I created restful Backend APIs that allows for  decoupled services. Any Front - end  can connect to this.


## Tech Stack 
 #### Frameworks, Tools & Languages

* Backend - Node (Express Js)
* Language - Typescript
* Testing - Postman

## Run Locally
### Pre -requisites
* Node.Js

## Installation

* Clone this Repository.
git clone https://github.com/Emmannydev/Fintech-Wallet-App.git

* Install Dependencies ~
npm install

* Run App ~
npm run dev



The application consists of these endpoints .
1. makeCollection
2. getChanneels
3. cceptCollectionRequest
4. lookedUpCollectionBySequenceId
5. getCollectionData
7. Webhook



* makeCollections API
API_URL: http://localhost:8088/api/v1/payment/collections
Description:
This POST endpoint facilitates the initiation of a collection request. It enables the deduction of funds from a Mobile Money customer as specified in the request parameters.
* getChannels API
API_URL: http://localhost:8088/api/v1/payment/channels
Description:
This GET endpoint allows users to retrieve all available channels within the system.

* acceptCollectionRequest API
API_URL: http://localhost:8088/api/v1/payment/collections/{id}/accept
Description:
The acceptCollectionRequest API utilizes the ID of a created collection to accept a collection. This functionality is made possible by utilizing the Accept Collection Request API from Yellow Card.
* lookedUpCollectionBySequenceId API
API_URL: http://localhost:8088/api/v1/payment/collections/sequence-id/{id}
Description:
The lookedUpCollectionBySequenceId API utilizes the sequence ID from a collection to search for a specific collection. This API establishes a connection to the Lookup Collection by sequence ID from Yellow Card.
* getCollectionsData API
API_URL: http://localhost:8088/api/v1/payment/collections/data
Description:
This GET endpoint service enables filtering of the appropriate active channel and network parameters.
 * createWebhook API
API_URL: http://localhost:8088/api/v1/payment/webhooks
Description:
This GET endpoint service allows the creation of webhooks with the appropriate events on the Yellow Card API service.

## Challenges
> [!Some Challenges encountered in bulding the wallet service with the API docs]
 

 * Error message returned  for bad request errors sometimes do not detail the exact reason for the error . 
    e.g {
  message: '[instance failed to match exactly one schema (matched 0 out of 2)]',
  code: 'InvalidRequestBody'
}

this an example error which does not explicitly specify which parameter is casuing bad request 

 * Signature combination for Authorization was cumbersome for POST and PUT method endpoints.
  
  Suggestion : A sample for POST and PUT methods

 * Unable to get final or complete status even with sandbox data. Rather received "Process" after commiting transactions. 

 * Webhook guide  in API doc described a  X-YC-signature header which I could not clearly identify.


> [!NOTE]
> This was built for purposes of demo so not all features and functions are fully developed.


