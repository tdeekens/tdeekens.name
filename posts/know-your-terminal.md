# Know your Terminal

## Yes, this is nerdism

Oh my. I know: this is pure nerdism. Don't feel frightend or change your perception of me. If you're not into the Terminal, don't be frightened! A year ago I was getting goose bumps every time I had to touch that dark corner of my OS. Nevertheless, the more you use and get to know your shell, the more you'll like it.

## Fancy a zsh

Oh my. [Oh_my_zsh](github.com/robbyrussell/oh-my-zsh) will make your like the shell even more. It gives you auto-completion, themes and a lightweight plugin-architecture. All in all a road from which I'd never want to go back.

## Some commands: tricky di trick

* $ !!
   * Runs the previous command. You might have run a command needing sudo without knowing
   * Just re-run: $ sudo !!
* $ !$
   * Takes the last command's last argument.
   * Instead of: $ touch readme.md && sublime readme.md
   * Just run: $ touch readme.md && sublime !$
* $ !:n
   * Gets the n-th argument of your last command's argument-stack.
   * $ touch readme.md docs.md && sublime !:1
* $ mv readme.{text, md}
   * Called expansion lists which can do a whole lot more.
   * In the example they expand on readme. and therefore generate: $ mv readme.txt readme.md
* ctrl + r
   * Ever up-arrowed till infinity to find an old command? This allows you to search all your previous commands and run them right away. This was truly a eurka moment for me.

# Some thoughts

First of all your should alias all the things. Typing takes time, takes time of your breaks. Find out about commands you run often and customize your own aliases. Most fancy dotfile-repositories come with good ideas on what to alias. Don't take those for granted just keep on thinking and customizing.

These are my personal aliases on [GitHub](https://github.com/tdeekens/dotfiles/blob/master/.aliases).

If you want to use aliases for git you can also add them to your .gitconfig. For inspiration you might aswell checkout mine on [GitHub](https://github.com/tdeekens/dotfiles/blob/master/.gitconfig#L37).

Now I will leave you alone with your Terminal for a while. If you leanred anything don't hesitate to get back to me and teach me some more nerdism.