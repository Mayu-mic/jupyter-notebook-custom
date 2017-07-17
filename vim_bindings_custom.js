// Configure CodeMirror
require([
  'base/js/events',
  'nbextensions/vim_binding/vim_binding',   // depends your installation
], function(event) {
  // Map jj to <Esc>
  CodeMirror.Vim.map("jj", "<Esc>", "insert");
  // Swap j/k and gj/gk (Note that <Plug> mappings)
  CodeMirror.Vim.map("j", "<Plug>(vim-binding-gj)", "normal");
  CodeMirror.Vim.map("k", "<Plug>(vim-binding-gk)", "normal");
  CodeMirror.Vim.map("gj", "<Plug>(vim-binding-j)", "normal");
  CodeMirror.Vim.map("gk", "<Plug>(vim-binding-k)", "normal");

  setTimeout(function() {
    // enable the 'Ctrl-C' mapping
    // change the code mirror configuration
    var cm_config = require("notebook/js/cell").Cell.options_default.cm_config;
    delete cm_config.extraKeys['Ctrl-C'];
    // change settings for existing cells
    Jupyter.notebook.get_cells().map(function(cell) {
      var cm = cell.code_mirror;
      if (cm) {
        delete cm.getOption('extraKeys')['Ctrl-C'];
      }
    });
    // map the keys
    CodeMirror.Vim.map("<C-c>", "<Esc>", "insert");
  }, 500);
});

