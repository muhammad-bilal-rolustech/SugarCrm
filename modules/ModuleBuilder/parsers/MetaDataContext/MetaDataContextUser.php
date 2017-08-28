<?php

if (!defined('sugarEntry') || !sugarEntry) {
    die('Not A Valid Entry Point');
}

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

/**
 * User metadata context
 */
class MetaDataContextUser implements MetaDataContextInterface
{
    /**
     * @var MetaDataContextInterface
     */
    protected $context;

    protected $user;

    /**
     * Constructor
     *
     * @param User $user
     */
    public function __construct(User $user, $roleSet = null)
    {
        $this->user = $user;

        $this->context = new MetaDataContextDefault();
    }

    /** {@inheritDoc} */
    public function getHash()
    {
        $hash = $this->context->getHash();
        //The admin state of a user can affect the metadata result regardless of roles
        if ($this->user->isAdmin()) {
            $hash = md5($hash . "admin");
        }

        return $hash;
    }

    /** {@inheritDoc} */
    public function isValid(array $file)
    {
        return $this->context->isValid($file);
    }

    /** {@inheritDoc} */
    public function compare(array $a, array $b)
    {
        return $this->context->compare($a, $b);
    }

}
