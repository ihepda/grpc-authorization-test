package org.acme;

import io.quarkus.grpc.GrpcService;
import io.quarkus.security.Authenticated;
import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Uni;

//@Authenticated
@Blocking
@GrpcService
public class HelloGrpcService implements HelloGrpc {

    @Override
    public Uni<HelloReply> sayHello(HelloRequest request) {
    	MyEntity findById = MyEntity.findById(1);
        return Uni.createFrom().item("Hello " + request.getName() + "! ... "+ findById.field)
                .map(msg -> HelloReply.newBuilder().setMessage(msg).build());
    }

}
