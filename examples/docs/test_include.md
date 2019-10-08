

## links

[document][https://github.com/threefoldfoundation/info_tokens/blob/master/docs/what_are_tfts.md]

- [link](threefoldtech:home(master):schemas/readme.md)
- [link](threefoldtech:home:projects/readme.md)
- [link](https://github.com/threefoldfoundation:projects/readme.md)
- [link](https://github.com/threefoldfoundation:readme.md)
  - when more than 1 file which matches use the shortest path so in this case will be in home folder
- [link](https://gitlab.com/threefoldforks/Threefold-Circles-back:CODE_OF_CONDUCT.md)



## includes 1

```
needs to walk over all files in threefoldtech:jumpscaleX_core till it finds 'schemas/readme.md' in path
if more than 1 then error
needs to cache this for 1h (like check of links, also there caching of 1h)
```

!!!include("threefoldtech:home:projects/readme.md")

## includes 2

!!!include("threefoldtech:home(master):projects/readme.md")

## includes 3

!!!include("threefoldtech:home:book.json")

```
if json or yaml or toml, py, js, ...
then put in codeblock
```

!!!include("threefoldtech:jumpscaleX_libs(development):macros/dot.py")

## includes 4

```
when no extension checks for .md
when no account or repo then is current repo
```
!!!include("small")
!!!include("small.md")

## includes 5

```
when no extension checks for .md
when no account or repo then is current repo
```

!!!include("home:networks")

## include long

!!!include("https://gitlab.com/threefoldforks/Threefold-Circles-back:CODE_OF_CONDUCT.md")

```
when https and : inside then it means it needs to be a git repo (can be gitlabs or gogs too) so the code will be checked out and fhe file looked for
when https and no : then its a real link which can be downloaded with curl
```

!!!include("https://gitlab.com/threefoldforks/Threefold-Circles-back/raw/master/CODE_OF_CONDUCT.md")

