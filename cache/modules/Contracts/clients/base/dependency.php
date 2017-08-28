<?php
$clientCache['Contracts']['base']['dependency'] = array (
  '_hash' => '40cd750bba9870f18aada2478b24840a',
  'dependencies' => 
  array (
    0 => 
    array (
      'name' => 'total_contract_value_usdollar',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'total_contract_value',
        1 => 'total_contract_value',
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
            'target' => 'total_contract_value_usdollar',
            'value' => 'ifElse(isNumeric($total_contract_value), currencyDivide($total_contract_value, $base_rate), "")',
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
      'name' => 'readOnlytotal_contract_value_usdollar',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'total_contract_value',
        1 => 'total_contract_value',
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
            'target' => 'total_contract_value_usdollar',
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

