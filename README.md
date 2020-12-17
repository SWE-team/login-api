# login-rest-api

<img src="images/nodemongo.png" height="100">
It is a rest api for sign in and sign up students and faculties.

 <h3> Register Faculty </h3>
 
  POST `/faculty/register `
  
  <h3> JSON Payload </h3>
  
  <pre>
   {
      email: your_email,
      password: your_password,
      name: your_name
   }
  </pre>
  
  <h3> Return Values </h3>
  
  <h3> Success </h3>
  
  Status 200
  
  A verification email is sent to the faculty with a verification link. Once faculty click the link, Faculty is successfully regiisterd. He/She can continuue to login.
  
  <h3> JSON Payload </h3>
  
  <pre>
   {
      err: false,
      msg: success_message,
   }
  </pre>
  
  Status 400
  
  1. email entered is not of iiitr domnain or iith domain,
  2. password length is less than 8
  3. email entered is already entered associated with another account
  
  <h3> JSON Payload </h3>
  
  <pre>
   {
      err: true,
      msg: error_message,
   }
  </pre>
  
  Status 500
  
  1. server or database error
  
   <pre>
   {
      err: true,
      msg: error_message,
   }
  </pre>
  
  
   <h3> Register Student </h3>
 
  POST `/student/register `
  
  <h3> JSON Payload </h3>
  
  <pre>
   {
      email: your_email,
      password: your_password,
      name: your_name,
      yearOfStudying: your_year_of_studying
   }
  </pre>
  
  <h3> Return Values </h3>
  
  <h3> Success </h3>
  
  Status 200
  
  A verification email is sent to the student with a verification link. Once student click the link, Student is successfully regiisterd. He/She can continuue to login.
  
  <h3> JSON Payload </h3>
  
  <pre>
   {
      err: false,
      msg: success_message,
   }
  </pre>
  
  Status 400
  
  1. email entered is not of iiitr domnain or iith domain,
  2. password length is less than 8
  3. email entered is already entered associated with another account
  
  <h3> JSON Payload </h3>
  
  <pre>
   {
      err: true,
      msg: error_message,
   }
  </pre>
  
  Status 500
  
  1. server or database error
  
   <pre>
   {
      err: true,
      msg: error_message,
   }
  </pre>
  
   <h3> Login Faculty </h3>
 
  POST `/faculty/login `
  
  <h3> JSON Payload </h3>
  
  <pre>
   {
      email: your_email,
      password: your_password,
   }
  </pre>
  
  <h3> Return Values </h3>
  
  <h3> Success </h3>
  
  Status 200
  
  Faculty is succesfully logged in.
  
  <h3> JSON Payload </h3>
  
  <pre>
   {
      err: false,
      msg: db_user_id,
   }
  </pre>
  
  Status 400
  
  1. email entered is not registerd 
  2. email entered is not verified
  3. Invalid Password
  
  <h3> JSON Payload </h3>
  
  <pre>
   {
      err: true,
      msg: error_message,
   }
  </pre>
  
  Status 500
  
  1. server or database error
  
   <pre>
   {
      err: true,
      msg: error_message,
   }
  </pre>
  
  
  <h3> Login Student </h3>
 
  POST `/student/login `
  
  <h3> JSON Payload </h3>
  
  <pre>
   {
      email: your_email,
      password: your_password,
   }
  </pre>
  
  <h3> Return Values </h3>
  
  <h3> Success </h3>
  
  Status 200
  
  Student is succesfully logged in.
  
  <h3> JSON Payload </h3>
  
  <pre>
   {
      err: false,
      msg: db_user_id,
   }
  </pre>
  
  Status 400
  
  1. email entered is not registerd 
  2. email entered is not verified
  3. Invalid Password
  
  <h3> JSON Payload </h3>
  
  <pre>
   {
      err: true,
      msg: error_message,
   }
  </pre>
  
  Status 500
  
  1. server or database error
  
   <pre>
   {
      err: true,
      msg: error_message,
   }
  </pre>
  
  
   <h3> Forget Password </h3>
 
  POST `/faculty/resetPassword `
  
  <h3> JSON Payload </h3>
  
  <pre>
   {
      email: your_email,
      password: your_new_password,
   }
  </pre>
  
  <h3> Return Values </h3>
  
  <h3> Success </h3>
  
  Status 200
  
  A verification email is sent to the Faculty with a verification link. Once Faculty click the link, password is successfully changed. He/She can continuue to login.
  
  <h3> JSON Payload </h3>
  
  <pre>
   {
      err: false,
      msg: success_message,
   }
  </pre>
  
  Status 400
  
  1. email entered is not registerd 
  
  <h3> JSON Payload </h3>
  
  <pre>
   {
      err: true,
      msg: error_message,
   }
  </pre>
  
  Status 500
  
  1. server or database error
  
   <pre>
   {
      err: true,
      msg: error_message,
   }
  </pre>
  
   <h3> Forget Password </h3>
 
  POST `/student/resetPassword `
  
  <h3> JSON Payload </h3>
  
  <pre>
   {
      email: your_email,
      password: your_new_password,
   }
  </pre>
  
  <h3> Return Values </h3>
  
  <h3> Success </h3>
  
  Status 200
  
  A verification email is sent to the Student with a verification link. Once Student click the link, password is successfully changed. He/She can continuue to login.
  
  <h3> JSON Payload </h3>
  
  <pre>
   {
      err: false,
      msg: success_message,
   }
  </pre>
  
  Status 400
  
  1. email entered is not registerd 
  
  <h3> JSON Payload </h3>
  
  <pre>
   {
      err: true,
      msg: error_message,
   }
  </pre>
  
  Status 500
  
  1. server or database error
  
   <pre>
   {
      err: true,
      msg: error_message,
   }
  </pre>
  
  
  
  
  

`


