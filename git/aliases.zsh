# Use `hub` as our git wrapper:
#   http://defunkt.github.com/hub/
hub_path=$(which hub)
if (( $+commands[hub] ))
then
  alias git=$hub_path
fi

# The rest of my fun git aliases
alias gl='git pull --prune'
alias glog="git log --graph --pretty=format:'%Cred%h%Creset %an: %s - %Creset %C(yellow)%d%Creset %Cgreen(%cr)%Creset' --abbrev-commit --date=relative"
alias gp='git push origin HEAD'

# Remove `+` and `-` from start of diff lines; just rely upon color.
alias gd='git diff --color | sed "s/^\([^-+ ]*\)[-+ ]/\\1/" | less -r'

alias gc='git commit'
alias gca='git commit -a'
alias gco='git checkout'
alias gcb='git copy-branch-name'
alias gb='git branch'
alias gs='git status -sb' # upgrade your git if -sb breaks for you. it's fun.
alias gac='git add -A && git commit -m'
alias ge='git-edit-new'


# # View abbreviated SHA, description, and history graph of the latest 20 commits.
# 	l = log --pretty=oneline -n 20 --graph --abbrev-commit

# 	# View the current working tree status using the short format.
# 	s = status -s

# 	# Show the diff between the latest commit and the current state.
# 	d = !"git diff-index --quiet HEAD -- || clear; git --no-pager diff --patch-with-stat"

# 	# `git di $number` shows the diff between the state `$number` revisions ago and the current state.
# 	di = !"d() { git diff --patch-with-stat HEAD~$1; }; git diff-index --quiet HEAD -- || clear; d"

# 	# Pull in remote changes for the current repository and all its submodules.
# 	p = pull --recurse-submodules

# 	# Clone a repository including all submodules.
# 	c = clone --recursive

# 	# Commit all changes.
# 	ca = !git add -A && git commit -av

# 	# Switch to a branch, creating it if necessary.
# 	go = "!f() { git checkout -b \"$1\" 2> /dev/null || git checkout \"$1\"; }; f"

# 	# Show verbose output about tags, branches or remotes
# 	tags = tag -l
# 	branches = branch --all
# 	remotes = remote --verbose

# 	# List aliases.
# 	aliases = config --get-regexp alias

# 	# Amend the currently staged files to the latest commit.
# 	amend = commit --amend --reuse-message=HEAD

# 	# Credit an author on the latest commit.
# 	credit = "!f() { git commit --amend --author \"$1 <$2>\" -C HEAD; }; f"

# 	# Interactive rebase with the given number of latest commits.
# 	reb = "!r() { git rebase -i HEAD~$1; }; r"

# 	# Remove the old tag with this name and tag the latest commit with it.
# 	retag = "!r() { git tag -d $1 && git push origin :refs/tags/$1 && git tag $1; }; r"

# 	# Find branches containing commit
# 	fb = "!f() { git branch -a --contains $1; }; f"

# 	# Find tags containing commit
# 	ft = "!f() { git describe --always --contains $1; }; f"

# 	# Find commits by source code
# 	fc = "!f() { git log --pretty=format:'%C(yellow)%h  %Cblue%ad  %Creset%s%Cgreen  [%cn] %Cred%d' --decorate --date=short -S$1; }; f"

# 	# Find commits by commit message
# 	fm = "!f() { git log --pretty=format:'%C(yellow)%h  %Cblue%ad  %Creset%s%Cgreen  [%cn] %Cred%d' --decorate --date=short --grep=$1; }; f"

# 	# Remove branches that have already been merged with main.
# 	# a.k.a. ‘delete merged’
# 	dm = "!git branch --merged | grep -v '\\*' | xargs -n 1 git branch -d"

# 	# List contributors with number of commits.
# 	contributors = shortlog --summary --numbered

# 	# Show the user email for the current repository.
# 	whoami = config user.email
