# DRM UI

A web UI to configure and run live video channels. Commander uses the following technologies:

- [Node.js](https://nodejs.org/en/) & [Yarn](https://yarnpkg.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [JSX](https://reactjs.org/docs/introducing-jsx.html)
- [Pebble](http://pebble-dev.s3-website-us-west-2.amazonaws.com/)


## Development

To get started, check out this repo, make sure you have Node.js and Yarn installed and then:

```sh
# First check out the project, then get the dependencies
$ git clone git@github.com:rustamk-isp/AtlasDRM-UI.git
$ cd AtlasDRM-UI
$ yarn install

# Run the app!
$ yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. You will be asked to authenticate against the staging environment.

Note that this project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/) & [imperative mood](https://chris.beams.io/posts/git-commit/#imperative), and automatically enforces code style and commits using:

- [husky](https://github.com/typicode/husky) & [lint-staged](https://github.com/okonet/lint-staged) for Git hooks.
- [Prettier](https://prettier.io/) for automatic code & style formatting.
- [ESLint](https://eslint.org/) with [typescript-eslint](https://typescript-eslint.io) for linting.
- [stylelint](https://stylelint.io/) for CSS/SASS linting.

Everything but the tests will run automatically when you try to commit. 

## Deployment

This project includes a `Dockerfile` which will build a production version of DRM-UI as minified static HTML/JS/CSS assets using `yarn build` and then put them (and our custom `nginx.conf`) into a minimal [nginx](https://www.nginx.com/) container based on [Alpine](https://alpinelinux.org/).

To build and run locally:

```sh
# Build the image
$ docker build -t drm .

# Run it!
$ docker run -p 3000:80 dr,
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

For more information on how to deploy React apps, look at the [deployment documentation](https://facebook.github.io/create-react-app/docs/deployment) from Create React App.
