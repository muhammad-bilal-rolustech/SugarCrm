<?php
$clientCache['ProductCategories']['base']['filter'] = array (
  'basic' => 
  array (
    'meta' => 
    array (
      'create' => true,
      'default_filter' => 'all_records',
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
            '$tracker' => '-7 DAY',
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
        'parent_name' => 
        array (
        ),
        'description' => 
        array (
        ),
        'tag' => 
        array (
        ),
      ),
    ),
  ),
  '_hash' => '56e8faa65909fbd1073ee60e0c87de5a',
);

