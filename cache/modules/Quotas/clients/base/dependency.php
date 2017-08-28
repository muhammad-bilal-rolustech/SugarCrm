<?php
$clientCache['Quotas']['base']['dependency'] = array (
  '_hash' => '40cd750bba9870f18aada2478b24840a',
  'dependencies' => 
  array (
    0 => 
    array (
      'name' => 'amount_base_currency',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'amount',
        1 => 'amount',
        2 => 'base_rate',
      ),
      'onload' => false,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'SetValue',
          'params' => 
          array (
            'target' => 'amount_base_currency',
            'value' => 'ifElse(isNumeric($amount), currencyDivide($amount, $base_rate), "")',
            'errorValue' => NULL,
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    1 => 
    array (
      'name' => 'readOnlyamount_base_currency',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'amount',
        1 => 'amount',
        2 => 'base_rate',
      ),
      'onload' => true,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'ReadOnly',
          'params' => 
          array (
            'target' => 'amount_base_currency',
            'value' => 'true',
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
  ),
);

