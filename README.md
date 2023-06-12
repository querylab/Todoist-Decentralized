# Todoist-Decentralized 📚🔖🗸

This project aims to provide To-Do list-like functionality, allowing users to store and manage tasks on the blockchain. Solidity is used to write the smart contracts that support the task storage and management logic, and ReactJS with NextJS to develop an interactive and friendly user interface. The application integrates with Sepolia  Testnet, which means it can be adjusted and tailored according to the user's specific requirements. By using blockchain technology, the transparency, security and censorship resistance of the tasks stored in the application is guaranteed.


## Setting Up
---
## 1. Clone the repository

## 2. Install dependencies

```bash
$ cd Todoist-Decentralized
$ npm install --save-dev hardhat
$ npm install --save-dev @nomicfoundation/hardhat-toolbox
```
## 3. Change variables in Files
```bash
# hardhat.config.js
$ SEPOLIA_PRIVATE_KEY
$ ALCHEMY_API_KEY
# utils/config.js 
$ API_URL
$ PRIVATE_KEY
$ contractAddress
```
## 4. Deployment Solidity Contract Addresses
```bash
$ npx hardhat clean
$ npx hardhat compile
```
``` bash
$ npx hardhat run scripts/deploy.js --network sepolia
```
<a href="https://imgur.com/oQzyg30"><img src="https://i.imgur.com/oQzyg30.gif" title="source: imgur.com" /></a>

``` bash

#After deploying the Todoist.sol replace this address in utils/config.js file with the variable:

export const contractAddress ="0x74789Ec821B1a0f6342d201C533dA8d2efd19D6D";

```

## 5. Localhost Deployment

``` bash

npm install 

npm run dev 

http://localhost:3000/

```
<a href="https://imgur.com/ga7rWF7"><img src="https://i.imgur.com/ga7rWF7.gif" title="source: imgur.com" /></a>
























