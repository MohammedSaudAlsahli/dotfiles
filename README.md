# dotfiles

Automated macOS setup and configuration. Clone this repo and run `setup.sh` to restore your full development environment after a format or on a new machine.

## Quick Start

```bash
git clone https://github.com/MohammedSaudAlsahli/dotfiles.git ~/.dotfiles
cd ~/.dotfiles
./setup.sh
```

The script detects macOS and runs four phases:

1. **Homebrew** — installs all formulas, casks, fonts, and MAS apps from `Brewfile`
2. **Home symlinks** — links shell configs, `~/.config/` entries, and Warp themes
3. **System defaults** — configures Dock, login items, and macOS settings
4. **AI tools** — links skills, Claude configs, and OpenCode settings

## Repo Structure

```
~/.dotfiles/
├── setup.sh                          # Entry point (detects OS, delegates)
├── Brewfile                          # Single source of truth for Homebrew
├── ai/                               # AI tools (skills, configs, agents)
│   ├── ai-setup.sh                   # Symlinks AI configs to $HOME
│   ├── agents-skills/                # 97 skills (master copy)
│   ├── agent/skill-lock.json         # Skill provenance tracking
│   ├── claude/
│   │   ├── CLAUDE.md                 # Main Claude config
│   │   ├── settings.json             # Claude Code settings
│   │   ├── settings.local.json        # Local permission overrides
│   │   ├── settings.template.json     # Template with full hook config
│   │   ├── agents/                    # 19 agent definitions
│   │   ├── hooks/                     # 13 hook scripts
│   │   ├── rules/                     # 7 rule files
│   │   └── hud/                       # HUD display scripts
│   └── opencode/
│       ├── opencode.json             # OpenCode config (API keys redacted)
│       └── tui.json                   # TUI plugin config
├── mac-setup/
│   ├── mac-setup.sh                  # macOS orchestrator
│   ├── homebrew/
│   │   ├── brew-setup.sh             # Install/update Homebrew + bundle
│   │   └── apps-and-packages.sh      # MAS app IDs (Brewfile handles the rest)
│   ├── home/
│   │   ├── home-setup.sh             # Symlinks config files to $HOME
│   │   ├── zshrc                     # Zsh configuration
│   │   ├── zshenv                    # Zsh env (uv PATH)
│   │   ├── zprofile                   # Zsh profile (brew shellenv)
│   │   ├── config/                   # ~/.config/ contents
│   │   │   ├── starship.toml
│   │   │   ├── kitty/
│   │   │   ├── helix/
│   │   │   ├── nvim/
│   │   │   └── ...
│   │   └── warp/                     # Warp terminal themes + settings
│   └── defaults/
│       ├── defaults-setup.sh         # System defaults orchestrator
│       ├── dock/
│       │   ├── dock-setup.sh         # Dock configuration
│       │   └── dock-apps.sh          # Dock app list
│       └── settings/
│           ├── settings-setup.sh     # Login items setup
│           └── at-login-apps.sh      # Login apps list
```

## Updating the Brewfile

After installing or removing any Homebrew package, update the Brewfile:

```bash
brew bundle dump --force --file=~/.dotfiles/Brewfile
```

Commit the change and push. The next `setup.sh` run will install exactly what's in the Brewfile.

## What Gets Installed

The Brewfile captures everything from the live system it was generated on:

- **Taps**: oven-sh/bun, steipete/tap, supabase/tap, yakitrak/yakitrak
- **Formulas**: bun, bat, cloudflare-wrangler, fastfetch, ffmpeg, fzf, gh, go, helix, htop, imagemagick, lsd, mas, n, neovim, ollama, opencode, pandoc, pi-coding-agent, pnpm, postgresql@16, redis, rust, starship, tmux, tree, uv, yt-dlp, agent-browser, supabase, and zsh plugins (~33 CLI tools)
- **Casks**: 1Password, Affinity, AltTab, Antigravity IDE, AppCleaner, Audacity, Blip, Brave, Caffeine, Claude, Claude Code, Clop, Cloudflare WARP, Docker Desktop, draw.io, Firefox, Get API, Google Chrome, Hot, IINA, kdenlive, KeyClu, Kitty, LinearMouse, Obsidian, OpenCode Desktop, qBittorrent, Raycast, Shottr, Stremio, VSCodium, Warp, Xournal++, Zo (~34 GUI apps)
- **Fonts**: Fira Code, Handjet, IBM Plex Sans Arabic, JetBrains Mono (+ Nerd Font), Markazi Text, Meslo LG Nerd Font, Rakkas, Rubik, SF Arabic (10 fonts)
- **MAS Apps**: GarageBand, iMovie, Keynote, Numbers, Pages, Xcode

## Manual Steps After Setup

Some things cannot be automated:

1. **SSH keys** — copy `~/.ssh/` from backup
2. **GPG keys** — restore from backup if used
3. **1Password** — sign in and unlock vault
4. **Raycast extensions** — reinstall from Raycast store (the compiled extensions are gitignored)
5. **Node versions** — `n install <version>` for any specific versions needed
6. **API keys** — fill in `ai/secrets.env` (copied from `secrets.env.example`):
   ```bash
   cp ~/.dotfiles/ai/secrets.env.example ~/.dotfiles/ai/secrets.env
   # Edit secrets.env with your real API keys
   source ~/.dotfiles/ai/secrets-setup.sh && secrets_setup
   ```
   Keys managed: Ollama Cloud, Context7, GitHub MCP, Stitch, GitHub CLI token, and OAuth credential files (Codex, Gemini)
7. **oh-my-claudecode** — run `npm install -g oh-my-claudecode` to restore OMC built-in skills (autopilot, ralph, ultrawork, etc.)