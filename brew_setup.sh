#!/usr/bin/env bash

SYSTEM=$(uname -s)
HARDWARE=$(uname -m)

BREW_OUTPUT=$(brew --version 2>/dev/null)

MAS_APPS=(
  "937984704"
  "497799835"
  "409201541"
  "409203825"

)
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
  "mas"
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
  "httpie"
  "wget"
  "curl"
  "uv"
  "rust"
  "zsh-autocomplete"
  "zsh-autosuggestions"
  "zsh-syntax-highlighting"
  "yt-dlp"
  "powerlevel10k"
  "tmux"
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

############# Homebrew ###############
install_homebrew_apps() {
  read -p "Do you want to install Homebrew apps? [y/n] " install_homebrew_apps

  if [[ "$install_homebrew_apps" =~ ^[Yy]$ ]]; then
    brew install --cask --no-quarantine "${CASK_APPS[@]}"
    brew install "${FORMULA_APPS[@]}"
    brew install --cask --no-quarantine "${FONTS[@]}"

  else
    echo "Skipping Homebrew apps installation."

  fi
}

update_and_upgrade_homebrew_apps() {
  echo "Homebrew already installed."

  read -p "Do you want to update Homebrew? [y/n] " update_homebrew_apps

  if [[ "$update_homebrew_apps" =~ ^[Yy]$ ]]; then
    brew update
    brew upgrade -g -q
    brew cleanup -q

  else
    echo "Skipping Homebrew update."

  fi

}

install_homebrew_on_mac() {
  echo "Installing Homebrew on macOS..."

  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  eval "$(/opt/homebrew/bin/brew shellenv)"

  install_homebrew_apps

  mas install "${MAS_APPS[@]}"

}

install_homebrew_on_linux() {
  echo "Installing Homebrew on Linux..."
}

install_homebrew() {
  if [[ -n "$BREW_OUTPUT" ]]; then
    update_and_upgrade_homebrew_apps

  else
    echo "Homebrew is not installed. Installing..."

    if [[ "$SYSTEM" == "Darwin" ]]; then
      install_homebrew_on_mac

    elif [[ "$SYSTEM" == "Linux" ]]; then
      install_homebrew_on_linux

    fi
  fi

}
########################################

# Main functions that contains setup steps
main() {
  install_homebrew
}
########################################

main
