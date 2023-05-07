# WIRI BACKEND

Table of contents

- [WIRI BACKEND](#wiri-backend)
  - [Get Started](#get-started)
  - [Testing](#testing)
  - [General structure](#general-structure)
  - [Server Folder structure](#server-folder-structure)

<a name="start"></a>

## Get Started

**Install the dependencies**

```terminal
$ npm install
```

**Run project**
```terminal
$ npm run dev
```

**To migrate tables to the database:**

```terminal
  npm run migrate
```

**To migrate seeders to the database:**

```terminal
  npm run seed
```

<a name="test"></a>

## Testing

**To run tests:**

```terminal
  npm run test
```

**Coverage:**

```terminal
  npm run coverage
```

<a name="mvc"></a>

<a name="generalStructure"></a>

## General structure

```
.
├── src             # BackEnd wiri.
└── .gitignore      # Files ignore.
└── .sequelizerc    # Sequelize initial and path migrations and seeders.
└── index.js        # Express and Cors to expose an API and connects to a Sequelize database.
```

<a name="serverStructure"></a>

## Server Folder structure

```
  ./src
  └──  controllers   # Call to service and handler response.
  └──  database      # Conexion, models, migrations and seeders.
  └──  managers      # Handler database.
  └──  middlewares   # Middlewares authorization users.
  └──  routes        # Routes API.
  └──  services      # Business logic.
  └──  test          # handlers test.
  └──  utils         # Reusable functions.
  └──  validator     # express validator for endpoints

```
