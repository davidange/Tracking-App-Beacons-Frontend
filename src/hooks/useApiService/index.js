import { useState, useEffect, useCallback, useRef } from "react";
import * as WebSdk from "bimplus-websdk";
const useApiService = (environment, teamSlug) => {
	const [api] = useState(new WebSdk.Api(WebSdk.createDefaultConfig(environment)));
	const [statusApi, setStatusApi] = useState("idle");
	const isMountedRef = useRef(null);

	const signin = useCallback(
		(email = "david.angeles@tum.de", password = "701e6a33f0A", appToken = "6CBF3DB2F6FE4E54963C7C6D9E306FE8") => {
			setStatusApi("pending");
			api.authorize
				.post(email, password, appToken)
				.then((response) => {
					let token = response.access_token;
					if (isMountedRef.current) {
						api.setAccessToken(token);
						if (teamSlug) {
							api.setTeamSlug(teamSlug);
						}
						setStatusApi("success");
					}
				})
				.catch((err) => {
					if (isMountedRef.current) {
						setStatusApi("error");
						console.log(err);
					}
				});
		},
		[api]
	);
	useEffect(() => {
		console.log("Signin in");
		isMountedRef.current = true;
		signin();

		return () => (isMountedRef.current = false);
	}, [signin]);

	return [api, statusApi];
};

export default useApiService;
