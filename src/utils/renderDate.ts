export const renderDate = (date: string) => {
	return new Date(date).toLocaleString("pl-PL", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
	});
};
