var jwtPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDfXnf2Rt1n7BRk
sXf8oECBmRL2sqfDVkNQu642ZiSfLj4ZM3fDOMu110qKQuCb2RehUBUr73liD0lV
cB6pFuACgly3jncJazm6J3sZxnY3L97LAM4Anoj6/4sUzYkX6AS5tp5TBsZMfCkz
zDUFNjjJneLA1miQ1+jKXanM/9wX+XxJWTxGS0wM5QWBPni+KH84mpWG6RDl7ml2
nwSt8j86S12uFTu3SJaVEQULtqFWX/zNcDUJ35vHZkhalUGGnwsTmeuJp52YOXP5
u2SLflvUvZKU0Pvhw8qqzFG6EDsgM6y8xBlZz4VPqTPDJUBl1dDRcyC3uRqhefht
rw2K9P0hAgMBAAECggEAVXGwJuuttxqmJGyErwToGAsjp23o4b6GSoQ4nIOPH7sT
MxWuiuWXe0xLLb9uZv9w3BqjtqZJAvtA/KdCe0EOWLdgWzDqlRZIw05l9xKlVu//
ZB0/MBp04LrPC5qiBhyRbi8OukjdoxVdt3w2jfNTXsCAJG8AGeQVnw+cLBh1q09j
sKAAqEme1wNAbJQdPw+vaq8h5zsidYM1KvOw4f8POABQdhkSuuFjqJPw5mxqbdcm
ZF+BuJrAhmulk8e2JYI9Hw3RTH9aZDJJvIeUfkOhYU9cZlRTlsGYeXA7GBjSvaPs
d96tc4oemhJCnW7J1CpbZP+7vu7FgZiKUKpJI1vzTwKBgQDnTNdqWm638aICy8Hr
8px6dLPOMt/3te1Fljj9utX6YAViqOcpgb4HKdY8QGXTWb4CM33XoAy8HDF4GevG
FibkDhg0SVdiHAmB9wYQyqf7fp9O2Hf9ezlhkwcpjpDnyprFJo9dzNNFwbwu66yj
D6/MEsunM8UIi5mE0uXDPftnkwKBgQD3OM9QI5VkYEVZhQL46fKW4SG4GqlFS4nS
Gv6E0jgrhFo+8ZQToQhWFLx7dTvPoiblXwWL4/CG4yN+nyhHz/GouKec1KAT/b7K
ihnQdYU5ISiJC4vszMxArMk9wQBV6HbP40BIpb9uettphWbDFEBG7spZlQBi7+9f
JMEc3NXQ+wKBgDNLgUJex8sXVTyVf24aIcWud+m0sqK2v+X8yKrMcoPSI5+boZg8
462nA5HdHjfe4RqP3Mqi/fABuJ7P8M+/PeS5k3iVA0IIwbsG01uJ9fL6Q84yh3m5
iCIxfxciPNSKxAQQ5x6APCJuMpOdRG3tHql9SZjNDFc2zlb8hmPkLQrtAoGAcH0M
9635P97+LylynMf2deiiax7Wfo1MfKmDvfPZUxO57IIHmpbfMCvnR1WkjWl+wUdn
QqvIudeIQwkwTtyzXM4Ilje5Tt9afNYxwMR4hfIse48hb/IPzi3Qs6Sp/mz0Asuo
aGXioOaOB4mHpKQGS0BEGlbOAjaieGxE4lkpgRkCgYEAyDKWTyaHU8DX/HxoV2R4
61FEewOfvVsOZF15i9V3Z1IW2hDgsqlOn0t/Xcrji0/A0vaSAnbEDULKDTv5nVLp
FVevTg/CvXxK9qbYUuOh8cN6YN0WkLcGf9SGTF/htXAqK9j7/BThXQB8UWB1FvwO
e6Sp7XFkKm8YiWmP1LJGFtI=
-----END PRIVATE KEY-----`;

// Set headers for JWT
var header = {
	'alg': 'RS256',
	'typ': 'JWT'
};

// Prepare timestamp in seconds
var currentTimestamp = Math.floor(Date.now() / 1000);

var payload = {
   "iss" : "https://my.test/issuer",
   "exp": currentTimestamp+30,
   "iat": currentTimestamp,
   "upn": "jdoe@quarkus.io",
   "groups" : [
       "Admin",
       "User"
   ]
};

function generateJwt() {
	eval(pm.globals.get('jsrsasign-js')); // import javascript jsrsasign

	var sHeader = JSON.stringify(header);
	var sPayload = JSON.stringify(payload);

	var signedToken = KJUR.jws.JWS.sign(header.alg, sHeader, sPayload, jwtPrivateKey);

	pm.environment.set('assertionToken', signedToken);
	// console.log('jwt', signedToken);
}

var navigator = {}; // fake a navigator object for the lib
var window = {}; // fake a window object for the lib

if (pm.globals.has('jsrsasign-js')) generateJwt();
else pm.sendRequest(
	'https://kjur.github.io/jsrsasign/jsrsasign-all-min.js',
	function (err, res) {
		if (err) {
			console.log(err);
		} else {
			pm.globals.set('jsrsasign-js', res.text());
			generateJwt();
		}});