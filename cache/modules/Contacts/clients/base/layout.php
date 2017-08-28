<?php
$clientCache['Contacts']['base']['layout'] = array (
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
          'label' => 'LBL_CALLS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'calls',
          ),
        ),
        1 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_MEETINGS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'meetings',
          ),
        ),
        2 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_TASKS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'all_tasks',
          ),
        ),
        3 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_NOTES_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'notes',
          ),
        ),
        4 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_LEADS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'leads',
          ),
        ),
        5 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_OPPORTUNITIES_SUBPANEL_TITLE',
          'override_subpanel_list_view' => 'subpanel-for-contacts',
          'context' => 
          array (
            'link' => 'opportunities',
          ),
        ),
        6 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_EMAILS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'archived_emails',
          ),
        ),
        7 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_CASES_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'cases',
          ),
        ),
        8 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_BUGS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'bugs',
          ),
        ),
        9 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_DIRECT_REPORTS_SUBPANEL_TITLE',
          'override_subpanel_list_view' => 'subpanel-for-contacts',
          'context' => 
          array (
            'link' => 'direct_reports',
          ),
        ),
        10 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_DOCUMENTS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'documents',
          ),
        ),
        11 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_QUOTES_SHIP_TO',
          'context' => 
          array (
            'link' => 'quotes',
            'ignore_role' => 0,
          ),
        ),
        12 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_QUOTES_BILL_TO',
          'context' => 
          array (
            'link' => 'billing_quotes',
            'ignore_role' => 0,
          ),
        ),
        13 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_CONTRACTS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'contracts',
          ),
        ),
        14 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_PRODUCTS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'products',
          ),
        ),
        15 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_CAMPAIGN_LIST_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'campaigns',
          ),
        ),
        16 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_PROJECTS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'project',
          ),
        ),
      ),
    ),
  ),
  'record-dashboard' => 
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
                    'type' => 'planned-activities',
                    'label' => 'LBL_PLANNED_ACTIVITIES_DASHLET',
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
                    'type' => 'history',
                    'label' => 'LBL_HISTORY_DASHLET',
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
  '_hash' => '6473265b652929757b0a52f4b3ec5e88',
);

