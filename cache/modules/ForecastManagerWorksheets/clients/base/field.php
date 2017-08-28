<?php
$clientCache['ForecastManagerWorksheets']['base']['field'] = array (
  'currency' => 
  array (
    'templates' => 
    array (
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
 * @class View.Fields.Base.ForecastsManagerWorksheets.CurrencyField
 * @alias SUGAR.App.view.fields.BaseForecastsManagerWorksheetsCurrencyField
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
  'userLink' => 
  array (
    'templates' => 
    array (
      'list' => '
<div class="ellipsis_inline" data-placement="right"
     title="{{#unless value}}{{#if def.placeholder}}{{str def.placeholder this.model.module}}{{/if}}{{/unless}}{{value}}">
    <a href="javascript:void(0)" class="worksheetManagerLink" data-uid="{{uid}}">{{{value}}}</a>
</div>
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
 * @class View.Fields.Base.ForecastsManagerWorksheets.UserLinkField
 * @alias SUGAR.App.view.fields.BaseForecastsManagerWorksheetsUserLinkField
 * @extends View.Fields.Base.BaseField
 */
({
    /**
     * Attach a click event to <a class="worksheetManagerLink"> field
     */
    events: { \'click a.worksheetManagerLink\': \'linkClicked\' },

    plugins: [\'EllipsisInline\'],

    /**
     * Holds the user_id for passing into userTemplate
     */
    uid: \'\',

    initialize: function(options) {
        this.uid = this.model.get(\'user_id\');

        app.view.Field.prototype.initialize.call(this, options);
        return this;
    },

    format: function(value) {
        var su = this.context.get(\'selectedUser\') || this.context.parent.get(\'selectedUser\') || app.user.toJSON();
        if (value == su.full_name && su.id == app.user.get(\'id\')) {
            var hb = Handlebars.compile("{{str key module context}}");
            value = hb({\'key\': \'LBL_MY_MANAGER_LINE\', \'module\': this.module, \'context\': su});
        }

        return value;
    },

    /**
     * Handle a user link being clicked
     * @param event
     */
    linkClicked: function(event) {
        var uid = $(event.target).data(\'uid\');
        var selectedUser = {
            id: \'\',
            user_name: \'\',
            full_name: \'\',
            first_name: \'\',
            last_name: \'\',
            is_manager: false,
            showOpps: false,
            reportees: []
        };

        var options = {
            dataType: \'json\',
            success: _.bind(function(data) {
                selectedUser.id = data.id;
                selectedUser.user_name = data.user_name;
                selectedUser.full_name = data.full_name;
                selectedUser.first_name = data.first_name;
                selectedUser.last_name = data.last_name;
                selectedUser.is_manager = data.is_manager;
                selectedUser.reports_to_id = data.reports_to_id;
                selectedUser.reports_to_name = data.reports_to_name;
                selectedUser.is_top_level_manager = data.is_top_level_manager || (data.is_manager && _.isEmpty(data.reports_to_id));

                var su = this.context.get(\'selectedUser\') || this.context.parent.get(\'selectedUser\') || app.user.toJSON();
                // get the current selected user, if the id\'s match up set the showOpps to be true)
                selectedUser.showOpps = (su.id == data.id);

                this.context.parent.trigger("forecasts:user:changed", selectedUser, this.context.parent);
            }, this)
        };

        myURL = app.api.buildURL(\'Forecasts\', \'user/\' + uid);
        app.api.call(\'read\', myURL, null, options);
    }
})
',
    ),
  ),
  'commithistory' => 
  array (
    'templates' => 
    array (
      'log' => '
{{{commit}}}<br />
<span class="relativetime">
    {{str \'LBL_LAST_COMMIT\'}}{{relativeTime commit_date class=\'date\'}}
</span>
',
      'list' => '
{{str "LBL_LOADING_COMMIT_HISTORY" "Forecasts"}}
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
 * @class View.Fields.Base.ForecastsManagerWorksheets.CommithistoryField
 * @alias SUGAR.App.view.fields.BaseForecastsManagerWorksheetsCommithistoryField
 * @extends View.Fields.Base.BaseField
 */
({
    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super(\'initialize\', [options]);

        this.on(\'render\', function() {
            this.loadData();
        }, this);
    },

    /**
     * @inheritdoc
     */
    loadData: function() {
        var ctx = this.context.parent || this.context,
            su = ctx.get(\'selectedUser\') || app.user.toJSON(),
            isManager = this.model.get(\'is_manager\'),
            showOpps = (su.id == this.model.get(\'user_id\')) ? 1 : 0,
            forecastType = app.utils.getForecastType(isManager, showOpps),
            args_filter = [],
            options = {},
            url;

        args_filter.push(
            {"user_id": this.model.get(\'user_id\')},
            {"forecast_type": forecastType},
            {"timeperiod_id": this.view.selectedTimeperiod}
        );

        url = {"url": app.api.buildURL(\'Forecasts\', \'filter\'), "filters": {"filter": args_filter}};

        options.success = _.bind(function(data) {
            this.buildLog(data);
        }, this);
        app.api.call(\'create\', url.url, url.filters, options, { context: this });
    },

    /**
     * Build out the History Log
     * @param data
     */
    buildLog: function(data) {
        data = data.records;
        var ctx = this.context.parent || this.context,
            forecastCommitDate = ctx.get(\'currentForecastCommitDate\'),
            commitDate = app.date(forecastCommitDate),
            newestModel = new Backbone.Model(_.first(data)),
        // get everything that is left but the first item.
            otherModels = _.last(data, data.length - 1),
            oldestModel = {},
            displayCommitDate = newestModel.get(\'date_modified\');

        // using for because you can\'t break out of _.each
        for(var i = 0; i < otherModels.length; i++) {
            // check for the first model equal to or past the forecast commit date
            // we want the last commit just before the whole forecast was committed
            if (app.date(otherModels[i].date_modified) <= commitDate) {
                oldestModel = new Backbone.Model(otherModels[i]);
                break;
            }
        }

        // create the history log
        var tpl = app.template.getField(this.type, \'log\', this.module);
        this.$el.html(tpl({
            commit: app.utils.createHistoryLog(oldestModel, newestModel).text,
            commit_date: displayCommitDate
        }));
    },

    /**
     * Override the _render so we can tell it where to render at in the list view
     * @private
     */
    _render: function() {
        // set the $el equal to the place holder so it renders in the correct spot
        this.$el = this.view.$(\'span[sfuuid="\' + this.sfId + \'"]\');
        this._super(\'_render\');
    }
})
',
    ),
  ),
  '_hash' => 'b972c2aad375bad4cf85bfb071a5aeb2',
);

