'use strict'
const Route = use('Route')

module.exports = Route.group(() => {

    /*---SECTION--*/

    /**
    * ~apiGVersion v1
    * ~apiVisibility user global
    * ~apiType private
    * ~actionGroup accounting
    *
    * @api {post} /v1/smartDocument/amortisationLogAsset/filter Filter amortisation log asset
    * @apiGroup Accounting
    *
    * @apiVersion 1.0.0
    * @apiDescription Filter amortisation log asset
    * @apiName amortisation log asset filter
    *
    */

    Route.post('/filter', 'Accounting/AmortisationLogAssetController.filter').middleware([
        'serviceCreator:Accounting/AmortisationLogAsset/Unscoped',
        // 'getUserListSettings:' // TODO: entity list
    ])


    /*---SECTION--*/

    /**
    * ~apiGVersion v1
    * ~apiVisibility
    * ~apiType private
    * ~actionGroup accounting
    *
    * @api {get} /v1/smartDocument/amortisationLogAsset/get/:id Filter single amortisation log asset
    * @apiGroup Accounting
    *
    * @apiVersion 1.0.0
    * @apiDescription Get amortisation log asset
    * @apiName amortisation log asset get
    *
    */

    Route.get('/get/:id', 'Accounting/AmortisationLogAssetController.get').middleware([
        'serviceCreator:Accounting/AmortisationLogAsset/Read'
    ])


    /*---SECTION--*/

    /**
    * ~apiGVersion v1
    * ~apiVisibility
    * ~apiType private
    * ~actionGroup accounting
    *
    * @api {post} /v1/smartDocument/amortisationLogAsset/create Create new amortisation log asset
    * @apiGroup Accounting
    *
    * @apiVersion 1.0.0
    * @apiDescription Create new amortisation log asset
    * @apiName amortisation log asset create
    *
    */

    Route.post('/create', 'Accounting/AmortisationLogAssetController.create').middleware([
        'serviceCreator:Accounting/AmortisationLogAsset/Unscoped'
    ])


    /*---SECTION--*/

    /**
    * ~apiGVersion v1
    * ~apiVisibility
    * ~apiType private
    * ~actionGroup accounting
    *
    * @api {patch} /v1/smartDocument/amortisationLogAsset/update/:id Update instance of amortisation log asset
    * @apiGroup Accounting
    *
    * @apiVersion 1.0.0
    * @apiDescription Update an instance of amortisation log asset
    * @apiName amortisation log asset update
    *
    */

    Route.patch('/update/:id', 'Accounting/AmortisationLogAssetController.update').middleware([
        'serviceCreator:Accounting/AmortisationLogAsset/Scoped'
    ])

    /*---SECTION--*/

    /**
    * ~apiGVersion v1
    * ~apiVisibility
    * ~apiType private
    * ~actionGroup accounting
    *
    * @api {delete} /v1/smartDocument/amortisationLogAsset/archive/:id Archive instance of amortisation log asset
    * @apiGroup Accounting
    *
    * @apiVersion 1.0.0
    * @apiDescription Archive an instance of amortisation log asset
    * @apiName amortisation log asset archive
    *
    */

    Route.delete('/archive/:id', 'Accounting/AmortisationLogAssetController.archive').middleware([
        'serviceCreator:Accounting/AmortisationLogAsset/Scoped'
    ])

    /*---SECTION--*/

    /**
     * ~apiGVersion v1
     * ~apiVisibility
     * ~apiType private
     * ~actionGroup accounting
     *
     * @api {patch} /v1/smartDocument/amortisationLogAsset/restore/:id Restore instance of amortisation log asset
     * @apiGroup Accounting
     *
     * @apiVersion 1.0.0
     * @apiDescription Restore an instance of amortisation log asset
     * @apiName amortisation log asset restore
     *
     */

    Route.patch('/restore/:id', 'Accounting/AmortisationLogAssetController.restore').middleware([
        'serviceCreator:Accounting/AmortisationLogAsset/Scoped'
    ])

    /*---SECTION--*/

    /**
     * ~apiGVersion v1
     * ~apiVisibility
     * ~apiType private
     * ~actionGroup accounting
     *
     * @api {delete} /v1/smartDocument/amortisationLogAsset/delete/:id Delete instance of amortisation log asset
     * @apiGroup Accounting
     *
     * @apiVersion 1.0.0
     * @apiDescription Delete an instance of amortisation log asset
     * @apiName amortisation log asset delete
     *
     */

    Route.delete('/delete/:id', 'Accounting/AmortisationLogAssetController.delete').middleware([
        'serviceCreator:Accounting/AmortisationLogAsset/Scoped'
    ])

})
