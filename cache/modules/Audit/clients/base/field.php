<?php
$clientCache['Audit']['base']['field'] = array (
  'currency' => 
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
 * @class View.Fields.Base.Audit.CurrencyField
 * @alias SUGAR.App.view.fields.BaseAuditCurrencyField
 * @extends View.Fields.Base.CurrencyField
 */
({
    /**
     * @inheritdoc
     */
    initialize: function(options) {
        this._super(\'initialize\', [options]);

        //audit log is always in base currency. Make sure the currency def reflects that.
        this.def.is_base_currency = true;
    }
})
',
    ),
  ),
  'htmleditable_tinymce' => 
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
    extendsFrom: \'Htmleditable_tinymceField\',
    /**
     * Sets the content displayed in the non-editor view
     *
     * @param {String} value Sanitized HTML to be placed in view
     */
    setViewContent: function(value) {
        var editable = this._getHtmlEditableField();
        if (this.action == \'list\') {
            // Strip HTML tags for ListView.
            value = $(\'<div/>\').html(value).text();
        }
        if (!editable) {
            return;
        }
        if (!_.isUndefined(editable.get(0)) && !_.isEmpty(editable.get(0).contentDocument)) {
            if (editable.contents().find(\'body\').length > 0) {
                editable.contents().find(\'body\').html(value);
            }
        } else {
            editable.html(value);
        }
    }
});
',
    ),
    'templates' => 
    array (
      'list' => '
<div
    data-html="true"
    class="htmleditable ellipsis_inline"
    data-placement="bottom"
    title="{{value}}" >
</div>

',
    ),
  ),
  'fieldtype' => 
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
 * @class View.Fields.Base.Audit.FieldtypeField
 * @alias SUGAR.App.view.fields.BaseAuditFieldtypeField
 * @extends View.Fields.Base.BaseField
 */
({
    /**
     * @inheritdoc
     * Convert the raw field type name
     * into the label of the field of the parent model.
     */
    format: function(value) {
        if (this.context && this.context.parent) {
            var parentModel = this.context.parent.get(\'model\'),
                field = parentModel.fields[value];
            if (field) {
                value = app.lang.get(field.label || field.vname, parentModel.module);
            }
        }
        return value;
    }
})
',
    ),
  ),
  '_hash' => '39c1d2de2babbc33ab43e4f3f79848a3',
);

