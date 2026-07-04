#!/usr/bin/env zsh

DOTFILES_DIR="$HOME/.dotfiles"
AI_DIR="$DOTFILES_DIR/ai"
SECRETS_FILE="$AI_DIR/secrets.env"

secrets_setup() {
    echo "🔐 Starting secrets setup..."

    if [ ! -f "$SECRETS_FILE" ]; then
        echo "❌ secrets.env not found at $SECRETS_FILE"
        echo "   Copy secrets.env.example to secrets.env and fill in your values:"
        echo "   cp $AI_DIR/secrets.env.example $AI_DIR/secrets.env"
        return 1
    fi

    source "$SECRETS_FILE"

    local injected=0
    local skipped=0

    inject_json_value() {
        local file="$1"
        local key="$2"
        local value="$3"
        local placeholder="$4"

        if [ ! -f "$file" ]; then
            echo "  ❌ $file not found. Skipping."
            skipped=$((skipped + 1))
            return
        fi

        if [[ "$value" == "REPLACE_WITH_"* ]] || [ -z "$value" ]; then
            echo "  ⏭️  $key: no value set, skipping"
            skipped=$((skipped + 1))
            return
        fi

        if grep -q "$placeholder" "$file" 2>/dev/null; then
            local escaped_value=$(printf '%s' "$value" | sed 's/[&/\]/\\&/g')
            sed -i '' "s|$placeholder|$escaped_value|g" "$file"
            echo "  ✅ $key: injected into $(basename "$file")"
            injected=$((injected + 1))
        else
            echo "  ℹ️  $key: placeholder not found (already injected?)"
            skipped=$((skipped + 1))
        fi
    }

    echo "  📁 Injecting API keys into OpenCode config..."
    OPENCODE_CONFIG="$HOME/.config/opencode/opencode.json"

    inject_json_value "$OPENCODE_CONFIG" "Ollama API key" "$OLLAMA_API_KEY" "REPLACE_WITH_OLLAMA_API_KEY"
    inject_json_value "$OPENCODE_CONFIG" "Context7 API key" "$CONTEXT7_API_KEY" "REPLACE_WITH_CONTEXT7_API_KEY"
    inject_json_value "$OPENCODE_CONFIG" "GitHub MCP token" "$GITHUB_MCP_TOKEN" "REPLACE_WITH_GITHUB_TOKEN"
    inject_json_value "$OPENCODE_CONFIG" "Stitch API key" "$STITCH_API_KEY" "REPLACE_WITH_STITCH_API_KEY"

    echo "  📁 GitHub CLI..."
    if [[ "$GITHUB_CLI_TOKEN" != "REPLACE_WITH_"* ]] && [ -n "$GITHUB_CLI_TOKEN" ]; then
        echo "$GITHUB_CLI_TOKEN" | gh auth login --with-token 2>/dev/null && echo "  ✅ GitHub CLI: authenticated" || echo "  ❌ GitHub CLI: failed to authenticate"
        injected=$((injected + 1))
    else
        echo "  ⏭️  GitHub CLI token not set, skipping (run 'gh auth login' manually)"
        skipped=$((skipped + 1))
    fi

    echo "  📁 OAuth credential files..."
    if [ -n "$OAUTH_BACKUP_DIR" ] && [ -d "$OAUTH_BACKUP_DIR" ]; then
        for mapping in \
            "codex/auth.json:$HOME/.codex/auth.json" \
            "gemini/gemini-credentials.json:$HOME/.gemini/gemini-credentials.json" \
            "gemini/oauth_creds.json:$HOME/.gemini/oauth_creds.json"; do

            local src="$OAUTH_BACKUP_DIR/${mapping%%:*}"
            local dest="${mapping##*:}"

            if [ -f "$src" ]; then
                mkdir -p "$(dirname "$dest")"
                cp "$src" "$dest"
                chmod 600 "$dest"
                echo "  ✅ Restored: $(basename "$dest")"
                injected=$((injected + 1))
            else
                echo "  ⚠️  Not found in backup: $src"
                skipped=$((skipped + 1))
            fi
        done
    else
        echo "  ⏭️  No OAUTH_BACKUP_DIR set, skipping OAuth files"
        echo "     You'll need to run interactive logins for:"
        echo "     - Codex:    codex auth"
        echo "     - Gemini:   Open Gemini app and sign in"
        echo "     - Antigravity: Open Antigravity app and sign in"
        skipped=$((skipped + 1))
    fi

    echo ""
    echo "📊 Summary: $injected injected, $skipped skipped"
    if [ "$injected" -gt 0 ]; then
        echo "✅ Secrets setup complete! 🎉"
    else
        echo "⚠️  Nothing was injected. Check your secrets.env values."
    fi
}