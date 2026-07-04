-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua

local keymap = vim.keymap

-- ⌨️ IDE-Style Shortcuts (Simulating Cmd with Ctrl)
-- Note: In a terminal, Cmd is handled by the OS. We use Ctrl for a similar experience.

-- Undo / Redo
keymap.set("n", "<C-z>", "<cmd>undo<cr>", { desc = "Undo (IDE style)" })
keymap.set("i", "<C-z>", "<esc><cmd>undo<cr>a", { desc = "Undo (IDE style)" })
keymap.set("n", "<C-r>", "<cmd>redo<cr>", { desc = "Redo (IDE style)" })
keymap.set("i", "<C-r>", "<esc><cmd>redo<cr>a", { desc = "Redo (IDE style)" })

-- Cut / Paste / Copy (System Clipboard)
keymap.set({"n", "v"}, "<C-x>", "x", { desc = "Cut (IDE style)" })
keymap.set({"n", "v"}, "<C-v>", '"+p', { desc = "Paste from System Clipboard" })
keymap.set({"n", "v"}, "<C-c>", '"+y', { desc = "Copy to System Clipboard" })

-- 🪟 Window Navigation (The a real IDE move)
-- Move between splits using Ctrl + hjkl instead of Ctrl-W + hjkl
keymap.set("n", "<C-h>", "<C-w>h", { desc = "Move to Left Split" })
keymap.set("n", "<C-j>", "<C-w>j", { desc = "Move to Bottom Split" })
keymap.set("n", "<C-k>", "<C-w>k", { desc = "Move to Top Split" })
keymap.set("n", "<C-l>", "<C-w>l", { desc = "Move to Right Split" })

-- 🚀 Quality of Life
keymap.set("n", "<C-b>", "<cmd>NeCtree toggle<cr>", { desc = "Toggle File Explorer (IDE style)" })
keymap.set("n", "<leader>h", ":nohlsearch<CR>", { desc = "Clear search highlights" })
keymap.set("n", "<leader>w", "<cmd>write<cr>", { desc = "Quick Save" })
