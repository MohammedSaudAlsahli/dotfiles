#!/usr/bin/env zsh

# Function to configure Dock defaults
configure_dock_defaults() {
    echo "⚙️ Configuring Dock defaults..."

    # Disable app launch animations.
    defaults write com.apple.dock launchanim -bool false
    echo "✅ Disabled app launch animations."

    # Set minimize effect to "genie".
    defaults write com.apple.dock mineffect -string "genie"
    echo "✅ Set minimize effect to 'genie'."

    # Minimize windows into app icons.
    defaults write com.apple.dock minimize-to-application -bool true
    echo "✅ Enabled minimizing windows into app icons."

    # Move Dock to the left side of the screen.
    defaults write com.apple.dock orientation -string "left"
    echo "✅ Moved Dock to the left side of the screen."

    # Show indicators for running apps.
    defaults write com.apple.dock show-process-indicators -bool true
    echo "✅ Enabled indicators for running apps."

    # Hide "Recent Applications" in the Dock.
    defaults write com.apple.dock show-recents -bool false
    echo "✅ Hidden 'Recent Applications' in the Dock."

    # Disable "Show Desktop" gesture.
    defaults write com.apple.dock showDesktopGestureEnabled -bool false
    echo "✅ Disabled 'Show Desktop' gesture."

    # Disable "Launchpad" gesture.
    defaults write com.apple.dock showLaunchpadGestureEnabled -bool false
    echo "✅ Disabled 'Launchpad' gesture."

    # Set Dock icon size to 40 pixels.
    defaults write com.apple.dock tilesize -int 40
    echo "✅ Set Dock icon size to 40 pixels."
}

# Function to add apps to the Dock
add_apps_to_dock() {
    local DOCK_PLIST="$HOME/Library/Preferences/com.apple.dock.plist"

    SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
    source "$SCRIPT_DIR/dock-apps.sh"

    # Function to add a single app to the Dock
    add_app_to_dock() {
        local app_path="$1"
        if [[ -d "$app_path" ]]; then
            defaults write "$DOCK_PLIST" persistent-apps -array-add "<dict>
                <key>tile-data</key>
                <dict>
                    <key>file-data</key>
                    <dict>
                        <key>_CFURLString</key>
                        <string>file://$app_path/</string>
                        <key>_CFURLStringType</key>
                        <integer>15</integer>
                    </dict>
                    <key>file-label</key>
                    <string>$(basename "$app_path" .app)</string>
                    <key>file-type</key>
                    <integer>41</integer>
                </dict>
                <key>tile-type</key>
                <string>file-tile</string>
            </dict>"
            echo "✅ Added to Dock: $app_path"
        else
            echo "❌ App not found: $app_path"
        fi
    }

    # Ask the user if they want to clear the Dock
    printf "🧹 Do you want to remove all apps from the Dock? [y/n] "
    read -r agreement

    if [[ "$agreement" =~ ^[Yy]$ ]]; then
        defaults delete "$DOCK_PLIST" persistent-apps
        echo "🗑️ Removed all apps from the Dock."
    else
        echo "👍 Keeping existing apps in the Dock."
    fi

    # Add each app to the Dock
    for app in "${DOCK_APPS[@]}"; do
        add_app_to_dock "$app"
    done

    echo "🎉 Dock configuration updated successfully!"
}

# Main function to setup the Dock
dock_setup() {
    echo "🚀 Starting Dock setup..."

    # Configure Dock defaults
    configure_dock_defaults

    # Add apps to the Dock
    add_apps_to_dock

    # Restart the Dock to apply changes
    echo "🔄 Restarting Dock..."
    killall Dock
    echo "🎉 Dock setup completed successfully!"
}

dock_setup
