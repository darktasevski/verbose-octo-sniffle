[Git Workflow](http://nvie.com/posts/a-successful-git-branching-model/)
============

Background
With multiple teams working in one repository, problems around branch management and productivity have been coming up. Specifically, we want to address the following problems
How do we keep QA unblocked while keeping master clean for hotfixes after a deployment?
How do we integrate a team’s work without interrupting other teams?
How can we know sooner that integrating a team’s work will break things, and how can we address that before merging to master?
We’ve decided to formalize a branching strategy for the OneExchange repo to deal with these issues. This is inspired by the “git flow” model detailing a branching strategy for release management, adapted to the development process we have in place here. Although the branch names will be different, the git flow graphic on the linked post is a good illustration of how it will work, so refer to that as you read through the description below.

Main branches
master
dev (like the develop branch from git-flow)
Team Branch
We’ll setup the StoryTeller builds to automatically run for all of the main branches, instead of just master, which should help with integrating work and knowing sooner that all is good.
master branch
"We consider origin/master to be the main branch where the source code of HEAD always reflects a production-ready state.”  Once a build has been cleared in the QA environment, the release-* branch is merged to master, and deployed to stage. Any additional fixes made at this point are considered hotfixes and merged to master. All stage and production deployments should be done from the master branch.
dev branch
This is branched from master and becomes a long-lived branch. Hotfixes merged to master would also be merged back down to this branch, either when they’re merged to master or by merging master to dev after a release (depending on how soon they’re needed). This branch is where features from each team can be merged once they are cleared in a team-specific QA environment. Once a feature is merged into this branch, it should have been cleared by QA and ready to be a part of a release. This branch should have passing StoryTeller tests before merging to master. Items pushed into this branch should be ready for a test run to begin without having to clear the entire item in QA.
Team Branches
This is branched from dev and should be used for clearing items assigned to a team. When an item is ready to be cleared, it will get merged from the feature branch to the team branch. From the team branch, a deployment can happen to a team specific environment in order to clear the item. This branch should never be merged to the dev branch. This branch is meant to serve as a point to deploy items to a team specific QA environment. 
feature branches
Feature branches must branch from and merge into the dev branch.  These branches should be pushed to the CI and have the appropriate StoryTeller tests ran before a pull request can be pulled in. Please note: Not all StoryTeller tests need to be ran. Try to find the applicable StoryTeller tests to run. Any pull request with failing StoryTeller tests should not be merged. This branch will be merged into a team branch to be cleared by QA in a team-specific QA environment. Once cleared in a team-specific QA environment, this branch can move into the dev branch. Feature defects found in a team-specific branch should be fixed on the feature branch and pushed back into the team branch so that they can continue to be verified by QA.
Support branches
Hotfix/bugfix branches
Hotfix branches are branched from the master branch in order to fix production showstoppers or bugs found while readying a release in stage. These merge back to master via pull requests and also downward to dev and team branches if necessary (ideally by merging from master). Bugfix branches for defects in QA should branch from and merge into the release-* branch via pull request, so they don’t get stuck with any other pending work in the team branch.

Other considerations
Currently the only naming convention for feature/bug branches is the issue ID in the branch name. If it is a hotfix that will be merged to master, the hotfix-* convention can be used and storyteller builds will be queued up on this branch.
