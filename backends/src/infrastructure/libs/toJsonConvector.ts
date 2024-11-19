import { parseString, Builder } from "xml2js";

export const toJsonConvector = (xml: any) => {
	return new Promise((res, req) => {
		parseString(xml, { explicitArray: false }, function (error, result) {
			//console.log(result.groupDtoes.groupDto);
			if (error) {
				req(error)
			}
			res(result)

		});
	})

}

