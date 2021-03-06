<?php
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

namespace Sugarcrm\Sugarcrm\Elasticsearch\Query;

/**
 *
 * The Knowledge Base specific query using More_Like_This this query.
 *
 * !!! This is a temporary solution!!!
 * This class contains custom logic about knowledge base and needs
 * more proper refactoring/cleanup further.
 */
class KBQuery implements QueryInterface
{
    /**
     * the related bean
     * @var object
     */
    protected $bean;

    /**
     * the searchable fields
     * @var array
     */

    protected $fields;

    /**
     * Set the related bean.
     * @param object $bean the related bean.
     */
    public function setBean($bean)
    {
        $this->bean = $bean;
    }

    /**
     * Set the searchable fields.
     * @param array $fields the searchable fields
     */
    public function setFields(array $fields)
    {
        $this->fields = $fields;
    }

    /**
     * Create a multi-match query.
     * @return \Elastica\Query\Bool
     */
    public function build()
    {
        $boolQuery = new \Elastica\Query\Bool();
        $mltName = $this->createMltQuery($this->fields['name'], $this->bean->name);
        $mltBody = $this->createMltQuery($this->fields['kbdocument_body'], $this->bean->kbdocument_body);
        $boolQuery->addShould($mltName); // And, addMust() for OR.
        $boolQuery->addShould($mltBody);
        return $boolQuery;
    }

    /**
     * Create the filter.
     * @param bool $addLangFilter a flag indicate if a lang filter is needed
     * @return \Elastica\Filter\Bool
     */
    public function createFilter($addLangFilter)
    {
        $mainFilter = new \Elastica\Filter\Bool();

        $currentIdFilter = new \Elastica\Filter\Term();
        $currentIdFilter->setTerm('_id', $this->bean->id);
        $mainFilter->addMustNot($currentIdFilter);

        $activeRevFilter = new \Elastica\Filter\Term();
        $activeRevFilter->setTerm('active_rev', 1);
        $mainFilter->addMust($activeRevFilter);

        if ($addLangFilter === true) {
            $langFilter = new \Elastica\Filter\Term();
            $langFilter->setTerm('language', $this->bean->language);
            $mainFilter->addMust($langFilter);
        }

        $statusFilterOr = new \Elastica\Filter\BoolOr();
        foreach ($this->bean->getPublishedStatuses() as $status) {
            $statusFilterOr->addFilter(new \Elastica\Filter\Term(array('status' => $status)));
        }
        $mainFilter->addMust($statusFilterOr);
        return $mainFilter;
    }

    /**
     * Create a more_like_this query.
     * @param $fields array the searchable fields
     * @param $text string the like text
     * @return \Elastica\Query\MoreLikeThis
     */
    protected function createMltQuery(array $fields, $text)
    {
        $mlt = new \Elastica\Query\MoreLikeThis();
        $mlt->setFields($fields);
        $mlt->setLikeText($text);
        $mlt->setMinTermFrequency(1);
        $mlt->setMinDocFrequency(1);
        return $mlt;
    }

}
