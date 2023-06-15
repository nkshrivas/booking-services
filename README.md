# Installation
- Clone the repository to your local machine.
- Navigate to the project directory.
- Run npm install to install the dependencies.
## Configuration
Before running the application, make sure to configure the following:

- Create a .env file in the root directory.
- Set the MongoDB connection URI in the .env file. Example:
-  MONGODB_URI=mongodb://localhost:27017/mydatabase
-  Set the PORT value

## Usage
- To start the application, run npm start in the project directory.
- The server will start running and will be accessible at `http://localhost:PORT`

## To run the script to upload the default data to your database by reading the CSV file.
  just uncomment the function call below in config folder csvReader file and update the path with    your csv file or call the function created

# API Endpoints Documentation
This document provides information about the available endpoints for the API.

## Seat Pricing

### Endpoint
GET: `/api/seatsPricing/?_id=Seat_ID`

### Description
Retrieves the pricing information for a specific seat.
Parameter|#Type|	#Description
--- | --- | --- |
_id |String	|The ID of the seat

### Reasponse
- Status: 200 OK
- Body: JSON object containing seat pricing information

Example Response:
```json
{
  "seat": {
    "_id": "6489c268c1edb6a1f5ac4d4c",
    "seatNumber": "A1",
    "seatClass": "Economy",
    "isBooked": false
  },
  "price": 100.50
}
```
## All Seats
### EndPoint
GET `/api/seats`

### Description
Retrieves all available seats.

### Response
- Status: 200 OK
- Body: JSON array containing seat objects
Example Response:
```json
[
  {
    "_id": "6489c268c1edb6a1f5ac4d4c",
    "seatNumber": "A1",
    "seatClass": "Economy",
    "isBooked": false
  },
  {
    "_id": "f5ac4d4c6489c268c1edb6a1",
    "seatNumber": "B2",
    "seatClass": "Business",
    "isBooked": true
  },
 ...
]

```
## Create Booking
### EndPoint
POST `/api/booking`

### Description
Creates a new booking for the specified seats.
### Request Body
```json
{
  "seatIds": ["6489c268c1edb6a1f5ac4d4c", "Any_other_seat_number"],
  "user": "nkss6@gmail.com",
  "phoneNumber": "9889531834"
}


```
### Response
- Status: 200 OK
- Body: JSON object containing the booking details
Example Response:
```json
{
  "booking": {
    "_id": "5c4d4c6489c268c1edb6a1f5",
    "seats": ["6489c268c1edb6a1f5ac4d4c"],
    "user": "nkss6",
    "phoneNumber": "9889531834",
    "totalAmount": 150.00,
    "createdAt": "2023-06-13T12:00:00.000Z"
  }
}


```
## Retrieve Booking
### EndPoint
GET `/api/bookings?userIdentifier=phoneNumber or usermail`

### Description
Retrieves bookings based on the user's identifier (phone number or email).

### Query Parameters
Parameter	|#Type|	#Description
--- | --- | --- |
userIdentifier|	String	|User's phone number or email

### Response
- Status: 200 OK
- Body: JSON array containing  booking objects
Example Response:
```json
{
  "bookings": [
    {
      "_id": "5c4d4c6489c268c1edb6a1f5",
      "seats": ["6489c268c1edb6a1f5ac4d4c"],
      "user": "nkss6",
      "phoneNumber": "9889531834",
      "totalAmount": 150.00,
      "createdAt": "2023-06-13T12:00:00.000Z"
    },
    ...
  ]
}


```

Feel free to use these endpoints to interact with the API and retrieve or manipulate the data accordingly.
and for api contact me on comment section





