return {
  {
    "nvim-neo-tree/neo-tree.nvim",
    opts = {
      window = {
        width = 30,
        position = "left",
      },
      filesystem = {
        filtered_items = {
          visible = false,
          hide_dotfiles = false,
          hide_git_ignored = false,
        },
        follow_current_file = {
          enabled = true,
        },
      },
    },
  },
}
