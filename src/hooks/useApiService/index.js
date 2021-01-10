import { useState, useEffect, useCallback, useRef,useMemo } from "react";
import { useSelector } from "react-redux";
import ApiService from "./ApiService";
/**
 * Custom Hook that creates and sets up an ApiService
 */
const useApiService = () => {
	const authToken = useSelector((state) =>state.auth.token);
	const apiService = useMemo(()=>new ApiService(authToken),[authToken]);
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

	return [apiService, statusApi];
};

export default useApiService;
