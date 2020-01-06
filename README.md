# cinema server app

Endpoints:
List of seances:
GET: https://guarded-fjord-03707.herokuapp.com/api/seances
Example response:
[
{
"\_id": "5e0fe119748f543b34ee0bda",
"name": "Super film",
"date": "2020-02-01T23:00:00.000Z",
"seats": [
{
"_id": "5e0fe119748f543b34ee0bdc",
"number": 1,
"isReserved": false
},
{
"_id": "5e0fe119748f543b34ee0bdb",
"number": 1,
"isReserved": false
}
],
"\_\_v": 0
},
]
Add new seance
PUT: https://guarded-fjord-03707.herokuapp.com/api/seances
Example request body:
{
"name": "Kevin sam w domu",
"date": "2020-02-01",
"seats": [
{
"number": "1",
"isReserved": "false"
},
{
"number": "2",
"isReserved": "true",
"email": "email@email.com"
}
],

    }


    Edit seance
    PUT: https://guarded-fjord-03707.herokuapp.com/api/seances/:id
    Example request body:
    {
        "name": "Kevin sam w domu",
        "date": "2020-02-01",
        "seats": [
            {
                "number": "1",
                "isReserved": "false"
            },
            {
                "number": "2",
                "isReserved": "true",
                "email": "email@email.com"
            }
        ],
    }


    Delete seance
    DELETE: https://guarded-fjord-03707.herokuapp.com/api/seances/:id
#   d o i s t - b a c k e n d  
 