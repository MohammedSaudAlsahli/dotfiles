# git clone https://github.com/alacritty/alacritty-theme ~/.config/alacritty/themes

# if mac run mac-setup.sh
# if linux run linux-setup.sh
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

if [[ "$OSTYPE" == "darwin"* ]]; then
    source "$SCRIPT_DIR/mac-setup/mac-setup.sh"
fi
