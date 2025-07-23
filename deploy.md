When you're ready to deploy with github pages, run the following commands:
0) $ git branch gh-pages (you only have to do this once, to create a deploy branch)
1) make sure all you work is committed to the main branch (you can check with 'git status')
2) $ git checkout gh-pages && git merge main --no-edit
3) $ npx webpack
4) $ git add dist -f && git commit -m "Deployment commit"
   $ git subtree push --prefix dist origin gh-pages ('npm run deploy' is set up in package.json)
   $ git checkout main
5) change the source branch for GitHub Pages to the gh-pages branch