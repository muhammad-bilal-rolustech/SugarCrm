<?php
$clientCache['Meetings']['base']['dependency'] = array (
  '_hash' => '40cd750bba9870f18aada2478b24840a',
  'dependencies' => 
  array (
    0 => 
    array (
      'name' => 'password_vis',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'type',
      ),
      'onload' => true,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'SetVisibility',
          'params' => 
          array (
            'target' => 'password',
            'value' => 'isInEnum($type,getDD("extapi_meeting_password"))',
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    1 => 
    array (
      'name' => 'displayed_url_vis',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'type',
        1 => 'type',
      ),
      'onload' => true,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'SetVisibility',
          'params' => 
          array (
            'target' => 'displayed_url',
            'value' => 'and(isAlpha($type),not(equal($type,"Sugar")))',
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
  ),
);

