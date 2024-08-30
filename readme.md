
# FRESH INNOVATIONS API

This API is made up of two data models:

### 1. USER
the user model is described as follows:
| Field | Data Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | The user's unique ID |
| `name` | `string` | The user's name |
| `email` | `string` |The user's email (**Required**)  |
| `password` | `string` |The user's password (** Must be greater than 8 characters**) |
| `phoneNumber` | `string` |The user's phone number  |
| `oauthProvider` | `string` |Indicates if the user signs in with an oauth provider e.g "google" or "default" (i.e. email and password)  |
| `profilePicturePath` | `string` |The file path of the user's profile picture  |
| `accountStatus` | `string` |The user's account status. ("active by default")  |
| `referralCode` | `string` |The user's referral code  |
| `walletBalance` | `Number` |The user's wallet balance  |
| `referralsMade` | `Number` |Number of referrals the user has made  |

**Note:** password is only required if the user creates account with "default" oauthProvider i.e. email and password

### 2. TRANSACTION
An airtime to cash conversion is referred to as a "transaction" in this API. It is described as follows:
| Field | Data Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | The transaction's unique ID |
| `user` | `string` | The ID of the user that made the transaction |
| `service` | `string` | The service chosen by the user |
| `network` | `string` | The network chosen by the user |
| `phoneNumber` | `string` | The phone number chosen by the user |
| `airtimeSharePin` | `string` | The airtime share pin inputted by the user |
| `amount` | `Number` | The amount of airtime converted by the user |
| `paymentMethod` | `string` | The payment method chosen by the user |
| `transactionNo` | `string` | A unique number that can locate any transaction |

## API REFERENCE

### SIGNUP USER

```http
  POST /users/signup
```

The body object of the request should be defined as follows:
| Parameter | Type     |
| :-------- | :------- |
| `email` | `string` |
| `password` | `string` |
| `oauthProvider` | `string` |

#### or

| Parameter | Type     |
| :-------- | :------- |
| `email` | `string` |
| `oauthProvider` | `string` |

### LOGIN USER

```http
  POST /users/login
```

The body object of the request should be defined as follows:
| Parameter | Type     |
| :-------- | :------- |
| `email` | `string` |
| `password` | `string` |
| `oauthProvider` | `string` |

#### or

| Parameter | Type     |
| :-------- | :------- |
| `email` | `string` |
| `oauthProvider` | `string` |

### GET USER BY ID

```http
  GET /users/id/{userId}
```

### EDIT USER MAIN DETAILS
edit the user's "name", "telephone" or "accountStatus"


```http
  PATCH /users/edit/main-details
```

The body object of the request should be defined as follows:
| Parameter | Type     |
| :-------- | :------- |
| `userId` | `string` |
| `updates` | `Array<Update>` |

The "updates" parameter is an array of objects where each object contains a "field" property and a "value" property. As described below:

| Field | Data Type     | Description                |
| :-------- | :------- | :------------------------- |
| `field` | `string` | The name of the field you want to change |
| `value` | `string` | The value you want to change the field to |

for example, this is how the body of the request would look like:

    {

        "userId": "45j36b35ihv72ih",

        "updates": [

          { "field": "name", "value": "John Mark" },

          { "field": "phoneNumber", "value": "12345678" }

        ]

    }

### CHANGE USER'S PASSWORD


```http
  PATCH /users/edit/password
```

The body object of the request should be defined as follows:
| Parameter | Type     | Description |
| :-------- | :------- | :------- |
| `userId` | `string` | `user's unique ID` |
| `currentPassword` | `string` | `User's current existing password`
| `newPassword` | `string` | `The new password the user wants to change to`
| `newPasswordConfirmation` | `string` | `Repetition of the new password to confirm` |

### CONVERT AIRTIME TO CASH (Creating a new transaction)

```http
  POST /transactions/create
```

The body object of the request should be defined as follows:
| Parameter | Type     | Description |
| :-------- | :------- | :------- |
| `userId` | `string` | `the unique ID of the user creating the transaction` |
| `network` | `string` | The network chosen by the user |
| `phoneNumber` | `string` | The phone number chosen by the user |
| `airtimeSharePin` | `string` | The airtime share pin inputted by the user |
| `amount` | `Number` | The amount of airtime converted by the user |

### GET A TRANSACTION BY IT'S TRANSACTION NUMBER

```http
  GET /transactions/get/{transactionNumber}
```

### GET ALL TRANSACTIONS

```http
  GET /transactions/all
```

### GET ALL TRANSACTIONS MADE BY A PARTICULAR USER

```http
  GET /transactions/all/user/{userId}
```