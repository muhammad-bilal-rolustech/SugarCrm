<?php
$clientCache['KBContents']['base']['filter'] = array (
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
          'id' => 'assigned_to_me',
          'name' => 'LBL_LISTVIEW_FILTER_MY',
          'filter_definition' => 
          array (
            '$owner' => '',
          ),
          'editable' => false,
        ),
        2 => 
        array (
          'id' => 'favorites',
          'name' => 'LBL_FAVORITES',
          'filter_definition' => 
          array (
            '$favorite' => '',
          ),
          'editable' => false,
        ),
        3 => 
        array (
          'id' => 'recently_created',
          'name' => 'LBL_NEW_RECORDS',
          'filter_definition' => 
          array (
            'date_entered' => 
            array (
              '$dateRange' => 'today',
            ),
          ),
          'editable' => false,
        ),
        4 => 
        array (
          'id' => 'by_category',
          'filter_definition' => 
          array (
            0 => 
            array (
              'category_id' => '',
            ),
          ),
          'editable' => true,
          'is_template' => true,
        ),
        5 => 
        array (
          'id' => 'recently_viewed',
          'name' => 'LBL_RECENTLY_VIEWED',
          'filter_definition' => 
          array (
            '$tracker' => '-7 day',
          ),
          'editable' => false,
        ),
      ),
    ),
  ),
  'operators' => 
  array (
    'meta' => 
    array (
      'nestedset' => 
      array (
        '$in' => 'LBL_OPERATOR_IS',
        '$not_in' => 'LBL_OPERATOR_IS_NOT',
        '$empty' => 'LBL_OPERATOR_EMPTY',
        '$not_empty' => 'LBL_OPERATOR_NOT_EMPTY',
      ),
      'htmleditable_tinymce' => 
      array (
        '$contains' => 'LBL_OPERATOR_CONTAINING_THESE_WORDS',
        '$not_contains' => 'LBL_OPERATOR_EXCLUDING_THESE_WORDS',
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
        'status' => 
        array (
        ),
        'language' => 
        array (
          'type' => 'enum-config',
          'key' => 'languages',
        ),
        'category_name' => 
        array (
        ),
        'revision' => 
        array (
        ),
        '$owner' => 
        array (
          'predefined_filter' => true,
          'vname' => 'LBL_CURRENT_USER_FILTER',
        ),
        'assigned_user_name' => 
        array (
        ),
        'tag' => 
        array (
        ),
        '$favorite' => 
        array (
          'predefined_filter' => true,
          'vname' => 'LBL_FAVORITES_FILTER',
        ),
        'active_date' => 
        array (
        ),
        'exp_date' => 
        array (
        ),
        'is_external' => 
        array (
        ),
        'kbsapprover_name' => 
        array (
        ),
      ),
    ),
  ),
  '_hash' => '5cdc850c71be80647ce65d10a0b359b1',
);

