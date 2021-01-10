import { useRef, useEffect } from "react";

/** Custom Hook for accessing the previous state of an object before the component/Hook has been updated */
function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

export default usePrevious;
