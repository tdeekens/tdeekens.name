# Private blog available at [tdeekens.name](http://tdeekens.name)

This is a backup of my private blog build on top of [lmvc](https://github.com/scandio/lmvc) and [lmvc-modules](https://github.com/scandio/lmvc-modules).

## Installation

Please have [composer](http://getcomposer.org/) available globally in your path.

1. Start shell and cd into your localhost's root
2. Fire the command `bash -c "$(curl -fsSL http://git.io/AEPfRg)"`
3. There is no other step, the blog is good to go under your [localhost](http://localhost/tdeekens.name)!

## How it works

Don't expect too much here. It's all done the easy way!

Some templates are in mustache and are loaded by using a special [controller trait](app/controllers/traits/Mustache.php). This is true for example for the [post-listing template](app/views/posts/posts.mustache). Please do not ask why, I just want to play around. I learned that there is not use in a templating language without support for inline php as it kinda kills using any external php helpers. Maybe another templating language eludes this issue.

Post-handling, music-listing etc. is all accomplished by using index-files in `*.json`-format. They can be found in the [index-files](app/index-files) directory as their internal folder structure follows the view's folder hierarchy. Loading these index-files or also fairly easy by using yet another [controller-trait](app/controllers/traits/IndexFile.php).
Listing some posts can therefore be done by some code [like the following](https://github.com/tdeekens/tdeekens.name/blob/347caba92710bef974451d28935744c186b44c09/app/controllers/About.php#L16-21).

All in all, there's a lot of work performed on the Assetpipe Line as it compiles all the markdown which is heavily used for almost all written words - [an example here](app/views/books/index.html#L21) [or here](app/views/posts/read.html#L6-14). Plus, image and JavaScript loading to no surprise.

Actually, there is not much more to it - apart from the usual lmvc stories.

## In Production (pushing to live TLD)

### The Git Way

The easiest way is mostly the best, therefore having `ssh` and `git` on your remote live system helps to ease the way. Just activate a `post_recieve`-hook checking out into the `working-tree` somewhere.

The hook's code shell-script might look like:

```bash
git checkout -f

sh /htdocs/scripts/cache.sh clear /htdocs/app
```

Where the second part uses the [cache-script](scripts/cache.sh) to clean all the [Asset Pipeline's](https://github.com/scandio/lmvc-modules/tree/master/lib/Scandio/lmvc/modules/assetpipeline) caching directories.

Simply running a `git push origin master` would therefore update your running site as needed.

### The FTP Way

I recommend having a look at [git-ftp](https://github.com/git-ftp/git-ftp) for this. A great tool handling all the logic of only uploaded changed files to a specified remote ftp-host.

After installing (`brew install git-ftp`) and setting it up simply running `git ftp push` would do all the works but *will leave you with dirty cache directories*. In case you have the stage on the Asset Pipeline in the state-directive at 'prod' which will omitt checking for modified files and therefore aggressively force caching for performance. Leaving it at its default in 'dev' will obviously be a bit more forgiving in that regard.

**There's not more to add...**