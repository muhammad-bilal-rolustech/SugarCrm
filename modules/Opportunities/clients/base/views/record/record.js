/*
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
    extendsFrom: 'RecordView',

    /**
     * Holds a reference to the alert this view triggers
     */
    alert: undefined,

    /**
     * Holds a reference to the alert this view triggers
     */
    cancelClicked: function() {
        /**
         * todo: this is a sad way to work around some problems with sugarlogic and revertAttributes
         * but it makes things work now. Probability listens for Sales Stage to change and then by
         * SugarLogic, it updates probability when sales_stage changes. When the user clicks cancel,
         * it goes to revertAttributes() which sets the model back how it was, but when you try to
         * navigate away, it picks up those new changes as unsaved changes to your model, and tries to
         * falsely warn the user. This sets the model back to those changed attributes (causing them to
         * show up in this.model.changed) then calls the parent cancelClicked function which does the
         * exact same thing, but that time, since the model was already set, it doesn't see anything in
         * this.model.changed, so it doesn't warn the user.
         */
        var changedAttributes = this.model.changedAttributes(this.model.getSynced());
        this.model.set(changedAttributes, { revert: true });
        this._super('cancelClicked');
    },

    /**
     * @inheritdoc
     * @param {Object} options
     */
    initialize: function(options) {
        this.plugins = _.union(this.plugins, ['LinkedModel', 'HistoricalSummary', 'CommittedDeleteWarning']);

        this._super('initialize', [options]);

        app.utils.hideForecastCommitStageField(this.meta.panels);
    },
    
})
