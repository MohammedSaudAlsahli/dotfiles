#!/usr/bin/env zsh

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

source "$SCRIPT_DIR/apps-and-packages.sh"

if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ This script is designed for macOS only."
    exit 1
fi

# Install Homebrew on macOS
install_brew() {
    printf "🍺 Do you want to install Homebrew? [y/n] "
    read -r agreement

    if [[ "$agreement" =~ ^[Yy]$ ]]; then
        echo "⬇️ Installing Homebrew..."

        if /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"; then
            echo "🎉 Homebrew installed successfully!"

            # Ensure Homebrew environment is properly set up
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

# Install Homebrew packages
install_brew_packages() {
    printf "📦 Do you want to install Homebrew apps? [y/n] "
    read -r agreement

    if [[ "$agreement" =~ ^[Yy]$ ]]; then

        echo "⬇️ Installing Homebrew packages..."
        brew install "${FORMULA_APPS[@]}" || {
            echo "⚠️ Failed to install Formula apps."
            return 1
        }

        echo "⬇️ Installing Homebrew apps..."
        brew install --cask --no-quarantine "${CASK_APPS[@]}" || {
            echo "⚠️ Failed to install Cask apps."
            return 1
        }

        echo "⬇️ Installing Homebrew fonts..."
        brew install --cask --no-quarantine "${FONTS[@]}" || {
            echo "⚠️ Failed to install Fonts."
            return 1
        }

        echo "⬇️ Installing Mac App Store apps..."
        mas install "${MAS_APPS[@]}" || {
            echo "⚠️ Failed to install Mac App Store apps."
            return 1
        }

        echo "✅ Homebrew and Mac App Store apps installed successfully!"
    else
        echo "⏭️ Skipping Homebrew and Mac App Store apps installation."
    fi
}

# Update and upgrade Homebrew packages
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

# Set up Homebrew (install or update)
setup_homebrew() {
    echo "⚙️ Setting up Homebrew..."

    # Check if Homebrew is installed
    if command -v brew >/dev/null 2>&1; then
        echo "✅ Homebrew is already installed."
        update_and_upgrade_brew_packages || return 1
    else
        echo "❌ Homebrew is not installed. Installing..."

        install_brew || return 1
        install_brew_packages
    fi

}
