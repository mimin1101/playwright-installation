const {expect} = require("@playwright/test");
const {test} = require ('@playwright/test')

test("credit system", async ({request})=>{
const URL = ('https://api-dev.referreach.com/v1/auth/sign_in');
const postContent = {
    user: {
        email: "minh.ha+o16@referreach.com",
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
    //get balance
    const urlGetBalance = ('https://api-dev.referreach.com/api/v1/users/credit_info')
    const getBalanceOptions = {
        headers: {
            'Accept': '*/*',
            'Authorization': auth
        }
    };
    const getBalanceRes = await request.get(urlGetBalance,getBalanceOptions)
    const getBalanceJsonBody = await getBalanceRes.json();
    expect(getBalanceRes.status()).toBe(200);
    const balance = getBalanceJsonBody.balance
    console.log(balance)

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
    const lockProfile = getJsonBody.data[0].id
    console.log(lockProfile)
    expect(getRes.status()).toBe(200)

    // Unlock profile (post)
    const urlPost = ('https://api-dev.referreach.com/api/v1/credit_histories/unlock_profile')
    const content ={
        "metadata": {
            "profile_match_id": lockProfile
        }
    }
    const postOptions ={
        headers: {
            'Accept': '*/*',
            'Authorization': auth
        },
        data: content
    }
    const postRes = await request.post(urlPost,postOptions);
    const postResponseBody = await postRes.json();
    console.log(postResponseBody);
    if(postRes.status()===201){
        expect(postResponseBody.id).toBeDefined();
    }
    else{
        expect(postResponseBody.error).toBeDefined();
    }

});