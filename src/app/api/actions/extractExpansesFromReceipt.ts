﻿"use server";

import { generateExpense } from "@/services/gpt/gpt.service";

export const extractExpansesFromReceipt = async (imageURL: string) => {
	const prompt =
		"Jesteś wirtualnym asystentem, który będzie czytać paragon lub fakturę z załączonego zdjęcia i wyciągać z niego potrzebne wydatki. Jesteś w procesie ekstrakcji danych z załączonego obrazka do struktury JSON. Skup się tylko na wyciągnięciu informacji wg podanej struktury. Dopasuj wydatki ze zdjęcia do kategorii: 'odzież, jedzenie, transport, rozrywka, inne'. Do każdego wydatku dodaj losowy 14-znakowy identyfikator UUID. Zwróć uwagę czy na zdjęciu jest paragon lub faktura. Jeżeli nie jest to zwróć pustą odpowiedź.";

	const resp = await generateExpense(prompt, imageURL);

	console.dir(resp, { depth: 999 });

	if (resp.type === "success") {
		return resp.expenses;
	} else if (resp.type === "validation-error") {
		throw resp.value;
	} else if (resp.type === "parse-error") {
		throw resp.text;
	} else {
		throw resp.error;
	}
};
