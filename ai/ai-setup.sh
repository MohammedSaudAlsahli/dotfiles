#!/usr/bin/env zsh

DOTFILES_DIR="$HOME/.dotfiles"
AI_DIR="$DOTFILES_DIR/ai"

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

link_dir() {
    local source="$1"
    local target="$2"

    if [ ! -d "$source" ]; then
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
    echo "🔗 $source -> $target"
}

ai_setup() {
    echo "🤖 Starting AI tools setup..."

    echo "  📁 ~/.agents/skills/ (master skills directory)..."
    link_dir "$AI_DIR/agents-skills" "$HOME/.agents/skills"

    echo "  📁 ~/.agent/.skill-lock.json..."
    link_file "$AI_DIR/agent/skill-lock.json" "$HOME/.agent/.skill-lock.json"

    echo "  📁 ~/.claude/ configuration..."
    mkdir -p "$HOME/.claude"
    link_file "$AI_DIR/claude/CLAUDE.md" "$HOME/.claude/CLAUDE.md"
    link_file "$AI_DIR/claude/settings.json" "$HOME/.claude/settings.json"
    link_file "$AI_DIR/claude/settings.local.json" "$HOME/.claude/settings.local.json"
    link_file "$AI_DIR/claude/settings.template.json" "$HOME/.claude/settings.template.json"
    link_dir "$AI_DIR/claude/agents" "$HOME/.claude/agents"
    link_dir "$AI_DIR/claude/hooks" "$HOME/.claude/hooks"
    link_dir "$AI_DIR/claude/rules" "$HOME/.claude/rules"
    link_dir "$AI_DIR/claude/hud" "$HOME/.claude/hud"

    echo "  🔗 ~/.claude/skills -> ~/.agents/skills..."
    if [ ! -L "$HOME/.claude/skills" ] && [ -e "$HOME/.claude/skills" ]; then
        printf "⚠️  ~/.claude/skills exists and is not a symlink. Replace? [y/n] "
        read -r agreement
        if [[ "$agreement" =~ ^[Yy]$ ]]; then
            rm -rf "$HOME/.claude/skills"
        fi
    fi
    if [ ! -e "$HOME/.claude/skills" ]; then
        ln -s "$HOME/.agents/skills" "$HOME/.claude/skills"
        echo "🔗 ~/.claude/skills -> ~/.agents/skills"
    fi

    echo "  📁 ~/.config/opencode/ configuration..."
    mkdir -p "$HOME/.config/opencode"
    link_file "$AI_DIR/opencode/opencode.json" "$HOME/.config/opencode/opencode.json"
    link_file "$AI_DIR/opencode/tui.json" "$HOME/.config/opencode/tui.json"

    echo "  🔗 ~/.config/opencode/skills -> ~/.agents/skills..."
    if [ ! -L "$HOME/.config/opencode/skills" ] && [ -e "$HOME/.config/opencode/skills" ]; then
        printf "⚠️  ~/.config/opencode/skills exists and is not a symlink. Replace? [y/n] "
        read -r agreement
        if [[ "$agreement" =~ ^[Yy]$ ]]; then
            rm -rf "$HOME/.config/opencode/skills"
        fi
    fi
    if [ ! -e "$HOME/.config/opencode/skills" ]; then
        ln -s "$HOME/.agents/skills" "$HOME/.config/opencode/skills"
        echo "🔗 ~/.config/opencode/skills -> ~/.agents/skills"
    fi

    echo "  📁 ~/.pi/ configuration..."
    mkdir -p "$HOME/.pi/agent"
    link_file "$AI_DIR/pi/settings.json" "$HOME/.pi/agent/settings.json"
    link_dir "$AI_DIR/pi/skills" "$HOME/.pi/agent/skills"
    link_dir "$AI_DIR/pi/themes" "$HOME/.pi/agent/themes"
    link_dir "$AI_DIR/pi/extensions" "$HOME/.pi/agent/extensions"

    echo "✅ AI tools setup complete! 🎉"
    echo ""
    echo "⚠️  REMEMBER: Run secrets setup next:"
    echo "   cp ~/.dotfiles/ai/secrets.env.example ~/.dotfiles/ai/secrets.env"
    echo "   # Fill in your API keys in secrets.env"
    echo "   source ~/.dotfiles/ai/secrets-setup.sh && secrets_setup"
    echo ""
    echo "⚠️  pi auth: copy your real auth.json to ~/.pi/agent/auth.json"
    echo "   (see ~/.dotfiles/ai/pi/auth.json.example for format)"
}