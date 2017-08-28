<?php
$clientCache['Products']['base']['layout'] = array (
  'list-dashboard' => 
  array (
    'meta' => 
    array (
      'metadata' => 
      array (
        'components' => 
        array (
          0 => 
          array (
            'rows' => 
            array (
              0 => 
              array (
                0 => 
                array (
                  'view' => 
                  array (
                    'type' => 'dashablelist',
                    'label' => 'TPL_DASHLET_MY_MODULE',
                    'display_columns' => 
                    array (
                      0 => 'name',
                      1 => 'billing_address_country',
                      2 => 'billing_address_city',
                    ),
                  ),
                  'context' => 
                  array (
                    'module' => 'Accounts',
                  ),
                  'width' => 12,
                ),
              ),
              1 => 
              array (
                0 => 
                array (
                  'view' => 
                  array (
                    'type' => 'dashablelist',
                    'label' => 'TPL_DASHLET_MY_MODULE',
                    'display_columns' => 
                    array (
                      0 => 'full_name',
                      1 => 'account_name',
                      2 => 'email',
                      3 => 'phone_work',
                    ),
                  ),
                  'context' => 
                  array (
                    'module' => 'Contacts',
                  ),
                  'width' => 12,
                ),
              ),
            ),
            'width' => 12,
          ),
        ),
      ),
      'name' => 'LBL_DEFAULT_DASHBOARD_TITLE',
    ),
  ),
  'subpanels' => 
  array (
    'meta' => 
    array (
      'components' => 
      array (
        0 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_DOCUMENTS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'documents',
          ),
        ),
        1 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_NOTES_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'notes',
          ),
        ),
        2 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_CONTRACTS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'contracts',
          ),
        ),
        3 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_RELATED_PRODUCTS',
          'override_subpanel_list_view' => 'subpanel-for-products',
          'context' => 
          array (
            'link' => 'related_products',
          ),
        ),
      ),
    ),
  ),
  '_hash' => '50e7235de9e1fca21708c46676fd47e5',
);

