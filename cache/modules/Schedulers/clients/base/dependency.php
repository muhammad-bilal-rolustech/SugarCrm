<?php
$clientCache['Schedulers']['base']['dependency'] = array (
  '_hash' => '40cd750bba9870f18aada2478b24840a',
  'dependencies' => 
  array (
    0 => 
    array (
      'name' => 'job_url_vis',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'job_function',
      ),
      'onload' => true,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'SetVisibility',
          'params' => 
          array (
            'target' => 'job_url',
            'value' => 'equal($job_function, "url::")',
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
  ),
);

