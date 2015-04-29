window.temple_utils = require('../temple_utils');
var temple = require('../priest');
var beautify_js = require('js-beautify');
var beautify_html = require('js-beautify').html;
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/javascript/javascript');
var CodeMirror = require('codemirror');

document.addEventListener('DOMContentLoaded', function () {
  var textarea = document.getElementById('code');
  var as_module = document.getElementById('as_module');
  var drop_spaces = document.getElementById('drop_spaces');
  var eval_code = document.getElementById('eval_code');
  var demo_data = document.getElementById('demo_data');
  var eval_code_results_container = document.getElementById('eval_code_results_container');

  var template_cm = CodeMirror.fromTextArea(textarea, {
    mode: "htmlmixed"
  });


  var demo_data_cm = CodeMirror.fromTextArea(demo_data, {
    mode: "javascript"
  });
  var result = document.getElementById('result');
  var template_compiled_code_container = CodeMirror(result, {
    mode: "javascript"
  });

  var eval_code_results_container_cm = CodeMirror(eval_code_results_container, {
    mode: "htmlmixed"
  });

  document.getElementById('generate').addEventListener('click', function () {
    var template = temple({'foo.temple': template_cm.getValue()}, as_module.checked, drop_spaces.checked);
    if (eval_code.checked) {
      eval(template);
      var template_obj = window.templates.get('foo', JSON.parse(demo_data_cm.getValue()));
      eval_code_results_container_cm.setValue(beautify_html(template_obj[0].outerHTML));
    } else {
      eval_code_results_container_cm.setValue('');
    }

    template_compiled_code_container.setValue(beautify_js(template));
  });
});