<?php /* Smarty version 2.6.11, created on 2017-08-28 10:58:51
         compiled from modules/PdfManager/tpls/templateInvoice.tpl */ ?>
<table border="0" cellspacing="2">
<tbody>
<tr>
<td rowspan="6" width="180%"><img src="<?php echo $this->_tpl_vars['logoUrl']; ?>
" alt="" /></td>
<td width="60%"><strong><?php echo $this->_tpl_vars['MOD']['LBL_TPL_INVOICE']; ?>
</strong></td>
<td width="60%">&nbsp;</td>
</tr>
<tr>
<td bgcolor="#DCDCDC" width="75%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_INVOICE_NUMBER']; ?>
</td>
<td width="75%"><?php echo '{$fields.quote_num}'; ?>
</td>
</tr>
<tr>
<td bgcolor="#DCDCDC" width="75%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_SALES_PERSON']; ?>
</td>
<td width="75%"><?php echo '{if isset($fields.assigned_user_link.name)}{$fields.assigned_user_link.name}{/if}'; ?>
</td>
</tr>
<tr>
<td bgcolor="#DCDCDC" width="75%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_VALID_UNTIL']; ?>
</td>
<td width="75%"><?php echo '{$fields.date_quote_expected_closed}'; ?>
</td>
</tr>
<tr>
<td bgcolor="#DCDCDC" width="75%"><?php echo $this->_tpl_vars['MOD']['LBL_PURCHASE_ORDER_NUM']; ?>
</td>
<td width="75%"><?php echo '{$fields.purchase_order_num}'; ?>
</td>
</tr>
<tr>
<td bgcolor="#DCDCDC" width="75%"><?php echo $this->_tpl_vars['MOD']['LBL_PAYMENT_TERMS']; ?>
</td>
<td width="75%"><?php echo '{$fields.payment_terms}'; ?>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<table style="width: 50%;" border="0" cellspacing="2">
<tbody>
<tr style="color: #ffffff;" bgcolor="#4B4B4B">
<td><?php echo $this->_tpl_vars['MOD']['LBL_TPL_BILL_TO']; ?>
</td>
<td><?php echo $this->_tpl_vars['MOD']['LBL_TPL_SHIP_TO']; ?>
</td>
</tr>
<tr>
<td><?php echo '{$fields.billing_contact_name}'; ?>
</td>
<td><?php echo '{$fields.shipping_contact_name}'; ?>
</td>
</tr>
<tr>
<td><?php echo '{$fields.billing_account_name}'; ?>
</td>
<td><?php echo '{$fields.shipping_account_name}'; ?>
</td>
</tr>
<tr>
<td><?php echo '{$fields.billing_address_street}'; ?>
</td>
<td><?php echo '{$fields.shipping_address_street}'; ?>
</td>
</tr>
<tr>
<td><?php echo '{if $fields.billing_address_city!=""}{$fields.billing_address_city},{/if} {if $fields.billing_address_state!=""}{$fields.billing_address_state},{/if} {$fields.billing_address_postalcode}'; ?>
</td>
<td><?php echo '{if $fields.shipping_address_city!=""}{$fields.shipping_address_city},{/if} {if $fields.shipping_address_state!=""}{$fields.shipping_address_state},{/if} {$fields.shipping_address_postalcode}'; ?>
</td>
</tr>
<tr>
<td><?php echo '{$fields.billing_address_country}'; ?>
</td>
<td><?php echo '{$fields.shipping_address_country}'; ?>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<?php echo '{foreach from=$product_bundles item="bundle"}'; ?>

<p>&nbsp;</p>
<h3><?php echo '{$bundle.name}'; ?>
</h3>
<table style="width: 100%;" border="0">
<tbody>
<tr style="color: #ffffff;" bgcolor="#4B4B4B">
<td width="70%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_QUANTITY']; ?>
</td>
<td width="175%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_PART_NUMBER']; ?>
</td>
<td width="175%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_PRODUCT']; ?>
</td>
<td width="70%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_LIST_PRICE']; ?>
</td>
<td width="70%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_UNIT_PRICE']; ?>
</td>
<td width="70%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_EXT_PRICE']; ?>
</td>
<td width="70%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_DISCOUNT']; ?>
</td>
</tr>
<!--START_PRODUCT_LOOP-->
<tr>
<td width="70%"><?php echo '{if isset($product.quantity)}{$product.quantity}{/if}'; ?>
</td>
<td width="175%"><?php echo '{if isset($product.mft_part_num)}{$product.mft_part_num}{/if}'; ?>
</td>
<td width="175%"><?php echo '{if isset($product.name)}{$product.name}{/if}{if isset($product.list_price)}<br></br>{$product.description}{/if}'; ?>
</td>
<td align="right" width="70%"><?php echo '{if isset($product.list_price)}{$product.list_price}{/if}'; ?>
</td>
<td align="right" width="70%"><?php echo '{if isset($product.discount_price)}{$product.discount_price}{/if}'; ?>
</td>
<td align="right" width="70%"><?php echo '{if isset($product.ext_price)}{$product.ext_price}{/if}'; ?>
</td>
<td align="right" width="70%"><?php echo '
    {if isset($product.discount_amount)}
        {if !empty($product.discount_select)}
            {sugar_number_format var=$product.discount_amount}%
        {else}
            {sugar_currency_format var=$product.discount_amount currency_id=$product.currency_id}
        {/if}
    {/if}'; ?>
