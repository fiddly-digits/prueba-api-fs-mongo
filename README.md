## Routes Explanation

### User Routes

- `/user/register` ✅\
  Register one user | **No Auth Needed**
- `/user/login` ✅\
  Login one user | **No Auth Needed**

### Products Routes

- `/products/` ✅\
  Get all products | **No Auth Needed**
- `/save/` ✅\
  Save a product | **No Auth Needed | Body with product needed**
- `/update/` ✅\
  Update one product]| **No Auth Needed | Body with updates needed**
- `/delete/:id` ✅\
  Delete one product | **Auth Needed**
