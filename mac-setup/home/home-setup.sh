#!/usr/bin/env zsh

DOTFILES_DIR="$HOME/.dotfiles/mac-setup/home"

home_setup() {
    echo "🔗 Starting dotfiles setup..."

    local -A FILE_LINKS=(
        "zshrc"        "$HOME/.zshrc"
        "zshenv"       "$HOME/.zshenv"
        "zprofile"     "$HOME/.zprofile"
    )

    local -A CONFIG_LINKS=(
        "config/starship.toml"      "$HOME/.config/starship.toml"
        "config/kitty/kitty.conf"   "$HOME/.config/kitty/kitty.conf"
        "config/kitty/nord.conf"    "$HOME/.config/kitty/nord.conf"
        "config/kitty/tokyo.conf"   "$HOME/.config/kitty/tokyo.conf"
        "config/helix"              "$HOME/.config/helix"
        "config/nvim"               "$HOME/.config/nvim"
        "config/htop"               "$HOME/.config/htop"
        "config/btop"               "$HOME/.config/btop"
        "config/git"                "$HOME/.config/git"
        "config/gh"                 "$HOME/.config/gh"
        "config/gcloud"             "$HOME/.config/gcloud"
        "config/linearmouse"        "$HOME/.config/linearmouse"
        "config/neonctl"            "$HOME/.config/neonctl"
        "config/opencode"           "$HOME/.config/opencode"
        "config/xournalpp"           "$HOME/.config/xournalpp"
        "config/agents"             "$HOME/.config/agents"
        "config/cagent"              "$HOME/.config/cagent"
        "config/cmux"               "$HOME/.config/cmux"
        "config/configstore"        "$HOME/.config/configstore"
        "config/flutter"            "$HOME/.config/flutter"
        "config/qBittorrent"        "$HOME/.config/qBittorrent"
        "config/alacritty"          "$HOME/.config/alacritty"
    )

    local -A WARP_LINKS=(
        "warp/settings.toml"        "$HOME/.warp/settings.toml"
        "warp/tab_configs"         "$HOME/.warp/tab_configs"
        "warp/themes"               "$HOME/.warp/themes"
    )

    link_file() {
        local source="$1"
        local target="$2"

        if [ ! -e "$source" ]; then
            echo "❌ Warning: $source does not exist. Skipping..."
            return
        fi

        if [ -e "$target" ] || [ -L "$target" ]; then
            printf "⚠️  $target already exists. Replace? [y/n] "
            read -r agreement
            if [[ ! "$agreement" =~ ^[Yy]$ ]]; then
                echo "⏩ Skipping"
                return
            fi
            rm -rf "$target"
        fi

        mkdir -p "$(dirname "$target")"
        ln -s "$source" "$target"
        echo "🔗 $(basename "$source") -> $target"
    }

    echo "  📄 Shell config files..."
    for source relative in ${(kv)FILE_LINKS}; do
        link_file "$DOTFILES_DIR/$source" "$relative"
    done

    echo "  📁 ~/.config/ entries..."
    for source relative in ${(kv)CONFIG_LINKS}; do
        link_file "$DOTFILES_DIR/$source" "$relative"
    done

    echo "  📁 ~/.warp/ entries..."
    for source relative in ${(kv)WARP_LINKS}; do
        link_file "$DOTFILES_DIR/$source" "$relative"
    done

    echo "✅ Dotfiles setup complete! 🎉"
}