<?php
$clientCache['Notes']['base']['field'] = array (
  'file' => 
  array (
    'templates' => 
    array (
      'detail' => '
{{#each value}}
    {{#eq mimeType \'image\'}}
        <div class="file-field">
            <a class="ellipsis_inline" data-placement="bottom" title="{{name}}" href="{{url}}" target="_blank">{{name}}</a>
        </div>
        <a href="{{url}}" target="_blank"><img src="{{url}}"></a>
    {{else}}
        <div class="file-field">
            <a class="ellipsis_inline" data-placement="bottom" title="{{name}}" href="javascript:void(0);" data-url="{{url}}" data-action="download">{{name}}</a>
        </div>
    {{/eq}}
{{/each}}
',
    ),
  ),
  '_hash' => '85518351d2d617c2b7cf7c93bff2a42b',
);

