#!/usr/bin/env bash

SYSTEM=$(uname -s)
HARDWARE=$(uname -m)

BREW_OUTPUT=$(brew --version 2>/dev/null)

CASK_APPS=(
  "1password"
  "alacritty"
  "alt-tab"
  "appcleaner"
  "betterdisplay"
  "brave-browser"
  "clop"
  "docker"
  "get-api"
  "hot"
  "kdenlive"
  "keyclu"
  "ledger-live"
  "visual-studio-code"
  "tableplus"
  "stremio"
  "raycast"
  "qbittorrent"
  "obsidian"
  "mounty"
)

FORMULA_APPS=(
  "bat"
  "eza"
  "fzf"
  "ffmpeg"
  "tlrc"
  "tree"
  "htop"
  "python3"
  "node"
  "neovim"
  "nano"
  "lua"
  "openssh"
  "openssl"
  "pandoc"
  "vite"
  "curl"
  "wget"
  "uv"
  "rust"
  "zsh-autocomplete"
  "zsh-autosuggestions"
  "zsh-syntax-highlighting"
  "yt-dlp"
  "powerlevel10k"
  "stow"
)

FONTS=(
  "font-fira-code"
  "font-jetbrains-mono"
  "font-jetbrains-mono-nerd-font"
  "font-meslo-lg-nerd-font"
  "font-roboto"
  "font-source-code-pro"
)

install_homebrew_apps() {
  read -p "Do you want to install Homebrew apps? [y/n] " $install_homebrew_apps

  if [[ "$install_homebrew_apps" =~ ^[Yy]$ ]]; then
    brew install --cask "${cask_apps[@]}"
    brew install "${formula_apps[@]}"
    brew install --cask "${fonts[@]}"

  else
    echo "Skipping Homebrew apps installation."
  
  fi
}

install_homebrew_on_mac(){
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  eval "$(/opt/homebrew/bin/brew shellenv)"
    
  installing_apps
}

update_homebrew() {
  read -p "Do you want to update Homebrew? [y/n] " $update_homebrew_apps

  if [[ "$update_homebrew_apps" =~ ^[Yy]$ ]]; then
    brew update -q
    brew upgrade --g -q
    brew cleanup -q

  else 
    echo "Skipping Homebrew update."

  fi
}

if [[ -n "$BREW_OUTPUT" ]]; then
  echo "Homebrew already installed."

  update_homebrew

else 
  echo "Homebrew is not installed. Installing..."

  if [[ "$SYSTEM" == "Darwin" ]]; then
    echo "Installing Homebrew on macOS..."

    install_homebrew_on_mac
  
  elif [[ "$SYSTEM" == "Linux" ]]; then
    echo "Installing Homebrew on Linux..."
    
  fi
fi 

