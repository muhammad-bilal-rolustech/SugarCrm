<?php
$clientCache['Meetings']['base']['field'] = array (
  'launchbutton' => 
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
 * Button to launch an external meeting
 *
 * @class View.Fields.Base.Meetings.LaunchbuttonField
 * @alias SUGAR.App.view.fields.BaseMeetingsLaunchbuttonField
 * @extends View.Fields.Base.RowactionField
 */
({
    extendsFrom: \'RowactionField\',

    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super(\'initialize\', [options]);
        this.type = \'rowaction\';
        this.isHost = (this.def.host === true);
    },

    /**
     * @inheritdoc
     *
     * Hide this button if:
     * - Status is not Planned
     * - Type is Sugar (not an external meeting type)
     * - Host button and user does not have permission to start the meeting
     */
    _render: function() {
        if (this.model.get(\'status\') !== \'Planned\' ||
            this.model.get(\'type\') === \'Sugar\' ||
            (this.isHost && !this._hasPermissionToStartMeeting())
        ) {
            this.hide();
        } else {
            this._setLabel();
            this._super(\'_render\');
            this.show();
        }
    },

    /**
     * Check if the user has permission to host the external meeting
     * True if assigned user or an admin for Meetings
     *
     * @return {boolean}
     * @private
     */
    _hasPermissionToStartMeeting: function() {
        return (this.model.get(\'assigned_user_id\') === app.user.id || app.acl.hasAccess(\'admin\', \'Meetings\'));
    },

    /**
     * Set the appropriate label for this field
     * Use the Start Meeting label for host
     * Use the Join Meeting label otherwise
     *
     * @private
     */
    _setLabel: function() {
        this.label = (this.isHost) ?
            this._getLabel(\'LBL_START_MEETING\') :
            this._getLabel(\'LBL_JOIN_MEETING\');
    },

    /**
     * Build the appropriate label based on the meeting type
     *
     * @param {string} labelName Meetings module label
     * @return {string}
     * @private
     */
    _getLabel: function(labelName) {
        var meetingTypeStrings = app.lang.getAppListStrings(\'eapm_list\'),
            meetingType = meetingTypeStrings[this.model.get(\'type\')] ||
                app.lang.get(\'LBL_MODULE_NAME_SINGULAR\', this.module);

        return app.lang.get(labelName, this.module, {\'meetingType\': meetingType});
    },

    /**
     * Event to trigger the join/start of the meeting
     * Call the API first to get the host/join URL and determine if user has permission
     */
    rowActionSelect: function() {
        var url = app.api.buildURL(\'Meetings\', \'external\', {id: this.model.id});
        app.api.call(\'read\', url, null, {
            success: _.bind(this._launchMeeting, this),
            error: function() {
                app.alert.show(\'launch_meeting_error\', {
                    level: \'error\',
                    messages: app.lang.get(\'LBL_ERROR_LAUNCH_MEETING_GENERAL\', this.module)
                });
            }
        });
    },

    /**
     * Given the external meeting info retrieved from the API, launch the meeting
     * Display an error if user is not permitted to launch the meeting.
     *
     * @param {Object} externalInfo
     * @private
     */
    _launchMeeting: function(externalInfo) {
        var launchUrl = \'\';

        if (this.disposed) {
            return;
        }

        if (this.isHost && externalInfo.is_host_option_allowed) {
            launchUrl = externalInfo.host_url;
        } else if (!this.isHost && externalInfo.is_join_option_allowed) {
            launchUrl = externalInfo.join_url;
        } else {
            // user is not allowed to launch the external meeting
            app.alert.show(\'launch_meeting_error\', {
                level: \'error\',
                messages: app.lang.get(this.isHost ? \'LBL_EXTNOSTART_MAIN\' : \'LBL_EXTNOT_MAIN\', this.module)
            });
            return;
        }

        if (!_.isEmpty(launchUrl)) {
            window.open(launchUrl);
        } else {
            app.alert.show(\'launch_meeting_error\', {
                level: \'error\',
                messages: this._getLabel(\'LBL_EXTERNAL_MEETING_NO_URL\')
            });
        }
    },

    /**
     * Re-render the join button when the model changes
     */
    bindDataChange: function() {
        if (this.model) {
            this.model.on(\'change\', this.render, this);
        }
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
 * Enum modifications that are specific to Meeting type field
 * These modifications are temporary until the can (hopefully) be addressed in
 * the Enum field refactoring (SC-3481)
 *
 * @class View.Fields.Base.Meetings.EnumField
 * @alias SUGAR.App.view.fields.BaseMeetingsEnumField
 * @extends View.Fields.Base.EnumField
 */
({
    /**
     * @inheritdoc
     */
    _render: function() {
        if (this.name === \'type\') {
            this._ensureSelectedValueInItems();
        }
        this._super(\'_render\');
    },

    /**
     * Meeting type is a special case where we want to ensure the selected
     * value is an option in the list. This can happen when User A has
     * an external meeting integration set up (ie. WebEx) and sets WebEx as
     * the type. If User B does not have WebEx set up (only needed to create
     * WebEx meetings, not to join), User B should still see WebEx selected
     * on existing meetings, but not be able to create a meeting with WebEx.
     */
    _ensureSelectedValueInItems: function() {
        var value = this.model.get(this.name),
            meetingTypeLabels;

        //if we don\'t have items list yet or no value previously selected - no work to do
        if (!this.items || _.isEmpty(this.items) || _.isEmpty(value)) {
            return;
        }

        //if selected value is not in the list of items, but is in the list of meeting types...
        meetingTypeLabels = app.lang.getAppListStrings(\'eapm_list\');
        if (_.isEmpty(this.items[value]) && !_.isEmpty(meetingTypeLabels[value])) {
            //...add it to the list
            this.items[value] = meetingTypeLabels[value];
        }
    },

    /**
     * @inheritdoc
     *
     * Remove options for meeting type field which comes from the vardef - this
     * will force a retrieval of options from the server. Options is in the
     * vardef for meeting type to support mobile which does not have the ability
     * to pull dynamic enum list from the server yet.
     */
    loadEnumOptions: function(fetch, callback) {
        if (this.name === \'type\') {
            this.def.options = \'\';
        }
        this._super(\'loadEnumOptions\', [fetch, callback]);
    }
})
',
    ),
  ),
  '_hash' => '1ae0f6e85babb4184c0d0f491abb52eb',
);

