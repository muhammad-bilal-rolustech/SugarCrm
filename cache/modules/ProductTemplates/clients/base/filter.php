<?php
$clientCache['ProductTemplates']['base']['filter'] = array (
  'basic' => 
  array (
    'meta' => 
    array (
      'create' => true,
      'quicksearch_field' => 
      array (
        0 => 'name',
      ),
      'quicksearch_priority' => 1,
      'filters' => 
      array (
        0 => 
        array (
          'id' => 'all_records',
          'name' => 'LBL_LISTVIEW_FILTER_ALL',
          'filter_definition' => 
          array (
          ),
          'editable' => false,
        ),
        1 => 
        array (
          'id' => 'recently_viewed',
          'name' => 'LBL_RECENTLY_VIEWED',
          'filter_definition' => 
          array (
            '$tracker' => '-7 day',
          ),
          'editable' => false,
        ),
        2 => 
        array (
          'id' => 'recently_created',
          'name' => 'LBL_NEW_RECORDS',
          'filter_definition' => 
          array (
            'date_entered' => 
            array (
              '$dateRange' => 'last_7_days',
            ),
          ),
          'editable' => false,
        ),
      ),
    ),
  ),
  'default' => 
  array (
    'meta' => 
    array (
      'default_filter' => 'all_records',
      'fields' => 
      array (
        'name' => 
        array (
        ),
        'type_id' => 
        array (
        ),
        'manufacturer_id' => 
        array (
        ),
        'mft_part_num' => 
        array (
        ),
        'discount_price_date' => 
        array (
        ),
        'vendor_part_num' => 
        array (
        ),
        'category_id' => 
        array (
        ),
        'contact_name' => 
        array (
        ),
        'date_available' => 
        array (
        ),
        'url' => 
        array (
        ),
        'support_term' => 
        array (
        ),
        'tag' => 
        array (
        ),
      ),
    ),
  ),
  '_hash' => 'c35853e67dad60412401689aa5505c3a',
);

