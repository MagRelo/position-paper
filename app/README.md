# Talent Relay

## Overview

- Project code is all in `/app` (other stuff is for Ethereum - might use it some day...)
  - Frontend: `app/src/`
  - Backend: `app/server/`

## Development

Setup:

- Make sure `mongodb`, `node` and `yarn` are installed
- Have Mongodb running locally on port 27017 (default)
- Add `.env` config file to `/app` (ping me)
- Install project dependencies (run in `/app`): `$ yarn add`
- Seed MongoDb with jobs (optional): `$ yarn run restore-db`

Start in terminal (run in seperate tabs):

- Frontend Dev Server:
  `$ yarn start`
- Backend Dev Server:
  `$ yarn run dev`

## Build & Deploy

- Build Staging: `$ yarn run build-staging`
- Build Production: `$ yarn run build-prod`
- SSH: `$ yarn run ssh` (You'll need a key from Digital Ocean - ping me if needed)
