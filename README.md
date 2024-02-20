

## About the app

site: https://yozen0405.github.io/bs-cal/

This project was originally forked from [dletulle/brawl-stars-power-level-calculator](https://github.com/dletulle/brawl-stars-power-level-calculator), and some current feature were added,  therefore, creating a new software seemed like the natural next step.
It helps the player calculate how many resources they need to upgrade from the current level to the desired level, including gadgets, star power, gears and hypercharge. 

## Setting Up the Project Locally

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). In the project directory, you can run `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000/) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

you also might need to install npm, and do `npm install` in your folder, if it still doesn't work, try to type `npm audit fix --force`.

## Deploy to github pages

### 1. Install the `gh-pages` npm package

First of all, go to github and create a new repository. And then, run the following command.

```
$ npm install gh-pages --save-dev
```

At this point, the `gh-pages` npm package is installed on your computer and the React app's dependence upon it is documented in the React app's `package.json` file.

### 2. Add a `homepage` property to the `package.json` file

Open the `package.json` file in a text editor. Add a `homepage` property in this format*: `https://{username}.github.io/{repo-name}`

```
{
  "name": "my-app",
  "version": "0.1.0",
+ "homepage": "https://gitname.github.io/react-gh-pages",
  "private": true,
```

Add a `predeploy` property and a `deploy` property to the `scripts` object:

```
"scripts": {
+   "predeploy": "npm run build",
+   "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
```

At this point, the React app's `package.json` file includes deployment scripts.

Add a "[remote](https://git-scm.com/docs/git-remote)" to the local Git repository. You can do that by issuing a command in this format:

```
$ git remote add origin https://github.com/{username}/{repo-name}.git
```

> if you have an issue with git remote add origin, see https://www.youtube.com/watch?v=H3KjgiBaakM

### 3. Push the React app to the GitHub repository

Here comes the most tricky part, not like the way [we usually done](https://stackoverflow.com/questions/48919200/github-pages-only-showing-readme-file), we need to run this command in order to push the react app to the GitHub repository

```
$ npm run deploy
```

That will cause the `predeploy` and `deploy` scripts defined in `package.json` to run.

Under the hood, the `predeploy` script will build a distributable version of the React app and store it in a folder named `build`. Then, the `deploy` script will push the contents of that folder to a new commit on the `gh-pages` branch of the GitHub repository, creating that branch if it doesn't already exist.

At this point, the GitHub repository contains a branch named `gh-pages`, which contains the files that make up the distributable version of the React app. However, we haven't configured GitHub Pages to *serve* those files yet.

### 4. Configure GitHub Pages

1. Navigate to the GitHub Pages settings page
   1. In your web browser, navigate to the GitHub repository
   2. Above the code browser, click on the tab labeled "Settings"
   3. In the sidebar, in the "Code and automation" section, click on "Pages"
2. Configure the "Build and deployment" settings like this:
   1. **Source**: Deploy from a branch
   2. Branch
      - Branch: `gh-pages`
      - Folder: `/ (root)`

And then your site will be at {username}.github.io/{repo}.

see more information in: https://github.com/gitname/react-gh-pages