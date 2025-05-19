import { ERROR_MESSAGES } from '../constants/index.js';

export function findIndicesForTargetSum(nums, target) {
  if (!Array.isArray(nums)) {
    throw new TypeError(ERROR_MESSAGES.NOT_ARRAY);
  }
  if (typeof target !== "number") {
    throw new TypeError(ERROR_MESSAGES.NOT_NUMBER);
  }
  if (nums.length < 2) {
    throw new Error(ERROR_MESSAGES.ARRAY_TOO_SHORT);
  }

  const seen = new Map();

  for (const [index, num] of nums.entries()) {
    const complement = target - num;
    if (seen.has(complement)) {
      return [seen.get(complement), index];
    }
    seen.set(num, index);
  }

  throw new Error(ERROR_MESSAGES.NO_VALID_PAIR);
}
