require('dotenv').config()
const {test, expect} = require("@playwright/test")

test("Should be able to perform CRUD on post type",async({request})=>{
    const bareUrl = process.env.BARE_URL;
    const postContent =  {
        title: 'foo',
        body: 'bar',
        userId: 1,
    }
    const putContent = {
        title: 'toi là teo',
        body: 'dbfvjkdgk',
        userId: 1,
    }
    const headers = {
        'Content-type': 'application/json; charset=UTF-8'
    }
    const postOptions = {
        headers: headers,
        data: postContent
    }
    const putOptions = {
        headers: headers,
        data: putContent
    }
    const postRes = await request.post(bareUrl + '/posts',postOptions)
    const postJsonBody = await postRes.json();
    let postId = postJsonBody.id;
    postId = Number(postId)-1;

    expect(postRes.status()).toBe(201)
    const {title, body, userId} = postJsonBody
    expect(title).toBe(postContent.title)
    expect(body).toBe(postContent.body)
    expect(userId).toBe(postContent.userId)

    const getRes = await request.get(`${bareUrl}/posts/${postId}`);
    expect(getRes.status()).toBe(200);

    const putRes = await request.put(`${bareUrl}/posts/${postId}`,putOptions)
    const putJsonBody = await putRes.json();
    console.log(putJsonBody)
    expect(putRes.status()).toBe(200)

    const deleteRes = await request.delete(`${bareUrl}/posts/${postId}}`)
    expect(deleteRes.status()).toBe(200)


})