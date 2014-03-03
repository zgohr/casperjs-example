
## CasperJS to screenshot and test 

OSX use brew to install

```
brew update
brew install casperjs --devel
```

Or [see here for more installation options](http://docs.casperjs.org/en/latest/installation.html)

To run the tests:

```
casperjs test test-google.js
```

Whats next?

Creating diffs between previous screenshot runs with something like [automated-screenshot-diff](https://github.com/igorescobar/automated-screenshot-diff)
