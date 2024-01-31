const { test, expect} = require("@playwright/test")
const multiplePostContent = require("../test-data/multiplePostContent.json");

test("should be able to create a new POST", async ({request})=>{
    const url = ("https://jsonplaceholder.typicode.com/posts");


    for (let postContent of multiplePostContent) {
        console.log(postContent)
        const options = {
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            data: postContent
        }
        const response = await request.post(url,options)
        const responseBody = await response.json();
        expect(response.status()).toBe(201)
        const {title, body, userId} = responseBody
        expect(title).toBe(postContent.title)
        expect(body).toBe(postContent.body)
        expect(userId).toBe(postContent.userId)
    }


})