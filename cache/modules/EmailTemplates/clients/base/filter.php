<?php
$clientCache['EmailTemplates']['base']['filter'] = array (
  'basic' => 
  array (
    'meta' => 
    array (
      'create' => false,
      'quicksearch_field' => 
      array (
        0 => 'name',
      ),
      'quicksearch_priority' => 1,
      'filters' => 
      array (
        0 => 
        array (
          'id' => 'all_email_type',
          'name' => 'LBL_FILTER_EMAIL_TYPE_TEMPLATES',
          'filter_definition' => 
          array (
            '$or' => 
            array (
              0 => 
              array (
                'type' => 
                array (
                  '$is_null' => '',
                ),
              ),
              1 => 
              array (
                'type' => 
                array (
                  '$equals' => '',
                ),
              ),
              2 => 
              array (
                'type' => 
                array (
                  '$equals' => 'email',
                ),
              ),
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
      'default_filter' => 'all_email_type',
    ),
  ),
  '_hash' => 'c7713657ac48ea596fd95fe02513c565',
);

