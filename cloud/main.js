// Use Parse.Cloud.define to define as many cloud functions as you want.
Parse.Cloud.define("authorize", async (request) => {
	const TOKEN = request.params.token;
	if(("Token token=" + process.env.PLATFORM_KEY) == TOKEN){
		return await true;
	}
	return await false;
});