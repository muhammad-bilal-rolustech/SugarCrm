<?php
$clientCache['EmbeddedFiles']['base']['field'] = array (
  'file' => 
  array (
    'templates' => 
    array (
      'list' => '
{{#if value}}
    {{#if value.[0]}}
        {{#with value.[0]}}
            {{#notEq mimeType \'image\'}}
                <a class="ellipsis_inline" data-placement="bottom" title="{{name}}"
                   href="{{url}}" data-url="{{url}}" data-action="download">{{name}}</a>
            {{/notEq}}
            {{#eq mimeType \'image\'}}
                <a class="ellipsis_inline" data-placement="bottom" title="{{name}}"
                   href="{{url}}" target="_blank">{{name}}</a>
            {{/eq}}
        {{/with}}
    {{/if}}
{{/if}}
',
      'detail' => '
{{#each value}}
    {{#eq mimeType \'image\'}}
        <a class="ellipsis_inline" data-placement="bottom" title="{{name}}" href="{{url}}"
           data-url="{{url}}" target="_blank">{{name}}</a>
    {{/eq}}
    {{#notEq mimeType \'image\'}}
        <a class="ellipsis_inline" data-placement="bottom" title="{{name}}" href="{{url}}"
           data-url="{{url}}" data-action="download">{{name}}</a>
    {{/notEq}}
{{/each}}
',
    ),
  ),
  '_hash' => '51cf3ffe031b096ee1d846462e9340ec',
);

