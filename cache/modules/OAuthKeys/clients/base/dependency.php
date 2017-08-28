<?php
$clientCache['OAuthKeys']['base']['dependency'] = array (
  '_hash' => '40cd750bba9870f18aada2478b24840a',
  'dependencies' => 
  array (
    0 => 
    array (
      'name' => 'client_type_vis',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'oauth_type',
      ),
      'onload' => true,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'SetVisibility',
          'params' => 
          array (
            'target' => 'client_type',
            'value' => 'equal($oauth_type,"oauth2")',
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
  ),
);

