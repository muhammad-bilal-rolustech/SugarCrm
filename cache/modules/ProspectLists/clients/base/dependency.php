<?php
$clientCache['ProspectLists']['base']['dependency'] = array (
  '_hash' => '40cd750bba9870f18aada2478b24840a',
  'dependencies' => 
  array (
    0 => 
    array (
      'name' => 'domain_name_vis',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'list_type',
      ),
      'onload' => true,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'SetVisibility',
          'params' => 
          array (
            'target' => 'domain_name',
            'value' => 'equal($list_type, "exempt_domain")',
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
  ),
);

