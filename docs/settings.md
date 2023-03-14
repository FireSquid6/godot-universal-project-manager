# Settings

### Crawl Results
`crawl_results` - An object containing the results from the last crawl of the tuxfamily repo. Schma should look like:
```json
{
  date: "UTCString",
  links: [
    {
      version: "vX.X.X",
      os: "[win32, win64, osx, linux64, linux32, android]",
      release: "[alpha, rc3, stable, etc.]",
      mono: "[boolean]",
      link: "[url]",
    },
    ...
  ]
}
```


### Versions Path
`versions_path` - A string containing a path to wherever the user has requested that the various godot versions should be stored.