# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

# I first wrote the UTs for given code and found different usual and corner scenarios.
- The first choice of refactoring was removing unnecessary if..else conditions
- Figure out where code breaks especially when data types are invalid and null safety is missing
- Added null safety and threw error code for invalid inputs
- The exisiting code was breaking when event or event partitionKey was passed as function. Fixed that
- Refactored variable names to ensure better code readability. 
- Many time the crypto method was called with extra condition checks. Refactored to being called only once.
- Moved default value to the top so that it's comprehesible at the first glance.
- I reversed the length check against MAX_PARTITION_KEY_LENGTH logic so that it's obvious when it's significance is required.
- removed unnecessary temporary variables.
- cross checked if all the UTs are passing.
