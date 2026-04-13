1. Generate package.js
2. Create express server
3. Install mongoose and connect to MongoDb server

        REST API -- MongoDB native driver -->Db Server
        REST API -- Mongoose ODM(Object Document Mapping) tool -->Db Server

4. Build USER REST API (resource is the user)
        - Create user
        - Read all users
        - Read a user by ID
        - Update a user by ID
        - Delete a user by ID

5. Create Schema and Model of the Resource(user)
6. Create User API and define the routes

### User authentication
        -submit credentials and get tokes


        -for public routes:
           req ----> public routes
        
        -for protected routes:
           req ----> middleware ---> Protected Routes
        

        
