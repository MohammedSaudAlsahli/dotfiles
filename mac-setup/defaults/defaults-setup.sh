#!/usr/bin/env zsh

# Get the directory where the script is located
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

# Function to source a setup script if it exists
source_script() {
    local script_path="$1"
    if [ -f "$script_path" ]; then
        echo "⚙️ Sourcing $(basename "$script_path")..."
        . "$script_path"
        if [ $? -ne 0 ]; then
            echo "⚠️ Warning: $(basename "$script_path") encountered an error."
        fi
    else
        echo "⚠️ Skipping $(basename "$script_path") (file not found)."
    fi
}

echo "🚀 Starting system configuration..."

defaults_setup() {
    # Loop through all subdirectories and source *-setup.sh files
    for dir in "$SCRIPT_DIR"/*/; do
        if [ -d "$dir" ]; then
            for script in "$dir"/*-setup.sh; do
                source_script "$script"
            done
        fi
    done

    echo "🎉 System configuration completed!"

}

# defaults_setup
