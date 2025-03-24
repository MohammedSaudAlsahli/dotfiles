#!/usr/bin/env zsh

# Get the directory where the script is located
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

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

defaults_setup() {
    echo "🚀 Starting system configuration..."

    # Loop through all subdirectories and source *-setup.sh files
    for dir in "$SCRIPT_DIR"/*/; do
        if [ -d "$dir" ]; then
            # Use nullglob to handle cases where no files match the pattern
            shopt -s nullglob
            for script in "$dir"/*-setup.sh; do
                source_script "$script"
            done
            shopt -u nullglob
        fi
    done

    echo "🎉 System configuration completed!"
}
