<?php
$clientCache['Emails']['base']['layout'] = array (
  'records' => 
  array (
    'meta' => 
    array (
      'name' => 'bwc',
      'type' => 'bwc',
      'components' => 
      array (
        0 => 
        array (
          'view' => 'bwc',
        ),
      ),
    ),
  ),
  'archive-email' => 
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
                      'view' => 'archive-email',
                    ),
                  ),
                  'type' => 'simple',
                  'name' => 'main-pane',
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
      'type' => 'simple',
      'name' => 'base',
      'span' => 12,
    ),
  ),
  'compose-documents' => 
  array (
    'meta' => 
    array (
      'components' => 
      array (
        0 => 
        array (
          'layout' => 'selection-list',
          'context' => 
          array (
            'module' => 'Documents',
          ),
        ),
      ),
      'type' => 'simple',
      'span' => 12,
    ),
  ),
  'compose' => 
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
                      'view' => 'compose',
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
      'type' => 'compose',
      'name' => 'base',
      'span' => 12,
    ),
    'controller' => 
    array (
      'base' => '/*
 * Your installation or use of this SugarCRM file is subject to the applicable
 * terms available at
 * http://support.sugarcrm.com/06_Customer_Center/10_Master_Subscription_Agreements/.
 * If you do not agree to all of the applicable terms or do not have the
 * authority to bind the entity as an authorized representative, then do not
 * install or use this SugarCRM file.
 *
 * Copyright (C) SugarCRM Inc. All rights reserved.
 */
({
    plugins: [\'ShortcutSession\'],

    shortcuts: [
        \'Sidebar:Toggle\',
        \'Record:Cancel\',
        \'Compose:Action:More\',
        \'DragdropSelect2:SelectAll\'
    ]
})
',
    ),
  ),
  'compose-addressbook' => 
  array (
    'controller' => 
    array (
      'base' => '/*
 * Your installation or use of this SugarCRM file is subject to the applicable
 * terms available at
 * http://support.sugarcrm.com/06_Customer_Center/10_Master_Subscription_Agreements/.
 * If you do not agree to all of the applicable terms or do not have the
 * authority to bind the entity as an authorized representative, then do not
 * install or use this SugarCRM file.
 *
 * Copyright (C) SugarCRM Inc. All rights reserved.
 */
/**
 * @class View.Layouts.Base.Emails.ComposeAddressbookLayout
 * @alias SUGAR.App.view.layouts.BaseEmailsComposeAddressbookLayout
 * @extends View.Layout
 */
({
    /**
     * @inheritdoc
     */
    initialize: function(options) {
        app.view.Layout.prototype.initialize.call(this, options);
        this.collection.sync = this.sync;
        this.collection.allowed_modules = [\'Accounts\', \'Contacts\', \'Leads\', \'Prospects\', \'Users\'];
        this.context.on(\'compose:addressbook:search\', this.search, this);
    },
    /**
     * Calls the custom Mail API endpoint to search for email addresses.
     *
     * @param method
     * @param model
     * @param options
     */
    sync: function(method, model, options) {
        var callbacks,
            url;

        options = options || {};

        // only fetch from the approved modules
        if (_.isEmpty(options.module_list)) {
            options.module_list = [\'all\'];
        } else {
            options.module_list = _.intersection(this.allowed_modules, options.module_list);
        }

        // this is a hack to make pagination work while trying to minimize the affect on existing configurations
        // there is a bug that needs to be fixed before the correct approach (config.maxQueryResult vs. options.limit)
        // can be determined
        app.config.maxQueryResult = app.config.maxQueryResult || 20;
        options.limit = options.limit || app.config.maxQueryResult;

        options = app.data.parseOptionsForSync(method, model, options);

        callbacks = app.data.getSyncCallbacks(method, model, options);
        this.trigger(\'data:sync:start\', method, model, options);

        url = app.api.buildURL(\'Mail\', \'recipients/find\', null, options.params);
        app.api.call(\'read\', url, null, callbacks);
    },
    /**
     * Adds the set of modules and term that should be used to search for recipients.
     *
     * @param {Array} modules
     * @param {String} term
     */
    search: function(modules, term) {
        // reset offset to 0 on a search. make sure that it resets and does not update.
        this.collection.fetch({query: term, module_list: modules, offset: 0, update: false});
    }
})
',
    ),
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
                      'view' => 'compose-addressbook-headerpane',
                    ),
                    1 => 
                    array (
                      'view' => 'compose-addressbook-recipientscontainer',
                    ),
                    2 => 
                    array (
                      'view' => 'compose-addressbook-filter',
                    ),
                    3 => 
                    array (
                      'layout' => 'compose-addressbook-list',
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
      'type' => 'compose-addressbook',
      'name' => 'base',
      'span' => 12,
    ),
  ),
  'compose-addressbook-list' => 
  array (
    'meta' => 
    array (
      'type' => 'compose-addressbook-list',
      'span' => 12,
      'components' => 
      array (
        0 => 
        array (
          'view' => 'compose-addressbook-list',
        ),
        1 => 
        array (
          'view' => 'compose-addressbook-list-bottom',
        ),
      ),
    ),
  ),
  '_hash' => '0f7671114deacfd75bc37fcf7774f32a',
);

