#!/bin/bash
# Bootstrap script — run this on a fresh Mac with a single curl command:
#
#   curl -fsSL https://raw.githubusercontent.com/MohammedSaudAlsahli/dotfiles/main/setup.sh | bash
#
# Or after manually cloning:
#   cd ~/.dotfiles && ./setup.sh

set -e

DOTFILES_DIR="$HOME/.dotfiles"
REPO_URL="https://github.com/MohammedSaudAlsahli/dotfiles.git"

# --- Colors ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

info()  { echo -e "${CYAN}ℹ️  $1${NC}"; }
ok()    { echo -e "${GREEN}✅ $1${NC}"; }
warn()  { echo -e "${YELLOW}⚠️  $1${NC}"; }
fail()  { echo -e "${RED}❌ $1${NC}"; exit 1; }

# --- Step 1: Install Homebrew if missing ---
install_homebrew() {
    if command -v brew >/dev/null 2>&1; then
        ok "Homebrew already installed"
        return 0
    fi

    info "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" || \
        fail "Homebrew installation failed"

    if [ -f /opt/homebrew/bin/brew ]; then
        eval "$(/opt/homebrew/bin/brew shellenv)"
        ok "Homebrew installed and configured"
    else
        fail "Homebrew installed but binary not found"
    fi
}

# --- Step 2: Clone dotfiles if missing ---
clone_dotfiles() {
    if [ -d "$DOTFILES_DIR/.git" ]; then
        ok "Dotfiles repo already exists at $DOTFILES_DIR"
        return 0
    fi

    if ! command -v git >/dev/null 2>&1; then
        info "Installing git via Homebrew..."
        brew install git || fail "Failed to install git"
    fi

    info "Cloning dotfiles repo..."
    git clone "$REPO_URL" "$DOTFILES_DIR" || fail "Failed to clone dotfiles"
    ok "Dotfiles cloned to $DOTFILES_DIR"
}

# --- Step 3: Prepare secrets.env ---
prepare_secrets() {
    local secrets_file="$DOTFILES_DIR/ai/secrets.env"

    if [ -f "$secrets_file" ]; then
        ok "secrets.env already exists"
        return 0
    fi

    if [ -f "$DOTFILES_DIR/ai/secrets.env.example" ]; then
        cp "$DOTFILES_DIR/ai/secrets.env.example" "$secrets_file"
        warn "secrets.env created from template — you need to fill in your API keys"
        echo ""
        echo "  Edit this file before running setup again:"
        echo "    nano $secrets_file"
        echo ""
        echo "  Required keys:"
        echo "    - OLLAMA_API_KEY"
        echo "    - CONTEXT7_API_KEY"
        echo "    - GITHUB_MCP_TOKEN"
        echo "    - STITCH_API_KEY"
        echo "    - GITHUB_CLI_TOKEN"
        echo ""
        echo "  After filling it in, re-run: cd ~/.dotfiles && ./setup.sh"
        echo ""
        return 1
    fi
}

# --- Step 4: Run the setup phases ---
run_setup_phases() {
    local script_path="$DOTFILES_DIR/mac-setup/mac-setup.sh"

    if [ ! -f "$script_path" ]; then
        fail "mac-setup.sh not found at $script_path"
    fi

    info "Sourcing mac-setup.sh..."
    source "$script_path"

    OS="$(uname -s)"
    case "$OS" in
        Darwin*)
            info "Detected macOS — running full setup..."
            mac_setup
            ;;
        Linux*)
            info "Detected Linux — running Linux setup..."
            if type linux_setup >/dev/null 2>&1; then
                linux_setup
            else
                fail "linux_setup function not found"
            fi
            ;;
        *)
            fail "Unsupported OS: $OS"
            ;;
    esac
}

# --- Main ---
main() {
    echo ""
    echo "=============================================="
    echo "  macOS Dotfiles Bootstrap"
    echo "=============================================="
    echo ""

    install_homebrew
    clone_dotfiles

    # Ensure brew is in PATH for subsequent commands
    if [ -f /opt/homebrew/bin/brew ]; then
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi

    # Check if secrets.env exists before running full setup
    if prepare_secrets; then
        run_setup_phases
        echo ""
        ok "Setup complete! 🎉"
        echo ""
        echo "Manual steps remaining:"
        echo "  1. Sign in to 1Password"
        echo "  2. Run: codex auth"
        echo "  3. Open Gemini app and sign in"
        echo "  4. Open Antigravity IDE and sign in"
        echo "  5. Reinstall Raycast extensions from the store"
        echo "  6. Install Node versions: n install 22 && n install 24"
        echo "  7. Copy pi auth: cp /path/to/backup/auth.json ~/.pi/agent/auth.json"
        echo ""
    fi
}

main