const {test,request, expect} = require("playwright/test")
test('should be abel to send a GET method request',async({request})=>{
  let response = await request.get("https://jsonplaceholder.typicode.com/posts",{
    headers :{
      "Authorization" : "bear fdjbvkbgfkbnvkjgfn",
      "content-type" : "jhbjkbk",
    }
  })

  const status = await response.status();
  const jsonResponse = await response.json();
  const firstPost = jsonResponse[0];
  console.log(firstPost)

  expect(status).toBe(200);
  expect(jsonResponse.length).toBeGreaterThan(1);
  const{userId, id, title, body} = firstPost
  expect(userId).toBe(1);
  expect(id).toBe(1);
  expect(title).toBeTruthy();
  expect(body).toBeTruthy();
})