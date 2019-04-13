This project is a React/Node/Express project. To get up and running:

1. The database is Postgres. To start locally, there needs to be a local Postgres database created called bizluminate. Once Postgres is installed on your computer start Postgres in your terminal by typing `psql` then create the database with `CREATE DATABASE bizluminate;`
Quit Postgres with \q

2.The project requires two API keys that are open to the public and available for free. The mapbox API key can be obtained with a free [https://www.mapbox.com/](Mapbox) subscription. The National Renewable Energy Lab API key is availble through that organization's [https://developer.nrel.gov/] (developer network). The keys need to be placed in a file called mapKey.js in the src directory of the client directory. A sample file has already been made there. Place the keys in the sample file and re-name the file to 'mapKey.js'. Remember to add that file to your gitignore file so your keys aren't made public.

3. Install Node Modules 'npm install' in both the home directory. Then cd into the client directory and 'npm install' the modules there.

4. Once in the directory in your terminal,  migrate the database with `knex migrate:latest` and then seed the database with `knex seed:run`

5. In the home directory, start the project with `npm run dev` that command will connect the database and start the server in the client directory.