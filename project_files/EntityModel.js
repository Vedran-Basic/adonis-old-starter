'use strict'

const Model = use('Model')
const addStandardTraits = use('App/Helpers/AddStandardTraits')

class $entityPascalCase$ extends Model {

    static boot() {
        super.boot()
        addStandardTraits(this)
    }


    static get table() {
        return '$tableName$'
    }

    static get Serializer() {
        return 'App/Models/Serializers/Base'
    }

    static get DataLoad() {
        return {
            withDownstreamData() {
                this.trWith("labels")
                this.trWith("steps",q =>{
                    q.trWith("$createdBy")
                })
                this.trWith("$createdBy", q =>{
                    q.populate({language:false, type:"short", media: true})
                })
            }
        }
    }

    static get _AttributeConfig() {
        return 'App/Models/$entityGroupPascalCase$/Attributes/$entityPascalCase$'
    }

    static get _CustomListSelects() {
        return 'App/Models/$entityGroupPascalCase$/CustomListSelects/$entityPascalCase$'
    }

    $createdBy() {
        return this.hasOne('Gbox/Models/User', 'created_by_id', 'id')
    }

    // // HAS ONE EXAMPLE
    // parentExample() {
    //     return this.hasOne('App/Models/$entityGroupPascalCase$/$entityPascalCase$', 'parent_id', 'id')
    // }


    // label() {
    //     return this.hasOne('App/Models/$entityGroupPascalCase$/$entityPascalCase$Label', 'label_id', 'id')
    // }

    // // HAS MANY EXAMPLE
    // steps() {
    //     return this.hasMany('App/Models/$entityGroupPascalCase$/$entityPascalCase$Step', 'id', '$entitySnakeCase$')
    // }

    // tags() {
    //     return this.hasMany('App/Models/$entityGroupPascalCase$/$entityPascalCase$Tag', 'tag', 'id').pivotTable('$$apiNameWithoutSuffix$_$entityCamelCase$_tags_assigned')
    // }

    // // BELONGS TO EXAMPLE
    // product() {
    //     return this.belongsTo('Gbox/Models/Product', 'product_id', 'id')
    // }


    

}

module.exports = $entityPascalCase$
