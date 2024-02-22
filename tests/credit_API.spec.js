const {expect} = require("@playwright/test");
const {test, request} = require ('@playwright/test')

test("credit system", async ({request})=>{
const URL = ('https://api-dev.referreach.com/v1/auth/sign_in');
const postContent = {
    user: {
        email: "minh.ha+o10@referreach.com",
        password: "Referreach1!"
    }
}

const options = {
    headers: {
        'Content-type': 'application/json'
    },
    data: postContent,
}
    const response = await request.post(URL,options)
    const responseBody = await response.json();
    expect(response.status()).toBe(200)
    expect(responseBody.success).toBe(true)
    const {access_token, token_type} = responseBody.token_info
    const auth = `${token_type} ${access_token}`
    console.log(auth)

    //get profile match
    const urlGet = ('https://api-dev.referreach.com/api/v1/profile_matches?first_id=3')
    const getOptions = {
        headers:{
            'Accept': '*/*',
            'Authorization': auth
        }
    };
    const getRes = await request.get(urlGet,getOptions);
    const getJsonBody = await getRes.json();
    console.log(getJsonBody)
    expect(getRes.status()).toBe(200)

});