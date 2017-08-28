<?php
$clientCache['Accounts']['base']['layout'] = array (
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
            'link' => 'tasks',
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
          'label' => 'LBL_MEMBER_ORG_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'members',
          ),
        ),
        5 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_EMAILS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'archived_emails',
          ),
        ),
        6 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_CONTACTS_SUBPANEL_TITLE',
          'override_subpanel_list_view' => 'subpanel-for-accounts',
          'context' => 
          array (
            'link' => 'contacts',
          ),
        ),
        7 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_OPPORTUNITIES_SUBPANEL_TITLE',
          'override_subpanel_list_view' => 'subpanel-for-accounts',
          'context' => 
          array (
            'link' => 'opportunities',
          ),
        ),
        8 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_LEADS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'leads',
          ),
        ),
        9 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_CASES_SUBPANEL_TITLE',
          'override_subpanel_list_view' => 'subpanel-for-accounts',
          'context' => 
          array (
            'link' => 'cases',
          ),
        ),
        10 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_BUGS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'bugs',
          ),
        ),
        11 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_PRODUCTS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'products',
          ),
        ),
        12 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_DOCUMENTS_SUBPANEL_TITLE',
          'context' => 
          array (
            'link' => 'documents',
          ),
        ),
        13 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_QUOTES_BILLTO',
          'override_paneltop_view' => 'panel-top-for-accounts',
          'override_subpanel_list_view' => 'subpanel-for-accounts',
          'context' => 
          array (
            'link' => 'quotes',
            'ignore_role' => 0,
          ),
        ),
        14 => 
        array (
          'layout' => 'subpanel',
          'label' => 'LBL_QUOTES_SHIPTO',
          'override_paneltop_view' => 'panel-top-for-accounts',
          'override_subpanel_list_view' => 'subpanel-for-accounts',
          'context' => 
          array (
            'link' => 'quotes_shipto',
            'ignore_role' => 0,
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
          'label' => 'LBL_CONTRACTS_SUBPANEL_TITLE',
          'override_subpanel_list_view' => 'subpanel-for-accounts',
          'context' => 
          array (
            'link' => 'contracts',
          ),
        ),
        17 => 
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
  'create' => 
  array (
    'meta' => 
    array (
      'components' => 
      array (
        0 => 
        array (
          'layout' => 
          array (
            'components' => 
            array (
              0 => 
              array (
                'layout' => 
                array (
                  'components' => 
                  array (
                    0 => 
                    array (
                      'view' => 'create',
                    ),
                  ),
                  'type' => 'simple',
                  'name' => 'main-pane',
                  'span' => 8,
                ),
              ),
              1 => 
              array (
                'layout' => 
                array (
                  'components' => 
                  array (
                    0 => 
                    array (
                      'view' => 
                      array (
                        'name' => 'dnb-account-create',
                        'label' => 'DNB Account Create',
                      ),
                      'width' => 12,
                    ),
                  ),
                  'type' => 'simple',
                  'name' => 'dashboard-pane',
                  'span' => 4,
                ),
              ),
              2 => 
              array (
                'layout' => 
                array (
                  'components' => 
                  array (
                    0 => 
                    array (
                      'layout' => 'preview',
                    ),
                  ),
                  'type' => 'simple',
                  'name' => 'preview-pane',
                  'span' => 8,
                ),
              ),
            ),
            'type' => 'default',
            'name' => 'sidebar',
            'span' => 12,
          ),
        ),
      ),
      'type' => 'create',
      'name' => 'base',
      'span' => 12,
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
                    'type' => 'opportunity-metrics',
                    'label' => 'LBL_DASHLET_OPPORTUNITY_NAME',
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
                    'type' => 'casessummary',
                    'label' => 'LBL_DASHLET_CASES_SUMMARY_NAME',
                  ),
                  'width' => 12,
                ),
              ),
              2 => 
              array (
                0 => 
                array (
                  'view' => 
                  array (
                    'type' => 'news',
                    'label' => 'LBL_DASHLET_NEWS_FEED_NAME',
                  ),
                  'width' => 12,
                ),
              ),
              3 => 
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
              4 => 
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
  '_hash' => '60925265cb098c4eebfa6c7b116bc50d',
);

