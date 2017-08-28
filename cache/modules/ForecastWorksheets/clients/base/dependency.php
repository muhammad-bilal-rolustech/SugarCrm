<?php
$clientCache['ForecastWorksheets']['base']['dependency'] = array (
  '_hash' => '40cd750bba9870f18aada2478b24840a',
  'dependencies' => 
  array (
    0 => 
    array (
      'name' => 'opportunity_name',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'opportunity',
        1 => 'opportunity_id',
      ),
      'onload' => false,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'SetValue',
          'params' => 
          array (
            'target' => 'opportunity_name',
            'value' => 'related($opportunity, "name")',
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
      'name' => 'account_name',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'account',
        1 => 'account_id',
      ),
      'onload' => false,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'SetValue',
          'params' => 
          array (
            'target' => 'account_name',
            'value' => 'related($account, "name")',
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
      'name' => 'campaign_name',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'campaign',
        1 => 'campaign_id',
      ),
      'onload' => false,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'SetValue',
          'params' => 
          array (
            'target' => 'campaign_name',
            'value' => 'related($campaign, "name")',
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
      'name' => 'product_template_name',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'template',
        1 => 'product_template_id',
      ),
      'onload' => false,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'SetValue',
          'params' => 
          array (
            'target' => 'product_template_name',
            'value' => 'related($template, "name")',
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
      'name' => 'category_name',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'category',
        1 => 'category_id',
      ),
      'onload' => false,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'SetValue',
          'params' => 
          array (
            'target' => 'category_name',
            'value' => 'related($category, "name")',
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
      'name' => 'probability',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'sales_stage',
      ),
      'onload' => false,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'SetValue',
          'params' => 
          array (
            'target' => 'probability',
            'value' => 'getDropdownValue("sales_probability_dom",$sales_stage)',
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
      'name' => 'commit_stage',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'probability',
      ),
      'onload' => false,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'SetValue',
          'params' => 
          array (
            'target' => 'commit_stage',
            'value' => 'forecastCommitStage($probability)',
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
      'name' => 'readOnlyopportunity_name',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'opportunity',
        1 => 'opportunity_id',
      ),
      'onload' => true,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'ReadOnly',
          'params' => 
          array (
            'target' => 'opportunity_name',
            'value' => 'true',
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    8 => 
    array (
      'name' => 'readOnlyaccount_name',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'account',
        1 => 'account_id',
      ),
      'onload' => true,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'ReadOnly',
          'params' => 
          array (
            'target' => 'account_name',
            'value' => 'true',
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    9 => 
    array (
      'name' => 'readOnlycampaign_name',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'campaign',
        1 => 'campaign_id',
      ),
      'onload' => true,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'ReadOnly',
          'params' => 
          array (
            'target' => 'campaign_name',
            'value' => 'true',
          ),
        ),
      ),
      'notActions' => 
      array (
      ),
    ),
    10 => 
    array (
      'name' => 'readOnlyproduct_template_name',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'template',
        1 => 'product_template_id',
      ),
      'onload' => true,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'ReadOnly',
          'params' => 
          array (
            'target' => 'product_template_name',
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
      'name' => 'readOnlycategory_name',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'category',
        1 => 'category_id',
      ),
      'onload' => true,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'ReadOnly',
          'params' => 
          array (
            'target' => 'category_name',
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
      'name' => 'readOnlyprobability',
      'hooks' => 
      array (
        0 => 'all',
      ),
      'trigger' => 'true',
      'triggerFields' => 
      array (
        0 => 'sales_stage',
      ),
      'onload' => true,
      'actions' => 
      array (
        0 => 
        array (
          'action' => 'ReadOnly',
          'params' => 
          array (
            'target' => 'probability',
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

