const {test, expect} = require("@playwright/test")

test("should be able to Delete data", async({request})=>{
    const url = ("https://jsonplaceholder.typicode.com/posts/1");
    const response = await request.delete(url)
    const bodyJson = await response.json();
    console.log(bodyJson);

    expect(response.status()).toBe(200)
})