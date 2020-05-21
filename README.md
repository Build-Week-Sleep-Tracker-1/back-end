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
    
  - ### **PUT** `/users/:id`
    - *PROTECTED*
    - Returns the updated user.
    
  - ### **DELETE** `/users/:id`
    - *PROTECTED*
    - Deletes user.
    - No response body.
    
--------
________

> ## User Entries

  - ### **GET** `/users/:id/entries`
    - *PROTECTED*
    - Returns an array of all entries belonging to specified user.
    
  - ### **GET** `/users/:id/entries/:entryid`
    - *PROTECTED*
    - Returns the entry with the specifed id.
    
  - ### **POST** `/users/:id/entries`
    - *PROTECTED*
    - Your request body must include date, sleep_start, sleep_end, total_time, and mood_score.
    - Returns added entry.
    
  - ### **PUT** 'users/:id/entries/:entryid'
    - *PROTECTED*
    - Returns the updated entry.
    
  - ### **PUT** `/users/:id/entries/:entryid`
    - *PROTECTED*
    - Deletes entry.
    - No response body.




