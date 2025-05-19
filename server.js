import dotenv from 'dotenv';
dotenv.config();
// Imports for Sum of Two Numbers
import { findIndicesForTargetSum } from './src/services/findIndex.js';
import { handleError } from './src/utils/errorHandler.js';

const nums = [2, 7, 11, 15];
const target = 9;

function displayIndicesForTargetSum(nums, target) {
  try {
    const result = findIndicesForTargetSum(nums, target);
    console.log("Indices of matching values: ", result);
  } catch (error) {
    handleError(error);
  }
}

displayIndicesForTargetSum(nums, target);
