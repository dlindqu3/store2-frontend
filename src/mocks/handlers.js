import { rest } from "msw";

export const handlers = [
  // useEffect get all products
    // req, res, context 
  rest.get("https://store2-backend.herokuapp.com/api/products", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          "id": 1, 
          "name": "Leanne Graham"
        }
      })
    )
  }),

  // button get all users
    // req, res, context 
  rest.get("https://jsonplaceholder.typicode.com/users", (req, res, ctx) => {
    return res(
      ctx.status(200),
      // this array will be appended to an obj like { data: [ ] }
      ctx.json([
          {
            "id": 1, 
            "name": "Leanne Graham"
          },
          {
            "id": 2, 
            "name": "Ervin Howell"
          }
        ]
      )
    )
  })
]