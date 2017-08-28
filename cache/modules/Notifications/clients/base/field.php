<?php
$clientCache['Notifications']['base']['field'] = array (
  'severity' => 
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
({
    /**
     * Severity Widget.
     *
     * Extends from EnumField widget adding style property according to specific
     * severity.
     */
    extendsFrom: \'EnumField\',

    /**
     * An object where its keys map to specific severity and values to matching
     * CSS classes.
     *
     * @property {Object}
     * @protected
     */
    _styleMapping: {
        \'default\': \'label-unknown\',
        alert: \'label-important\',
        information: \'label-info\',
        other: \'label-inverse\',
        success: \'label-success\',
        warning: \'label-warning\'
    },

    /**
     * @inheritdoc
     *
     * Listen to changes on `is_read` field only if view name matches
     * notifications.
     */
    bindDataChange: function() {
        this._super(\'bindDataChange\');

        if (this.model && this.view.name === \'notifications\') {
            this.model.on(\'change:is_read\', this.render, this);
        }
    },

    /**
     * @inheritdoc
     *
     * Inject additional logic to load templates based on different view names
     * according to the following:
     *
     * - `fields/severity/<view-name>-<tpl-name>.hbs`
     * - `fields/severity/<view-template-name>-<tpl-name>.hbs`
     */
    _loadTemplate: function() {
        this._super(\'_loadTemplate\');

        var template = app.template.getField(
            this.type,
            this.view.name + \'-\' + this.tplName,
            this.model.module
        );

        if (!template && this.view.meta && this.view.meta.template) {
            template = app.template.getField(
                this.type,
                this.view.meta.template + \'-\' + this.tplName,
                this.model.module
            );
        }

        this.template = template || this.template;
    },

    /**
     * @inheritdoc
     *
     * Defines `severityCss` property based on field value. If current severity
     * does not match a known value its value is used as label and default
     * style is used as well.
     */
    _render: function () {
        var severity = this.model.get(this.name),
            options = app.lang.getAppListStrings(this.def.options);

        this.severityCss = this._styleMapping[severity] || this._styleMapping[\'default\'];
        this.severityLabel = options[severity] || severity;

        this._super(\'_render\');
    }
})
',
    ),
    'templates' => 
    array (
      'detail' => '
<span class="label {{severityCss}} ellipsis_inline">{{severityLabel}}</span>
',
      'notifications-detail' => '
<span class="label{{#unless model.attributes.is_read}} {{../severityCss}}{{/unless}}">{{severityLabel}}</span>
',
    ),
  ),
  'read' => 
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
({
    events: {
        \'click [data-action=toggle]\': \'toggleIsRead\',
        \'mouseover [data-action=toggle]\': \'toggleMouse\',
        \'mouseout [data-action=toggle]\': \'toggleMouse\'
    },

    plugins: [\'Tooltip\'],

    /**
     * @inheritdoc
     *
     * The read field is always a readonly field.
     *
     * If `mark_as_read` option is enabled on metadata it means we should
     * automatically mark the notification as read.
     *
     */
    initialize: function(options) {
        options.def.readonly = true;

        this._super(\'initialize\', [options]);

        if (options.def && options.def.mark_as_read) {
            this.markAs(true);
        }
    },

    /**
     * Event handler for mouse events.
     *
     * @param {Event} event Mouse over / mouse out.
     */
    toggleMouse: function(event) {
        var $target= this.$(event.currentTarget),
            isRead = this.model.get(\'is_read\');

        if (!isRead) {
            return;
        }

        var label = event.type === \'mouseover\' ? \'LBL_UNREAD\' : \'LBL_READ\';
        $target.html(app.lang.get(label, this.module));
        $target.toggleClass(\'label-inverse\', event.type === \'mouseover\');
    },

    /**
     * Toggle notification `is_read` flag.
     */
    toggleIsRead: function() {
        this.markAs(!this.model.get(\'is_read\'));
    },

    /**
     * Mark notification as read/unread.
     *
     * @param {Boolean} read `True` marks notification as read, `false` as
     *   unread.
     */
    markAs: function(read) {
        if (read === this.model.get(\'is_read\')) {
            return;
        }

        this.model.save({is_read: !!read}, {
            success: _.bind(function() {
                if (!this.disposed) {
                    this.render();
                }
            }, this)
        });
    }
})
',
    ),
    'templates' => 
    array (
      'detail' => '
<span data-action="toggle"
      class="label{{#unless this.model.attributes.is_read}} label-inverse{{/unless}}"
        >{{#if this.model.attributes.is_read}}{{str \'LBL_READ\' this.module}}{{else}}{{str \'LBL_UNREAD\' this.module}}{{/if}}</span>
',
    ),
  ),
  '_hash' => 'a66424ce35deb736e3f1a58310792e83',
);

