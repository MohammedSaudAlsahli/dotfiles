#!/usr/bin/env zsh

# Function to add apps to login items (all apps will be hidden)
add_apps_to_login() {
    SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
    source "$SCRIPT_DIR/at-login-apps.sh"

    # Function to add a single app to login items
    add_app_to_login() {
        local app_path="$1"

        # Check if the app path exists and points to a valid .app bundle
        if [[ -d "$app_path" && "$app_path" == *.app ]]; then
            osascript -e "tell application \"System Events\" to make login item at end with properties {path:\"$app_path\", hidden:true}"
            if [[ $? -eq 0 ]]; then
                echo "✅ Added to login items (hidden): $app_path"
            else
                echo "❌ Failed to add to login items: $app_path"
            fi
        else
            echo "❌ Invalid app path: $app_path (Must be a valid .app bundle)"
        fi
    }

    # Ask the user if they want to clear existing login items
    printf "🧹 Do you want to remove all existing login items? [y/n] "
    read -r agreement

    if [[ "$agreement" =~ ^[Yy]$ ]]; then
        osascript -e "tell application \"System Events\" to delete every login item"
        if [[ $? -eq 0 ]]; then
            echo "🗑️ Removed all existing login items."
        else
            echo "❌ Failed to remove existing login items."
        fi
    else
        echo "🔍 Keeping existing login items."
    fi

    # Add each app to login items (all apps will be hidden)
    for app in "${AT_LOGIN_APPS[@]}"; do
        add_app_to_login "$app"
    done

    echo "🎉 Login items configuration updated successfully!"
}

settings_setup() {
    echo "⚙️ Starting settings setup..."
    add_apps_to_login
    echo "✅ Settings setup completed!"
}

settings_setup
