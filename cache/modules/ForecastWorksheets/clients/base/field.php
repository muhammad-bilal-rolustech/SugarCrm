<?php
$clientCache['ForecastWorksheets']['base']['field'] = array (
  'parent' => 
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
 * @class View.Fields.Base.ForecastsWorksheets.ParentField
 * @alias SUGAR.App.view.fields.BaseForecastsWorksheetsParentField
 * @extends View.Fields.Base.ParentField
 */
({
    extendsFrom: \'ParentField\',

    _render: function () {
        if(this.model.get(\'parent_deleted\') == 1) {
            // set the value for use in the template
            this.deleted_value = this.model.get(\'name\');
            // override the template to use the delete one
            this.options.viewName = \'deleted\';
        }
        this._super("_render");
    }
})
',
    ),
    'templates' => 
    array (
      'deleted' => '
{{deleted_value}}
',
    ),
  ),
  'currency' => 
  array (
    'templates' => 
    array (
      'list' => '
<div class="currency-field" data-placement="bottom" data-original-title="{{value}}">
{{#if transactionValue}}
    <label class="original">{{transactionValue}}</label><div class="converted">{{value}}</div>
{{else}}
    {{value}}
{{/if}}
</div>
',
      'edit' => '
<div class="controls">
    <span class="error-tooltip hide" rel="tooltip" data-container="body">
        <i class="fa fa-exclamation-circle"></i>
    </span>
</div>
<input type="text" value="{{value}}" class="input-small tright" maxlength="26">
<span sfuuid="{{currencySfId}}" class="hide"></span>
',
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
/**
 * @class View.Fields.Base.ForecastsWorksheets.CurrencyField
 * @alias SUGAR.App.view.fields.BaseForecastsWorksheetsCurrencyField
 * @extends View.Fields.Base.CurrencyField
 */
({
    extendsFrom: \'CurrencyField\',

    initialize: function(options) {
        // we need to make a clone of the plugins and then push to the new object. this prevents double plugin
        // registration across ExtendedComponents
        this.plugins = _.clone(this.plugins) || [];
        this.plugins.push(\'ClickToEdit\');
        this._super("initialize", [options]);
    }
})
',
    ),
  ),
  'enum' => 
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
 * @class View.Fields.Base.ForecastsWorksheets.EnumField
 * @alias SUGAR.App.view.fields.BaseForecastsWorksheetsEnumField
 * @extends View.Fields.Base.EnumField
 */
({
    extendsFrom: \'EnumField\',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        // we need to make a clone of the plugins and then push to the new object. this prevents double plugin
        // registration across ExtendedComponents
        this.plugins = _.clone(this.plugins) || [];
        this.plugins.push(\'ClickToEdit\');
        this._super("initialize", [options]);
    },

    /**
     * @inheritdoc
     */
    bindDataChange: function() {
        if(this.name === \'sales_stage\') {
            this.model.on(\'change:sales_stage\', function(model, newValue) {
                var salesStageWon = app.metadata.getModule(\'Forecasts\', \'config\').sales_stage_won;
                if(_.contains(salesStageWon, newValue)) {
                    this.context.trigger(\'forecasts:cteRemove:\' + model.id)
                }
            }, this);
        }

        if(this.name === \'commit_stage\') {
            this.context.on(\'forecasts:cteRemove:\' + this.model.id, function() {
                this.$el.removeClass(\'isEditable\');
                var $divEl = this.$(\'div.clickToEdit\');
                if($divEl.length) {
                    $divEl.removeClass(\'clickToEdit\');
                }
            }, this);
        }
    },

    /**
     * @inheritdoc
     */
    _render: function() {
        this._super(\'_render\');

        // make sure commit_stage enum maintains \'list\' class for style reasons
        if(this.name === \'commit_stage\' && this.$el.hasClass(\'disabled\')) {
            this.$el.addClass(\'list\');
        }
    }
})
',
    ),
  ),
  'int' => 
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
 * @class View.Fields.Base.ForecastsWorksheets.IntField
 * @alias SUGAR.App.view.fields.BaseForecastsWorksheetsIntField
 * @extends View.Fields.Base.IntField
 */
({
    extendsFrom: \'IntField\',

    initialize: function(options) {
        // we need to make a clone of the plugins and then push to the new object. this prevents double plugin
        // registration across ExtendedComponents
        this.plugins = _.clone(this.plugins) || [];
        this.plugins.push(\'ClickToEdit\');
        this._super("initialize", [options]);
    }
})
',
    ),
    'templates' => 
    array (
      'edit' => '
{{#if def.auto_increment}}
    {{#eq value "NaN"}}--{{else}}{{value}}{{/eq}}
{{else}}
    <div class="controls">
        <span class="error-tooltip hide" rel="tooltip" data-container="body">
            <i class="fa fa-exclamation-circle"></i>
        </span>

    </div>
    <input type="text" value="{{value}}" class="input-mini tright" maxlength="5">
{{/if}}
',
    ),
  ),
  'date' => 
  array (
    'templates' => 
    array (
      'edit' => '
<span class="edit">
    <div class="input-append date">
        <input type="text" data-type="date" class="input-small focused" value="{{value}}">
        <span class="add-on"><i class="fa fa-calendar"></i></span>
        <span class="error-tooltip hide" rel="tooltip" data-container="body">
            <i class="fa fa-exclamation-circle"></i>
        </span>
    </div>
</span>
',
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
/**
 * @class View.Fields.Base.ForecastsWorksheets.DateField
 * @alias SUGAR.App.view.fields.BaseForecastsWorksheetsDateField
 * @extends View.Fields.Base.DateField
 */
({
    extendsFrom: \'DateField\',

    /**
     * @inheritdoc
     *
     * Add `ClickToEdit` plugin to the list of required plugins.
     */
    _initPlugins: function() {
        this._super(\'_initPlugins\');

        this.plugins = _.union(this.plugins, [
            \'ClickToEdit\'
        ]);

        return this;
    }
})
',
    ),
  ),
  'relate' => 
  array (
    'templates' => 
    array (
      'list' => '
<div class="ellipsis_inline" data-placement="bottom" title="{{value}}">
    {{#if href}}
        <a href="{{href}}">{{value}}</a>
    {{else}}
        {{value}}
    {{/if}}
</div>
',
    ),
  ),
  '_hash' => '9c0f0916c0aafc28b366b28ee84b4e52',
);

