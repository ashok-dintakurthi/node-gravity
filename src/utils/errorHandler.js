export function handleError(error, shouldExit = true) {
  console.error(` Error: ${error.message}`);
  if (shouldExit) process.exit(1);
}
