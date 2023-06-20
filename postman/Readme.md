# Step to setup postman to call GRPC

1. Open postman and create a new workspace
2. Click the *New* button and select grpc
3. In the urp put : grpc://localhost:9000
4. In *Service definition* tab click  "import .proto file" and load the  hello.proto -> click Next -> click Import as API
5. In *Script* tab, select *Before Invoke* and add the source in the Before-Invoke-script.js
6. In the *Authorization* tab select the type *Bearer Token*, in the token field add *{{assertionToken}}*
7. In service field select the rpc SayHello
8. In the input message add *{"name": "Joe"}*
9. Click invoke
