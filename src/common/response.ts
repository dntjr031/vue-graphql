export default interface CommonResponse<T> {
	[key: string]: {
		data: T;
		message: string;
		status: number;
	};
}
