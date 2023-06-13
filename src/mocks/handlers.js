import { rest } from "msw";
import { products } from "./responses";

export const handlers = [
  // useEffect get all products
    // req, res, context 
  rest.get("https://store2-backend.herokuapp.com/api/products", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: products
      })
    )
  })
]