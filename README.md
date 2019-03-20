# Example project for [https://github.com/cypress-io/cypress/issues/3438](https://github.com/cypress-io/cypress/issues/3438)

## To run:

### Run backend

```
cd backend
npm install
npm start
```

### Run frontend

```
cd frontend
npm install
npm start
```

### To see issue run cypress

```
cd backend
npm run cypress:open
run cookieBug.spec.js
```

Issue: When I sign in with a second user the previous cookie does not get set on other paths. (when there is a google workbox service worker)

service worker can be found here: frontend/public/workboxServiceWorker.js
