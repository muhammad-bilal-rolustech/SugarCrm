<?php
$clientCache['ProductTemplates']['base']['dependency'] = array (
  '_hash' => '40cd750bba9870f18aada2478b24840a',
  'dependencies' => 
  array (
    0 => 
    array (
      'name' => 'cost_usdollar',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'cost_price',
        1 => 'cost_price',
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
            'target' => 'cost_usdollar',
            'value' => 'ifElse(isNumeric($cost_price), currencyDivide($cost_price, $base_rate), "")',
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
      'name' => 'discount_usdollar',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'discount_price',
        1 => 'discount_price',
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
            'target' => 'discount_usdollar',
            'value' => 'ifElse(isNumeric($discount_price), currencyDivide($discount_price, $base_rate), "")',
            'errorValue' => NULL,
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    2 => 
    array (
      'name' => 'list_usdollar',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'list_price',
        1 => 'list_price',
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
            'target' => 'list_usdollar',
            'value' => 'ifElse(isNumeric($list_price), currencyDivide($list_price, $base_rate), "")',
            'errorValue' => NULL,
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    3 => 
    array (
      'name' => 'readOnlycost_usdollar',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'cost_price',
        1 => 'cost_price',
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
            'target' => 'cost_usdollar',
            'value' => 'true',
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    4 => 
    array (
      'name' => 'readOnlydiscount_usdollar',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'discount_price',
        1 => 'discount_price',
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
            'target' => 'discount_usdollar',
            'value' => 'true',
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    5 => 
    array (
      'name' => 'readOnlylist_usdollar',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'list_price',
        1 => 'list_price',
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
            'target' => 'list_usdollar',
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

