# LightBnB
As part of this project, we will design a database and use server-side JavaScript to display the information from queries to web pages. We will be able to apply our existing knowledge of complex SQL queries, database and ERD (entity relationship diagram) design to integrate the database with a Node backend.

## Project Structure

```
.
├── 1_queries
│   ├── all_my_reservations.sql
│   ├── average_reservation_lenght.sql
│   ├── most_visited_cities.sql
│   ├── property_listings_by_city.sql
│   └── user_login.sql
├── docs
│   ├── ERD.JPG
│   └── LightBnB-ERD.drawio
├── LightBnB_WebApp
├── migrations
│   └── 01_schema.sql
├── seeds
│   ├── 01_seeds.sql
│   └── 02_seeds.sql
├── .gitignore
└── README.md
```

* `1_queries` contains all the queries utilized for replacing the JSON objects with a real database connection on the LightBnB_WebApp.
* `docs` contains the image and the original ERD file regarding the LighBnB database. 
* `LightBnB_WebApp` is the web application itself. The javascript files within the `db` directory were modified to allow the database connection. For more information about the web app, please check the [README.md](https://github.com/raubersn/LightBnB/blob/main/LightBnB_WebApp/README.md) file in the folder. 
* `migrations` has the database schema used by the application. Execute the SQL commands to create the structure before running queries on it. 
* `seeds` has fake data to be inserted in the database. The SQL commands will allow further testing and visualizing of the app's features.

## Stretches

### Code Structure

`~\LightBnB_WebApp\db\database.js` was refactored, and all the interactions with the database go through `~\LightBnB_WebApp\db\index.js`. This serves a few purposes:

* Allows the project to adjust to any changes to the Node-Postgres API without having to trace down all the places that directly use node-postgres in the application.
* Allows it to have a single place to put logging and diagnostics around the database.
* Allows it to make custom extensions to the database access code & share it throughout the project.
* Allows a single place to bootstrap & configure the database.

### Extended ERD

More tables were added to the database to allow the following:

#### Rates
An *owner* can set different rates for a property for certain date ranges. For example, an owner might set the cost per night to be $300 from December 20th until January 2nd.

#### Guest Reviews
An *owner* should be able to leave a review about a *guest*. This will be similar to the way that a *guest* can review a property.

!["Extended ERD"](https://github.com/raubersn/LightBnB/blob/main/docs/ERD.jpg)