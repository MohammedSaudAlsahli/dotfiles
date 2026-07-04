#!/usr/bin/env zsh

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
DOTFILES_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
BREWFILE_PATH="$DOTFILES_ROOT/Brewfile"

if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ This script is designed for macOS only."
    exit 1
fi

install_brew() {
    printf "🍺 Do you want to install Homebrew? [y/n] "
    read -r agreement

    if [[ "$agreement" =~ ^[Yy]$ ]]; then
        echo "⬇️ Installing Homebrew..."

        if /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"; then
            echo "🎉 Homebrew installed successfully!"

            if eval "$(/opt/homebrew/bin/brew shellenv)"; then
                echo "✅ Homebrew environment configured."
            else
                echo "⚠️ Failed to configure Homebrew environment."
                return 1
            fi
        else
            echo "❌ Homebrew installation failed."
            return 1
        fi
    else
        echo "⏭️ Skipping Homebrew installation."
    fi
}

install_brew_packages() {
    printf "📦 Do you want to install all apps from the Brewfile? [y/n] "
    read -r agreement

    if [[ "$agreement" =~ ^[Yy]$ ]]; then
        echo "⬇️ Installing everything from Brewfile..."
        brew bundle --file="$BREWFILE_PATH" || {
            echo "⚠️ Some packages failed to install. Check the output above."
            return 1
        }
        echo "✅ All Brewfile packages installed successfully!"
    else
        echo "⏭️ Skipping Brewfile installation."
    fi
}

update_and_upgrade_brew_packages() {
    printf "🔄 Do you want to update and upgrade Homebrew and Mac App Store apps? [y/n] "
    read -r agreement

    if [[ "$agreement" =~ ^[Yy]$ ]]; then
        echo "⬆️ Updating Homebrew..."
        brew update || {
            echo "⚠️ Failed to update Homebrew."
            return 1
        }
        echo "✅ Homebrew updated successfully."

        echo "⏫ Upgrading Homebrew packages..."
        brew upgrade || {
            echo "⚠️ Failed to upgrade Homebrew packages."
            return 1
        }

        echo "⬆️ Upgrading Cask apps..."
        brew upgrade --cask || {
            echo "⚠️ Failed to upgrade Cask apps."
            return 1
        }

        echo "⬆️ Upgrading Mac App Store apps..."
        mas upgrade || {
            echo "⚠️ Failed to upgrade Mac App Store apps."
            return 1
        }

        echo "🧹 Cleaning up Homebrew..."
        brew cleanup || {
            echo "⚠️ Failed to clean up Homebrew."
            return 1
        }
        echo "✅ Homebrew cleaned up successfully."
    else
        echo "⏹️ Skipping Homebrew update and upgrade."
    fi
}

check_brewfile_status() {
    echo "🔍 Checking Brewfile status..."
    brew bundle check --file="$BREWFILE_PATH" 2>/dev/null || {
        echo "⚠️ Some packages from the Brewfile are missing."
        printf "📦 Do you want to install missing packages? [y/n] "
        read -r agreement
        if [[ "$agreement" =~ ^[Yy]$ ]]; then
            brew bundle --file="$BREWFILE_PATH"
        fi
    }
}

brew_setup() {
    echo "⚙️ Setting up Homebrew..."

    if command -v brew >/dev/null 2>&1; then
        echo "✅ Homebrew is already installed."
        check_brewfile_status
        update_and_upgrade_brew_packages || return 1
    else
        echo "❌ Homebrew is not installed. Installing..."
        install_brew || return 1
        install_brew_packages
    fi
}