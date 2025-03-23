#!/usr/bin/env zsh

# Disable app launch animations.
defaults write com.apple.dock launchanim -bool false

# Set minimize effect to "genie".
defaults write com.apple.dock mineffect -string "genie"

# Minimize windows into app icons.
defaults write com.apple.dock minimize-to-application -bool true

# Move Dock to the left side of the screen.
defaults write com.apple.dock orientation -string "left"

# Show indicators for running apps.
defaults write com.apple.dock show-process-indicators -bool true

# Hide "Recent Applications" in the Dock.
defaults write com.apple.dock show-recents -bool false

# Disable "Show Desktop" gesture.
defaults write com.apple.dock showDesktopGestureEnabled -bool false

# Disable "Launchpad" gesture.
defaults write com.apple.dock showLaunchpadGestureEnabled -bool false

# Set Dock icon size to 40 pixels.
defaults write com.apple.dock tilesize -int 40
