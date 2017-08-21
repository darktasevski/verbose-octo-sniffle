Publishing Node Modules
=======================

### Prepare The User Account ###

- Create an account on npm
- Run `npm adduser` from the command line

### Prepare The Project ###

Create a repository on GitHub. Then, from the command line in your project folder, run:

- `git init`
- `git remote add origin [url]`
- `npm init`
- `git add .`
- `git commit -m "Commit message"`
- `git push` or `git push origin master`

### Publish The Package ###

- `npm publish`
- `git tag [version number]`
- `git push --tags`

### Publish An Update ###

After making the changes to your code, update the version number in your package.

> Remember the guidelines for [semantic versioning](http://semver.org/):
> 1. MAJOR version when you make incompatible API changes,
> 2. MINOR version when you add functionality in a backwards-compatible manner, and
> 3. PATCH version when you make backwards-compatible bug fixes.
> 
> Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

You can also use npm to update the version number.

- `git add .`
- `git commit -m "Commit message"`
- `npm version [patch|minor|major]`
- `git push --tags`
- `git push`
- `npm publish`

### Publish Alpha or Beta ###

You will have to update the version number manually in `package.json`.

```javascript
{
	...
	"version" : "1.0.0-beta.0",
	...
}
```

- `git add .`
- `git commit -m "Commit message"`
- `git tag [version number]`
- `git push`
- `git push --tags`
- `npm publish --tag beta`

