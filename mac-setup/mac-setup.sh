#!/usr/bin/env zsh

SETUP_DIR="$HOME/.dotfiles/mac-setup"

# Function to source a script and call its function
run_setup_function() {
    local script_path="$SETUP_DIR/$1"
    local function_name="$2"

    if [ -f "$script_path" ]; then
        echo "🔹 Sourcing $(basename "$script_path")..."
        source "$script_path" # Source the script so the function is available
        echo "⚡ Running $function_name..."
        "$function_name" # Call the function
    else
        echo "❌ Warning: $script_path not found. Skipping..."
    fi
}

# Main mac setup function
mac_setup() {
    echo "🚀 Starting macOS setup..."

    run_setup_function "homebrew/brew-setup.sh" "brew_setup"
    run_setup_function "home/home-setup.sh" "home_setup"
    run_setup_function "defaults/defaults-setup.sh" "defaults_setup"

    echo "✅ macOS setup complete! 🎉"
}

# Run the setup
mac_setup
