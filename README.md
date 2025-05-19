# Node.js MongoDB Aggregation & Target Sum Finder

This project demonstrates a Node.js application that:  
1. Finds two indices in an array whose values add up to a given target.  
2. Connects to a MongoDB database and runs an aggregation query on sales data.

## Features

- Find indices of two numbers that sum to a target.
- MongoDB aggregation to calculate monthly revenue and average item prices per store.
- Mock data insertion if the collection does not exist.

## Prerequisites

- Node.js (v14 or later)
- MongoDB instance running locally or remotely

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```
# Install the Dependencies

```bash
npm install
```
# Configure Environment Variables

MONGODB_URI=mongodb://localhost:27017/node-gravity
COLLECTION_NAME=sales

# Run the Application
```bash
npm run start
```