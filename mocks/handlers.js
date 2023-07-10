// src/mocks/handlers.js
import { rest } from 'msw'

const colorGenerator = () => {
  const ARR = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  let hexCode = '#';
  for (let i = 0; i < 6; i++) {
    let rand = Math.round(Math.random() * 15);
    hexCode += ARR[rand];
  }
  return hexCode;
};

const setFontColor = backgroundColor => {
  backgroundColor = backgroundColor.slice(1);
  let r = parseInt(backgroundColor.slice(0, 2), 16);
  let g = parseInt(backgroundColor.slice(2, 4), 16);
  let b = parseInt(backgroundColor.slice(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'black' : 'white';
};

const getColors = () => {
  let colorObj = [];
  for (let i = 0; i < 40; i++) {
    let backgroundColor = colorGenerator();
    colorObj.push({
      backgroundColor,
      fontColor: setFontColor(backgroundColor),
    });
  }
  return colorObj;
};


export const handlers = [
  rest.get('/color', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(getColors()),
      ctx.delay(Math.round(Math.random() * 3000 + 500))
    )
  }),

  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true')

    return res(
      // Respond with a 200 status code
      ctx.status(200),
    )
  }),

  rest.get('/user', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem('is-authenticated')

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      )
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),
]