</td>
</tr>
<!--END_PRODUCT_LOOP--></tbody>
</table>
<table>
<tbody>
<tr>
<td><hr /></td>
</tr>
</tbody>
</table>
<table style="width: 100%; margin: auto;" border="0">
<tbody>
<tr>
<td width="210%">&nbsp;</td>
<td width="45%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_SUBTOTAL']; ?>
</td>
<td align="right" width="45%"><?php echo '{$bundle.subtotal}'; ?>
</td>
</tr>
<tr>
<td width="210%">&nbsp;</td>
<td width="45%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_DISCOUNT']; ?>
</td>
<td align="right" width="45%"><?php echo '{$bundle.deal_tot}'; ?>
</td>
</tr>
<tr>
<td width="210%">&nbsp;</td>
<td width="45%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_DISCOUNTED_SUBTOTAL']; ?>
</td>
<td align="right" width="45%"><?php echo '{$bundle.new_sub}'; ?>
</td>
</tr>
<tr>
<td width="210%">&nbsp;</td>
<td width="45%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_TAX']; ?>
</td>
<td align="right" width="45%"><?php echo '{$bundle.tax}'; ?>
</td>
</tr>
<tr>
<td width="210%">&nbsp;</td>
<td width="45%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_SHIPPING']; ?>
</td>
<td align="right" width="45%"><?php echo '{$bundle.shipping}'; ?>
</td>
</tr>
<tr>
<td width="210%">&nbsp;</td>
<td width="45%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_TOTAL']; ?>
</td>
<td align="right" width="45%"><?php echo '{$bundle.total}'; ?>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<p>&nbsp;</p>
<?php echo '{/foreach}'; ?>

<p>&nbsp;</p>
<p>&nbsp;</p>
<table>
<tbody>
<tr>
<td><hr /></td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<table style="width: 100%; margin: auto;" border="0">
<tbody>
<tr>
<td width="200%">&nbsp;</td>
<td style="font-weight: bold;" colspan="2" align="center" width="150%"><b><?php echo $this->_tpl_vars['MOD']['LBL_TPL_GRAND_TOTAL']; ?>
</b></td>
<td width="75%">&nbsp;</td>
<td align="right" width="75%">&nbsp;</td>
</tr>
<tr>
<td width="200%">&nbsp;</td>
<td width="75%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_CURRENCY']; ?>
</td>
<td width="75%"><?php echo '{$fields.currency_iso}'; ?>
</td>
<td width="75%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_SUBTOTAL']; ?>
</td>
<td align="right" width="75%"><?php echo '{$fields.subtotal}'; ?>
</td>
</tr>
<tr>
<td width="200%">&nbsp;</td>
<td width="75%">&nbsp;</td>
<td align="right" width="75%">&nbsp;</td>
<td width="75%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_DISCOUNT']; ?>
</td>
<td align="right" width="75%"><?php echo '{$fields.deal_tot}'; ?>
</td>
</tr>
<tr>
<td width="200%">&nbsp;</td>
<td width="75%">&nbsp;</td>
<td width="75%">&nbsp;</td>
<td width="75%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_DISCOUNTED_SUBTOTAL']; ?>
</td>
<td align="right" width="75%"><?php echo '{$fields.new_sub}'; ?>
</td>
</tr>
<tr>
<td width="200%">&nbsp;</td>
<td width="75%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_TAX_RATE']; ?>
</td>
<td width="75%"><?php echo '{$fields.taxrate_value}'; ?>
</td>
<td width="75%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_TAX']; ?>
</td>
<td align="right" width="75%"><?php echo '{$fields.tax}'; ?>
</td>
</tr>
<tr>
<td width="200%">&nbsp;</td>
<td width="75%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_SHIPPING_PROVIDER']; ?>
</td>
<td width="75%"><?php echo '{$fields.shipper_name}'; ?>
</td>
<td width="75%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_SHIPPING']; ?>
</td>
<td align="right" width="75%"><?php echo '{$fields.shipping}'; ?>
</td>
</tr>
<tr>
<td width="200%">&nbsp;</td>
<td width="75%">&nbsp;</td>
<td width="75%">&nbsp;</td>
<td width="75%"><?php echo $this->_tpl_vars['MOD']['LBL_TPL_TOTAL']; ?>
</td>
<td align="right" width="75%"><?php echo '{$fields.total}'; ?>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<table>
<tbody>
<tr>
<td><hr /></td>
</tr>
</tbody>
</table>