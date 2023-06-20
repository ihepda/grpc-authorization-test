package be.digitech.common.survey.grpc;

import io.grpc.Metadata;
import io.quarkus.grpc.auth.GrpcSecurityMechanism;
import io.quarkus.security.identity.request.AuthenticationRequest;
import io.quarkus.security.identity.request.TokenAuthenticationRequest;
import io.quarkus.smallrye.jwt.runtime.auth.JsonWebTokenCredential;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class JWTGrpcSecurityMechanism implements GrpcSecurityMechanism {

	@Override
	public boolean handles(Metadata metadata) {
		return true;
	}

	@Override
	public AuthenticationRequest createAuthenticationRequest(Metadata metadata) {
		String jwt = metadata.get(io.grpc.Metadata.Key.of("authorization", Metadata.ASCII_STRING_MARSHALLER));
		jwt = jwt.substring("Bearer ".length());
		TokenAuthenticationRequest token = new TokenAuthenticationRequest(new JsonWebTokenCredential(jwt));
		return token;
	}

}
