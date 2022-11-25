<!-- Redis Filter Key Assignment -->
# **Redis Filter Key Assignment**

## Requirement

This is the task in which I use JS to manipulate Redis, so that we can filter the keys that matches a specific pattern using the built-in function scan in redis.

## Set up and Run

To set up and run it locally, you can follow the below steps:

1. Clone my repo

    ```bash
    git clone 
    ```

2. Adjust the .env file to adjust the number of simulation data.

3. Run the filterKey.js file with the pattern as the argument.

    ```bash
    node filterKey.js book1:shelf*
    # find all shelf containing book 1 
    ```
