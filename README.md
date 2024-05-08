# Simple Wallet Update Service 

A simple service to allow collections from mobile money wallets into your Crypto wallet . I created restful Backend APIs that allows for  independent decoupled services. Any Front - end  can connect to this.


## Tech Stack 
 ### Frameworks, Tools & Languages

* Backend - Node (Express Js)
* Language - Typescript
* Testing - Postman

## Run Locally
### Pre -requisites
* Node.Js

## Instalation

* Clone this Repository.
git clone https://github.com/Emmannydev/Fintech-Wallet-App.git

* Install Dependencies
npm install

* Run App
npm run dev



The application consist of these endpoints .
1. makeCollection
2. getChanneels
3. cceptCollectionRequest
4. lookedUpCollectionBySequenceId
5. getCollectionData
7. Webhook

1.makeCollections API
API_URL =http://localhost:8088/api/v1/payment/collections
Description: This is a POST endpoint allows you to initialize a collection request with Yellowcard. You can use it to transfer funds to a recipient specified in the request parameters.

2. getChannels API
The is a GET endpoint getChannel allows user to get all channels in the system.
API_URL = http://localhost:8088/api/v1/payment/channels


3. acceptCollectionRequest API
The acceptCollectionRequest api make use of the id if a created collection to accept a collection. This is make possible by collection the 
Accept Collection Request api from Yellow card
API_URL = http://localhost:8088/api/v1/payment/collections/{id}/accept

4.lookedUpCollectionBySequenceId API make use of sequenceId from a collection to look for a specific collection. This API connect to  to Lookup Collection by sequenceId from yellow card.
API_URL = http://localhost:8088/api/v1/payment/collections/sequence-id/{id}

5. getCollectionsData API
This is a GET endpoint service that allows you to filter the right active channel and network parameters.
API_URL = http://localhost:8088/api/v1/payment/collections/data

6. createWebhook API
This a GET endpoint service that allows you to create webhooks with the right events on Yellow Card API service.
API_URL = http://localhost:8088/api/v1/payment/webhooks

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


