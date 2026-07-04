-- Options are automatically loaded before lazy.nvim startup
-- Default options that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/options.lua

-- 📋 System Clipboard Integration
-- This allows Neovim to use the macOS system clipboard for all yank, delete, and paste operations.
-- Now, Cmd+C and Cmd+V in your terminal will work seamlessly with Neovim.
vim.opt.clipboard = "unnamedplus"

-- 🖱️ Full Mouse Support
-- Enable mouse in all modes (Normal, Insert, Visual, etc.)
-- This gives you the "IDE vibe": click to move cursor, scroll, and resize windows.
vim.opt.mouse = "a"

-- 📏 Line Numbers & UI
vim.opt.number = true           -- Show line numbers
vim.opt.relativenumber = true    -- Show relative line numbers for fast jumping
vim.opt.cursorline = true       -- Highlight the current line
vim.opt.termguicolors = true     -- Enable TrueColor support for beautiful themes

-- 🔍 Search
vim.opt.ignorecase = true        -- Ignore case in search patterns
vim.opt.smartcase = true         -- Smartcase: search is case-insensitive unless a capital letter is used
vim.opt.hlsearch = false         -- Stop highlighting search results by default (cleaner)

-- 🛠️ Indentation
vim.opt.shiftwidth = 2           -- Size of an indent
vim.opt.tabstop = 2              -- Number of spaces tabs count for
vim.opt.expandtab = true         -- Use spaces instead of tabs
