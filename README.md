# Sleep-Tracker Backend

_base url_: https://sleep-tracker-bw4.herokuapp.com/api

> ## Auth
  - ### **POST** `/auth/register`
    - Returns the newly created user object.
    - Your request body must include a username, password, name, and age.

  - ### **POST** `/auth/login`
    - Returns the user (if found and valid) along with a JSON Web token.
    - Your request body must include the name and password.

--------
________

> ## Users

  - ### **GET** `/users`
    - Returns an array of all the users in the database.
  
  - ### **GET** `/users/:id`
    - Returns the user with the specified id.



