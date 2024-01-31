const {test, expect} = require("@playwright/test")

test("should be able to UPDATE a new data",
    async ({request}) => {
        const url = ("https://jsonplaceholder.typicode.com/posts/1");
        const postContent = {
            id: 1,
            title: 'efgfr',
            body: 'rtgr',
            userId: 1,
        }

        const options = {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            data: postContent
        }
        let response = await request.put(url, options)
        console.log(response.status())
        const bodyJson = await response.json();
        console.log(bodyJson)

        expect(response.status()).toBe(200)
        const {id, title, body,userId} = bodyJson
        expect(id).toBe(postContent.id)
        expect(title).toBe(postContent.title)
        expect(body).toBe(postContent.body)
        expect(userId).toBe(postContent.userId)


    })