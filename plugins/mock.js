import { worker } from "@/mocks/browser";
// import { handlers } from '../mocks/handlers';
// import { setupWorker } from 'msw';

// 2. Describe network behavior with request handlers.


// 3. Start request interception by starting the Service Worker.


export default defineNuxtPlugin(() => {
    worker.start();
    // console.log(handlers);
    // const worker = setupWorker(...handlers);
    // worker.start({ onUnhandledRequest: "bypass", });
});

