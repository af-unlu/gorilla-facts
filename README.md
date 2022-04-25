# gorilla-facts
#### Basic Explanation with loom in broken English(!) : https://www.loom.com/share/45be6480d9f2489e8d8e5b7b5997aa14
## Summary : An anonymous, decentralized news provider. anti-censorship, anti-lobbying news source.
- Written in mostly TypeScript.
- Using Near Protocol & Near SDK.
- This Project got inspired from these projects : [Learn-Near]

## The Big Picture?
Imagine a news source on Web 3.0, decentralized and controlled by no one. Users can post news with the information link and the reference link(maybe files, documents etc in some P2P file storage networks), later these uncheckted and unverified news would be got verified by some users(choosen trusted users, voted by the community).
This project is just to test the basic concepts.

## Features
- Everybody can post & see the news.
- Only the Owner can verify or deny the news.
- You can filter only verified news between a range.

## What to do next
- There would be some types of users actions like reading, news providing and verifing/voting.
- A punishment mechanism for fake news.
- A rewarding mechanism for unique and true news, maybe there would be a job for this one anonymous journalism?
- More fields about news, about news political leaning etc.
- Each voters would have vote value, if you keep vote for fake news or lobbied news your vote value would go down.
- A rank system for some user actions for example if one user keeps voting accurately, user's voting value would go up.
- Anti-lobbying mechanism to prevent voter users from keep voting for same leaning news.

## Installation

#### To clone and install the project

```sh
git clone https://github.com/af-unlu/gorilla-facts.git
cd gorilla-facts
yarn
```

#### To build and deploy
```sh
yarn build:release
near dev-deploy ./build/release/gorilla-facts.wasm
```
##### Or 
```sh
yarn dev
```
#### I assume you already know whats $CONTRACT etc

#### Later you need to specify owner of this contract
```sh
 near call $CONTRACT init '{"owner":"YOUR_ACCOUNT_NAME.testnet"}' --accountId $CONTRACT
```

## Usage

#### To test authentication
- Returns "Authorized" if Context.sender is the owner of the Contract
```sh
 near call $CONTRACT testAuth({}) --accountId YOUR_ACCOUNT_NAME.testnet
```
#### To insert news
- Return the inserted news, the news are unchecked and false by default.
```sh
 near call $CONTRACT create '{"info":"Earth Is Flat!!","reference":"Trust me bro"}' --accountId YOUR_ACCOUNT_NAME.testnet
```

#### To see news between a range
- Returns a list of news as json objects. 
- Parameters are for defining the range, starting offset and limit.
```sh
 near call $CONTRACT getByRange '{"offset":0,"limit":2}' --accountId YOUR_ACCOUNT_NAME.testnet
```

#### To see only verified news between a range
-Filtering only verified news.
-Returns list of verified news.
```sh
 near call $CONTRACT getVerified '{"offset":0,"limit":2}' --YOUR_ACCOUNT_NAME.testnet
```

#### To verify a new - Only owner
-Only Owner can call this function properly
-Sets isTrue and hasChecked fields of new of given ID ( False,True). 
```sh
near call $CONTRACT verify '{"id":NEWS_ID}' --accountId YOUR_ACCOUNT_NAME.testnet
```

#### To deny a new - Only owner
-Only Owner can call this function properly
-Sets isTrue and hasChecked fields of new of given ID ( True,True). 
```sh
near call $CONTRACT deny '{"id":NEWS_ID}' --accountId YOUR_ACCOUNT_NAME.testnet
```

#### To update a new - Only owner
-Replaces the editable fields of the new with new object.
```sh
near call $CONTRACT update '{"id":SOME_ID_HERE, "updates":{"info":"SOMESTRING", "reference":"SOMESTRING","isTrue":false,"hasChecked":true} }' --accountId YOUR_ACCOUNT_NAME.testnet
``` 
#### To delete a new - Only owner
-Deletes the new
```sh
near call $CONTRACT delete '{"id":NEWS_ID}' --accountId YOUR_ACCOUNT_NAME.testnet
```

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
   [Learn-Near]: <https://github.com/orgs/Learn-NEAR/repositories?q=l1&type=all&language=typescript&sort=>

