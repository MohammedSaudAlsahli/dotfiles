#!/usr/bin/env zsh

DOTFILES_DIR="$HOME/.dotfiles/mac-setup/home"

home_setup() {
    # List of files to symlink
    FILES=(
        "config"
        "oh-my-zsh"
        "terminfo"
        "warp"
        "waveterm"
        "p10k.zsh"
        "viminfo"
        "zprofile"
        "zshrc"
    )

    echo "🔗 Starting dotfiles setup..."

    # Loop through files and create symlinks
    for file in "${FILES[@]}"; do
        TARGET="$HOME/.$file"
        SOURCE="$DOTFILES_DIR/$file"

        # Check if the source file exists
        if [ ! -e "$SOURCE" ]; then
            echo "❌ Warning: $SOURCE does not exist. Skipping..."
            continue
        fi

        # Check if target exists
        if [ -e "$TARGET" ] || [ -L "$TARGET" ]; then
            printf "⚠️  $TARGET already exists. Do you want to replace it? [y/n] "
            read -r agreement
            if [[ ! "$agreement" =~ ^[Yy]$ ]]; then
                echo "⏩ Skipping $file"
                continue
            fi
            echo "🗑️ Removing existing $TARGET"
            rm -rf "$TARGET"
        fi

        # Create symlink
        echo "🔗 Linking $file -> $TARGET"
        ln -s "$SOURCE" "$TARGET"
    done

    echo "✅ Dotfiles setup complete! 🎉"
}
