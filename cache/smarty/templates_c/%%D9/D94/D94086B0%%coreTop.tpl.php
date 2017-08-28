<?php /* Smarty version 2.6.11, created on 2017-08-28 11:37:43
         compiled from modules/DynamicFields/templates/Fields/Forms/coreTop.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'sugar_translate', 'modules/DynamicFields/templates/Fields/Forms/coreTop.tpl', 16, false),)), $this); ?>

<table width="100%">
<tr>
	<td class='mbLBL' width='30%' ><?php echo smarty_function_sugar_translate(array('module' => 'DynamicFields','label' => 'COLUMN_TITLE_NAME'), $this);?>
:</td>
	<td>
	<?php if ($this->_tpl_vars['hideLevel'] == 0): ?>
		<input id="field_name_id" maxlength=<?php if (isset ( $this->_tpl_vars['package']->name ) && $this->_tpl_vars['package']->name != 'studio'): ?>30<?php else: ?>28<?php endif; ?> type="text" name="name" value="<?php echo $this->_tpl_vars['vardef']['name']; ?>
"
		  onchange="
		document.getElementById('label_key_id').value = 'LBL_'+document.getElementById('field_name_id').value.toUpperCase();
		document.getElementById('label_value_id').value = document.getElementById('field_name_id').value.replace(/\_+/g,' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		document.getElementById('field_name_id').value = document.getElementById('field_name_id').value.toLowerCase();" />
	<?php else: ?>
		<input id= "field_name_id" type="hidden" name="name" value="<?php echo $this->_tpl_vars['vardef']['name']; ?>
"
		  onchange="
		document.getElementById('label_key_id').value = 'LBL_'+document.getElementById('field_name_id').value.toUpperCase();
		document.getElementById('label_value_id').value = document.getElementById('field_name_id').value.replace(/\_+/g,' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		document.getElementById('field_name_id').value = document.getElementById('field_name_id').value.toLowerCase();"/>
		<?php echo $this->_tpl_vars['vardef']['name']; ?>

	<?php endif; ?>
        <script>
            <?php echo '
            addToValidateCallback("popup_form", "name", "callback", true, "';  echo smarty_function_sugar_translate(array('module' => 'DynamicFields','label' => 'COLUMN_TITLE_NAME'), $this); echo '", (function(nameExceptions, existingFields) {
                return function(formName, fieldName, index) {
                    var el = document.forms[formName].elements[fieldName],
                        value = el.value, i, arrValue;

                    // will be already validated as required
                    if (value === "") {
                        return true;
                    }

                    if (!isDBName(value)) {
                        validate[formName][index][msgIndex] = "';  echo smarty_function_sugar_translate(array('module' => 'DynamicFields','label' => 'ERR_FIELD_NAME_NON_DB_CHARS'), $this); echo '";
                        return false;
                    }

                    value = value.toUpperCase();

                    // check where field name is in the list of exceptions
                    for (i = 0; i < nameExceptions.length; i++) {
                        arrValue = nameExceptions[i];
                        if (arrValue == value) {
                            validate[formName][index][msgIndex] = "';  echo smarty_function_sugar_translate(array('module' => 'DynamicFields','label' => 'ERR_RESERVED_FIELD_NAME'), $this); echo '";
                            return false;
                        }
                    }

                    ';  if ($this->_tpl_vars['hideLevel'] == 0):  echo '
                    // check where field name is in the list of existing fields
                    for (i = 0; i < existingFields.length; i++) {
                        arrValue = existingFields[i];
                        if (arrValue == value) {
                            validate[formName][index][msgIndex] = "';  echo smarty_function_sugar_translate(array('module' => 'DynamicFields','label' => 'ERR_FIELD_NAME_ALREADY_EXISTS'), $this); echo '";
                            return false;
                        }
                    }
                    ';  endif;  echo '

                    return true;
                }
            })(';  echo $this->_tpl_vars['field_name_exceptions']; ?>
, <?php echo $this->_tpl_vars['existing_field_names']; ?>
));
        </script>
	</td>
</tr>
<tr>
	<td class='mbLBL'><?php echo smarty_function_sugar_translate(array('module' => 'DynamicFields','label' => 'COLUMN_TITLE_DISPLAY_LABEL'), $this);?>
:</td>
	<td>
		<input id="label_value_id" type="text" name="labelValue" value="<?php echo $this->_tpl_vars['lbl_value']; ?>
">
	</td>
</tr>
<tr>
	<td class='mbLBL'><?php echo smarty_function_sugar_translate(array('module' => 'DynamicFields','label' => 'COLUMN_TITLE_LABEL'), $this);?>
:</td>
	<td>
    <?php if ($this->_tpl_vars['hideLevel'] < 1): ?>
	    <input id ="label_key_id" type="text" name="label" value="<?php echo $this->_tpl_vars['vardef']['vname']; ?>
">
	<?php else: ?>
		<input type="text" readonly value="<?php echo $this->_tpl_vars['vardef']['vname']; ?>
" disabled=1>
		<input id ="label_key_id" type="hidden" name="label" value="<?php echo $this->_tpl_vars['vardef']['vname']; ?>
">
	<?php endif; ?>
	</td>
</tr>
<tr>
	<td class='mbLBL'><?php echo smarty_function_sugar_translate(array('module' => 'DynamicFields','label' => 'COLUMN_TITLE_HELP_TEXT'), $this);?>
:</td><td><?php if ($this->_tpl_vars['hideLevel'] < 5): ?><input type="text" name="help" value="<?php echo $this->_tpl_vars['vardef']['help']; ?>
"><?php else: ?><input type="hidden" name="help" value="<?php echo $this->_tpl_vars['vardef']['help']; ?>
"><?php echo $this->_tpl_vars['vardef']['help'];  endif; ?>
	</td>
</tr>
<tr>
    <td class='mbLBL'><?php echo smarty_function_sugar_translate(array('module' => 'DynamicFields','label' => 'COLUMN_TITLE_COMMENT_TEXT'), $this);?>
:</td><td><?php if ($this->_tpl_vars['hideLevel'] < 5): ?><input type="text" name="comments" value="<?php echo $this->_tpl_vars['vardef']['comments']; ?>
"><?php else: ?><input type="hidden" name="comment" value="<?php echo $this->_tpl_vars['vardef']['comment']; ?>
"><?php echo $this->_tpl_vars['vardef']['comment'];  endif; ?>
    </td>
</tr>