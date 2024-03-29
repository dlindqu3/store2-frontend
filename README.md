## overview 
- This site was developed as a portfolio project by Dwight Lindquist. It is the second iteration of his ecommerce store app, this time built with React, Laravel, and SQL. 
- Visitors can create user accounts then browse for various fake products. They can then add products to a cart, proceed to a checkout handled by Stripe, then see records of past orders from their account. The user is advised to use the credit card number "4242 4242 4242 4242" in order to successfully proceed with a fake payment via Stripe. 


## no longer deployed


## walkthrough
![initial home page image](./public/images/site-walkthrough-1.png)
![registration - weak password image](./public/images/site-walkthrough-2.png)
![registration - strong password image](./public/images/site-walkthrough-3.png)
![products page image](./public/images/site-walkthrough-4.png)
![cart page image](./public/images/site-walkthrough-5.png)
![stripe checkout image](./public/images/site-walkthrough-6.png)
![stripe checkout success image](./public/images/site-walkthrough-7.png)
![cart empty after checkout success image](./public/images/site-walkthrough-8.png)
![orders page - one item - image](./public/images/site-walkthrough-9.png)
![orders page - two items - image](./public/images/site-walkthrough-10.png)


## jest testing results 
![jest testing - image](./public/images/jest-screenshot.png)


## product image sources
1. Bike image: photo by Robert Bye on Unsplash. 
2. Coffee mug image: photo by Merve Sehirli Nasir on Unsplash. 
3. Drums image: photo by David Martin on Unsplash.
4. Ukulele image: Photo by Joints Creative on Unsplash.


## run locally 
- app: 
  - npm start 
- jest: 
  - npm test 
- cypress: 
  - run app in one terminal (npm start)
  - run cypress in another terminal (npx cypress open)
    - select "E2E Testing"
    - select your browser 
    - select spec file you want to run 


## testing notes 
- using mock service workers mimics calls to an API without actually making those requests
- So it is cheaper, faster, and more reliable than calling your actual APIs during testing


## citations 
1. The Net Ninja, "MERN Stack Tutorial #8 - Making a React App", [link](https://www.youtube.com/watch?v=bx4nk7kBS10&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=8)
2. "POST Requests with Axios", [link](https://masteringjs.io/tutorials/axios/post)
3. "Importing images from public folder in react", [link](https://stackoverflow.com/questions/71881492/importing-images-from-public-folder-in-react)
4. W.S. Toh, "2 Ways To Check If Value Exists In Javascript Object", [link](https://code-boxx.com/check-value-exists-in-object-javascript/)
5. Nick Scialli, "Why you can't set state multiple times in a row in React", [link](https://typeofnan.dev/why-you-cant-setstate-multiple-times-in-a-row/)
7. "Clearing localStorage in javascript?", [link](https://stackoverflow.com/questions/7667958/clearing-localstorage-in-javascript)
8. "How to trigger useEffects before render in React?", [link](https://stackoverflow.com/questions/63711013/how-to-trigger-useeffects-before-render-in-react)
9. The Net Ninja, "MERN Authentication Tutorial #16 - Protecting React Routes", [link](https://www.youtube.com/watch?v=to-V-LcsXUU)
10. ByteGrad, "Sticky Footer in React (Best Solution)" [link](https://www.youtube.com/watch?v=pggIVY5eOGM)
11. The Net Ninja, "React Testing Library Tutorial #12 - Finding Async Elements with FindBy" [link](https://www.youtube.com/watch?v=V2wWLM8VX5k)
12. TechCheck, "React Testing Library - Mock API Calls - Mock Service Worker (msw)" [link](https://www.youtube.com/watch?v=oMv2eAGWtZU)
13. Stack Overflow, "react-testing-library why is toBeInTheDocument() not a function" [link](https://stackoverflow.com/questions/56547215/react-testing-library-why-is-tobeinthedocument-not-a-function)
14. Stack Overflow, "react jest mock useNavigate()" [link](https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate)
15. Yogesh Chavan, "React Testing Library Tutorial – How to Write Unit Tests for React Apps" [link](https://www.freecodecamp.org/news/write-unit-tests-using-react-testing-library/)
16. Cypress, "Writing Your First E2E Test" [link](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test)
17. Cypress, "Installing Cypress and writing your first test" [link](https://learn.cypress.io/testing-your-first-application/installing-cypress-and-writing-your-first-test)
18. Stack Overflow, "Storing an array of elements using Cypress" [link](https://stackoverflow.com/questions/61196857/storing-an-array-of-elements-using-cypress)
19. Rahman Fadhil, "How to Generate Unique ID in JavaScript" [link](https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13)
20. Cypress, "Best Practices" [link](https://docs.cypress.io/guides/references/best-practices#Using-after-Or-afterEach-Hooks)