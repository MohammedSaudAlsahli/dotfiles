# git clone https://github.com/alacritty/alacritty-theme ~/.config/alacritty/themes

# if mac run mac-setup.sh
# if linux run linux-setup.sh
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

# Function to source a script and call its function
run_setup_function() {
    local script_path="$SCRIPT_DIR/$1"
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

OS="$(uname -s)"

# Main installation function
setup() {
    case "$OS" in
    Darwin*) # macOS
        echo "🚀 Detected macOS. Running mac-setup.sh..."
        run_setup_function "mac-setup/mac-setup.sh" "mac_setup"
        ;;
    Linux*) # Linux
        echo "🚀 Detected Linux. Running linux-setup.sh..."
        run_setup_function "linux-setup/linux-setup.sh" "linux_setup"
        ;;
    *)
        echo "❌ Unsupported operating system: $OS"
        exit 1
        ;;
    esac
}
setup
