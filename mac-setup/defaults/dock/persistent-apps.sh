#!/usr/bin/env zsh

# Function to add apps to the Dock
add_apps_to_dock() {
    local DOCK_PLIST="$HOME/Library/Preferences/com.apple.dock.plist"
    local APPS=("$@") # Accept an array of apps as an argument

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
            echo "Added to Dock: $app_path"
        else
            echo "App not found: $app_path"
        fi
    }

    # Ask the user if they want to clear the Dock
    printf "Do you want to remove all apps from the Dock? [y/n] " agreement
    read -r agreement

    if [[ "$agreement" =~ ^[Yy]$ ]]; then
        defaults delete "$DOCK_PLIST" persistent-apps
        echo "Removed all apps from the Dock."
    else
        echo "Keeping existing apps in the Dock."
    fi

    # Add each app to the Dock
    for app in "${APPS[@]}"; do
        add_app_to_dock "$app"
    done

    # Restart the Dock to apply changes
    killall Dock

    echo "Dock configuration updated."
}
