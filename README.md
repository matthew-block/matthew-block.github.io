The dev branch is the 'main' branch. Push development changes only to this branch.

You will need npm installed locally along with the angular-cli, and angular-cli-ghpages modules.

To publish an updated version of the site to Github Pages, do the following.
Generate the site with:

ng build --prod --base-href 'https://matthew-block.github.io/'

Publish the site with:

ngh --branch=master

Or just build and post in one command by running updatesite.ps1