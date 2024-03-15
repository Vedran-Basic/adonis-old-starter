'use strict'
const Route = use('Route')

module.exports = Route.group(() => {

    /*---SECTION--*/

    /**
    * ~apiGVersion v1
    * ~apiVisibility user global
    * ~apiType private
    * ~actionGroup $entityGroupCamelCase$
    *
    * @api {post} /v1/$apiNameWithoutSuffix$/$entityCamelCase$/filter Filter $entityLowerCaseSpaceSeparated$
    * @apiGroup $entityGroupPascalCase$
    *
    * @apiVersion 1.0.0
    * @apiDescription Filter $entityLowerCaseSpaceSeparated$
    * @apiName $entityLowerCaseSpaceSeparated$ filter
    *
    */

    Route.post('/filter', '$entityGroupPascalCase$/$entityPascalCase$Controller.filter').middleware([
        'serviceCreator:$entityGroupPascalCase$/$entityPascalCase$/Unscoped',
        // 'getUserListSettings:$entityPascalCaseList$' // TODO: entity list
    ])


    /*---SECTION--*/

    /**
    * ~apiGVersion v1
    * ~apiVisibility
    * ~apiType private
    * ~actionGroup $entityGroupCamelCase$
    *
    * @api {get} /v1/$apiNameWithoutSuffix$/$entityCamelCase$/get/:id Filter single $entityLowerCaseSpaceSeparated$
    * @apiGroup $entityGroupPascalCase$
    *
    * @apiVersion 1.0.0
    * @apiDescription Get $entityLowerCaseSpaceSeparated$
    * @apiName $entityLowerCaseSpaceSeparated$ get
    *
    */

    Route.get('/get/:id', '$entityGroupPascalCase$/$entityPascalCase$Controller.get').middleware([
        'serviceCreator:$entityGroupPascalCase$/$entityPascalCase$/Read'
    ])


    /*---SECTION--*/

    /**
    * ~apiGVersion v1
    * ~apiVisibility
    * ~apiType private
    * ~actionGroup $entityGroupCamelCase$
    *
    * @api {post} /v1/$apiNameWithoutSuffix$/$entityCamelCase$/create Create new $entityLowerCaseSpaceSeparated$
    * @apiGroup $entityGroupPascalCase$
    *
    * @apiVersion 1.0.0
    * @apiDescription Create new $entityLowerCaseSpaceSeparated$
    * @apiName $entityLowerCaseSpaceSeparated$ create
    *
    */

    Route.post('/create', '$entityGroupPascalCase$/$entityPascalCase$Controller.create').middleware([
        'serviceCreator:$entityGroupPascalCase$/$entityPascalCase$/Unscoped'
    ])


    /*---SECTION--*/

    /**
    * ~apiGVersion v1
    * ~apiVisibility
    * ~apiType private
    * ~actionGroup $entityGroupCamelCase$
    *
    * @api {patch} /v1/$apiNameWithoutSuffix$/$entityCamelCase$/update/:id Update instance of $entityLowerCaseSpaceSeparated$
    * @apiGroup $entityGroupPascalCase$
    *
    * @apiVersion 1.0.0
    * @apiDescription Update an instance of $entityLowerCaseSpaceSeparated$
    * @apiName $entityLowerCaseSpaceSeparated$ update
    *
    */

    Route.patch('/update/:id', '$entityGroupPascalCase$/$entityPascalCase$Controller.update').middleware([
        'serviceCreator:$entityGroupPascalCase$/$entityPascalCase$/Scoped'
    ])

    /*---SECTION--*/

    /**
    * ~apiGVersion v1
    * ~apiVisibility
    * ~apiType private
    * ~actionGroup $entityGroupCamelCase$
    *
    * @api {delete} /v1/$apiNameWithoutSuffix$/$entityCamelCase$/archive/:id Archive instance of $entityLowerCaseSpaceSeparated$
    * @apiGroup $entityGroupPascalCase$
    *
    * @apiVersion 1.0.0
    * @apiDescription Archive an instance of $entityLowerCaseSpaceSeparated$
    * @apiName $entityLowerCaseSpaceSeparated$ archive
    *
    */

    Route.delete('/archive/:id', '$entityGroupPascalCase$/$entityPascalCase$Controller.archive').middleware([
        'serviceCreator:$entityGroupPascalCase$/$entityPascalCase$/Scoped'
    ])

    /*---SECTION--*/

    /**
     * ~apiGVersion v1
     * ~apiVisibility
     * ~apiType private
     * ~actionGroup $entityGroupCamelCase$
     *
     * @api {patch} /v1/$apiNameWithoutSuffix$/$entityCamelCase$/restore/:id Restore instance of $entityLowerCaseSpaceSeparated$
     * @apiGroup $entityGroupPascalCase$
     *
     * @apiVersion 1.0.0
     * @apiDescription Restore an instance of $entityLowerCaseSpaceSeparated$
     * @apiName $entityLowerCaseSpaceSeparated$ restore
     *
     */

    Route.patch('/restore/:id', '$entityGroupPascalCase$/$entityPascalCase$Controller.restore').middleware([
        'serviceCreator:$entityGroupPascalCase$/$entityPascalCase$/Scoped'
    ])

    /*---SECTION--*/

    /**
     * ~apiGVersion v1
     * ~apiVisibility
     * ~apiType private
     * ~actionGroup $entityGroupCamelCase$
     *
     * @api {delete} /v1/$apiNameWithoutSuffix$/$entityCamelCase$/delete/:id Delete instance of $entityLowerCaseSpaceSeparated$
     * @apiGroup $entityGroupPascalCase$
     *
     * @apiVersion 1.0.0
     * @apiDescription Delete an instance of $entityLowerCaseSpaceSeparated$
     * @apiName $entityLowerCaseSpaceSeparated$ delete
     *
     */

    Route.delete('/delete/:id', '$entityGroupPascalCase$/$entityPascalCase$Controller.delete').middleware([
        'serviceCreator:$entityGroupPascalCase$/$entityPascalCase$/Scoped'
    ])

})
