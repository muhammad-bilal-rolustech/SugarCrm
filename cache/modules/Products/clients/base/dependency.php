<?php
$clientCache['Products']['base']['dependency'] = array (
  '_hash' => '40cd750bba9870f18aada2478b24840a',
  'dependencies' => 
  array (
    0 => 
    array (
      'name' => 'subtotal',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'quantity',
        1 => 'discount_price',
        2 => 'quantity',
        3 => 'discount_price',
        4 => 'quantity',
      ),
      'onload' => false,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'SetValue',
          'params' => 
          array (
            'target' => 'subtotal',
            'value' => '                 ifElse(and(isNumeric($quantity), isNumeric($discount_price)),                   ifElse(equal($quantity, 0), "0", currencyMultiply($discount_price, $quantity))                 , "")',
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
      'name' => 'total_amount',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'quantity',
        1 => 'discount_price',
        2 => 'discount_price',
        3 => 'quantity',
        4 => 'discount_select',
        5 => 'discount_price',
        6 => 'quantity',
        7 => 'discount_amount',
        8 => 'discount_amount',
        9 => 'discount_amount',
      ),
      'onload' => false,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'SetValue',
          'params' => 
          array (
            'target' => 'total_amount',
            'value' => '                ifElse(and(isNumeric($quantity), isNumeric($discount_price)),                    currencySubtract(                        currencyMultiply(                            $discount_price,                            $quantity                        ),                        ifElse(equal($discount_select, "1"),                            currencyMultiply(currencyMultiply($discount_price, $quantity), currencyDivide($discount_amount, 100)),                            ifElse(isNumeric($discount_amount), $discount_amount, 0)                        )                    ),                    ""                )',
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
      'name' => 'discount_rate_percent',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'discount_price',
        1 => 'discount_price',
        2 => 'discount_amount',
        3 => 'discount_price',
      ),
      'onload' => false,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'SetValue',
          'params' => 
          array (
            'target' => 'discount_rate_percent',
            'value' => 'ifElse(isNumeric($discount_price), ifElse(equal($discount_price, 0), 0, multiply(divide($discount_amount, $discount_price), 100)), 0)',
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
      'name' => 'discount_amount_usdollar',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'discount_amount',
        1 => 'discount_amount',
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
            'target' => 'discount_amount_usdollar',
            'value' => 'ifElse(isNumeric($discount_amount), currencyDivide($discount_amount, $base_rate), "")',
            'errorValue' => NULL,
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    4 => 
    array (
      'name' => 'deal_calc',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'discount_select',
        1 => 'discount_price',
        2 => 'quantity',
        3 => 'discount_amount',
        4 => 'discount_amount',
        5 => 'discount_amount',
      ),
      'onload' => false,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'SetValue',
          'params' => 
          array (
            'target' => 'deal_calc',
            'value' => 'ifElse(equal($discount_select, "1"),                            currencyMultiply(currencyMultiply($discount_price, $quantity), currencyDivide($discount_amount, 100)),                            ifElse(isNumeric($discount_amount), $discount_amount, 0)                        )',
            'errorValue' => NULL,
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    5 => 
    array (
      'name' => 'deal_calc_usdollar',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'deal_calc',
        1 => 'deal_calc',
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
            'target' => 'deal_calc_usdollar',
            'value' => 'ifElse(isNumeric($deal_calc), currencyDivide($deal_calc, $base_rate), "")',
            'errorValue' => NULL,
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    6 => 
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
    7 => 
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
        1 => 'base_rate',
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
            'value' => 'divide($discount_price, $base_rate)',
            'errorValue' => NULL,
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    8 => 
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
    9 => 
    array (
      'name' => 'book_value_usdollar',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'book_value',
        1 => 'book_value',
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
            'target' => 'book_value_usdollar',
            'value' => 'ifElse(isNumeric($book_value), currencyDivide($book_value, $base_rate), "")',
            'errorValue' => NULL,
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    10 => 
    array (
      'name' => 'readOnlysubtotal',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'quantity',
        1 => 'discount_price',
        2 => 'quantity',
        3 => 'discount_price',
        4 => 'quantity',
      ),
      'onload' => true,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'ReadOnly',
          'params' => 
          array (
            'target' => 'subtotal',
            'value' => 'true',
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    11 => 
    array (
      'name' => 'readOnlytotal_amount',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'quantity',
        1 => 'discount_price',
        2 => 'discount_price',
        3 => 'quantity',
        4 => 'discount_select',
        5 => 'discount_price',
        6 => 'quantity',
        7 => 'discount_amount',
        8 => 'discount_amount',
        9 => 'discount_amount',
      ),
      'onload' => true,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'ReadOnly',
          'params' => 
          array (
            'target' => 'total_amount',
            'value' => 'true',
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    12 => 
    array (
      'name' => 'readOnlydiscount_rate_percent',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'discount_price',
        1 => 'discount_price',
        2 => 'discount_amount',
        3 => 'discount_price',
      ),
      'onload' => true,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'ReadOnly',
          'params' => 
          array (
            'target' => 'discount_rate_percent',
            'value' => 'true',
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    13 => 
    array (
      'name' => 'readOnlydiscount_amount_usdollar',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'discount_amount',
        1 => 'discount_amount',
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
            'target' => 'discount_amount_usdollar',
            'value' => 'true',
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    14 => 
    array (
      'name' => 'readOnlydeal_calc',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'discount_select',
        1 => 'discount_price',
        2 => 'quantity',
        3 => 'discount_amount',
        4 => 'discount_amount',
        5 => 'discount_amount',
      ),
      'onload' => true,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'ReadOnly',
          'params' => 
          array (
            'target' => 'deal_calc',
            'value' => 'true',
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    15 => 
    array (
      'name' => 'readOnlydeal_calc_usdollar',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'deal_calc',
        1 => 'deal_calc',
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
            'target' => 'deal_calc_usdollar',
            'value' => 'true',
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    16 => 
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
    17 => 
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
        1 => 'base_rate',
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
    18 => 
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
    19 => 
    array (
      'name' => 'readOnlybook_value_usdollar',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'book_value',
        1 => 'book_value',
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
            'target' => 'book_value_usdollar',
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

