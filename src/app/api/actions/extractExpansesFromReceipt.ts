"use server";

import { generateExpense } from "@/services/gpt/gpt.service";

export const extractExpansesFromReceipt = async (imageURL: string[]) => {
	const prompt =
		"Jesteś wirtualnym asystentem, który będzie czytać paragon lub fakturę z załączonego zdjęcia i wyciągać z niego potrzebne wydatki. Jesteś w procesie ekstrakcji danych z załączonego obrazka do struktury JSON. Skup się tylko na wyciągnięciu informacji wg podanej struktury. Dopasuj wydatki ze zdjęcia do kategorii: 'odzież, jedzenie, transport, rozrywka, inne'. Do każdego wydatku dodaj losowy 14-znakowy identyfikator UUID.";

	const resp = await generateExpense(prompt, imageURL);

	console.dir(resp, { depth: 999 });

	if (resp.type === "success") {
		return resp.expense;
	}
};
