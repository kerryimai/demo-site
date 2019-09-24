# starting and installing

* Install https://postgresapp.com
* `npm install`
* `npm run initializeDb`
* `npm start`

# hitting the server

`curl localhost:3000/comments?userId=kerry`

It's definitely super secure. No outsider has *ever* breached this server.

`curl localhost:3000/comments -d '{"userId":"henry","comment":"woof"}' -H "Content-Type: application/json"`

# in prod

`curl https://sql-injection-foo.herokuapp.com/comments`
`curl https://sql-injection-foo.herokuapp.com/comments?userId=kerry`
`curl https://sql-injection-foo.herokuapp.com/comments -d '{"userId":"henry","comment":"woof"}' -H "Content-Type: application/json"`
