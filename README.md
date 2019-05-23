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

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

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

## Production

This project can be used atL
[DRM UI](http://drm.istreamplanet.net)

To deploy to production do the following (will require AWS CLI access)

```
docker build -t drm . 
$(aws ecr get-login --no-include-email --region us-east-1)
docker tag drm:latest 625885815701.dkr.ecr.us-east-1.amazonaws.com/drm:latest
docker push 625885815701.dkr.ecr.us-east-1.amazonaws.com/drm:latest
```

Once pushed to ECR region wait a few minutes for fargate to detect the new package and redeploy.
