# #!/usr/bin/env zsh

# # Get the directory where the script is located
# SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

# # Function to source a setup script if it exists
# source_script() {
#     local script_path="$1"
#     if [ -f "$script_path" ]; then
#         echo "⚙️ Sourcing $(basename "$script_path")..."
#         . "$script_path"
#         if [ $? -ne 0 ]; then
#             echo "⚠️ Warning: $(basename "$script_path") encountered an error."
#         fi
#     else
#         echo "⚠️ Skipping $(basename "$script_path") (file not found)."
#     fi
# }

# defaults_setup() {
#     echo "🚀 Starting system configuration..."

#     # Loop through all subdirectories and source *-setup.sh files
#     for dir in "$SCRIPT_DIR"/*/; do
#         if [ -d "$dir" ]; then
#             # Use nullglob to handle cases where no files match the pattern
#             shopt -s nullglob
#             for script in "$dir"/*-setup.sh; do
#                 source_script "$script"
#             done
#             shopt -u nullglob
#         fi
#     done

#     echo "🎉 System configuration completed!"
# }
#!/usr/bin/env zsh

# Get the directory where the script is located
SETUP_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

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

# Main defaults setup function
defaults_setup() {
    echo "🚀 Starting system configuration..."

    # Run individual setup functions
    run_setup_function "dock/dock-setup.sh" "dock_setup"
    run_setup_function "settings/settings-setup.sh" "settings_setup"

    echo "🎉 System configuration completed!"
}
