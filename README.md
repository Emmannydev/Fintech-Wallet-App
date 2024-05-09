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
3. AcceptCollectionRequest
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

### Challenges faced in buliding with external YC payment APIs

 

 * Some error messages returned for bad requests lack specificity, hindering efficient troubleshooting.
    * For instance, an error message like { message: '[instance failed to match exactly one schema (matched 0 out of 2)]', code: 'InvalidRequestBody' }
      provides insufficient detail, posing challenges for developers in diagnosing issues promptly.


 * The signature combination required for Authorization, particularly for POST and PUT method endpoints, is cumbersome.
  
   * Suggestion : Simplifying the explanation and implementation of authentication for these methods would enhance efficiency and ease of integration.
  
 * Generating Auth signature combinations online often results in numerous errors, impeding direct testing of endpoints without scripting.

   * Suggestion : Providing an illustrative flow for generating authorization through online tools, without scripting, would expedite API testing for partners.

 * Despite utilizing sandbox data, obtaining a final or complete status proves challenging, as transactions consistently return a "Process" status after commiting transactions.
    * Suggestion : Enhancing documentation or clarifying expected outcomes would aid devs in effectively utilizing sandbox environments.

 * The API documentation includes a Webhook guide mentioning an X-YC-signature header, which lacks clear identification.
   * Suggestion : Enhancing the documentation with detailed explanations or examples would assist devs in correctly implementing and utilizing webhooks.



> [!NOTE]
> This was built for purposes of demo so not all features and functions are fully developed.


