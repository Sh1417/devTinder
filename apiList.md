#DEVTinder APIs

## authRouter
-POST /signup
-POST /login
-POST /logout

## profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

## connectionRequestRouter
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId

userRouter
-POST/request/review/accepeted/:requestId
-POST/request/review/ignored/:requestId

-GET/user/connections
-GET/requests/receieved

-GET/feed -Gets you the prpfole of other user on platforms. 

STATUS OF SENDING A REQUEST - ignore[left swipe] , interested [right swipe] , accepted[recievers end], rejected[receiveres end]

