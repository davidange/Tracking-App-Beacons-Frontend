import { useState, useEffect, useCallback, useRef } from "react";
import ApiService from "./ApiService";
const useApiService = (teamSlug) => {
	const [apiService] = useState(new ApiService());
	const [statusApi, setStatusApi] = useState("idle");
	const isMountedRef = useRef(null);

	const signin = useCallback(() => {
		setStatusApi("pending");
		console.log("Trying to sign in");
		apiService.authorize().then((result) => {
			if (isMountedRef.current) {
				if (result) {
					setStatusApi("success");
				} else {
					setStatusApi("error");
				}
			}
		});
	}, [apiService]);
	useEffect(() => {
		isMountedRef.current = true;
		signin();

		return () => (isMountedRef.current = false);
	}, [signin]);

	return [apiService,statusApi];
};

export default useApiService;
