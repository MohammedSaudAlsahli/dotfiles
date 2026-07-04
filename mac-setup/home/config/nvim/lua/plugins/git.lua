return {
  -- Git Signs: Visual indicators for changed lines in the gutter
  {
    "lewis6991/gitsigns.nvim",
    opts = {
      signs = {
        add = { text = "⊕" },
        change = { text = "⌥" },
        delete = { text = "⊖" },
      },
    },
  },
  -- Octo: The ultimate GitHub integration for Neovim
  -- Requires 'gh' CLI to be installed (which we have in our brew list)
  {
    "NeogitOrg/neogit",
    opts = {
      integrations = {
        enabled = true,
      },
    },
  },
  {
    "pwntester/octo.nvim",
    dependencies = {
      "nvim-lua/plenary.nvim",
      "nvim-telescope/telescope.nvim",
      "nvim-tree/nvim-web-devicons",
    },
    config = function()
      require("octo").setup()
    end,
  },
}
