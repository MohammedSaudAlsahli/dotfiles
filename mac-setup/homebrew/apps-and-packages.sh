#!/usr/bin/env zsh

# This file is kept for backward compatibility.
# The Brewfile at the repo root is now the single source of truth.
# Use:  brew bundle --file="$HOME/.dotfiles/Brewfile"
#
# The arrays below are still available for scripts that reference them directly
# (e.g., check_formula_apps, check_cask_apps), but the primary install path
# is now `brew bundle` which reads the Brewfile.

BREWFILE_PATH="$HOME/.dotfiles/Brewfile"

# --- Mac App Store Apps (MAS) ---
# Kept for scripts that need the MAS array specifically.
MAS_APPS=(
	"682658836" # GarageBand
	"408981434" # iMovie
	"361285480" # Keynote
	"361304891" # Numbers
	"361309726" # Pages
	"497799835" # Xcode
)