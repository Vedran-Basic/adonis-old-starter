'use strict'

const Model = use('Model')
const addStandardTraits = use('App/Helpers/AddStandardTraits')

class AmortisationLogAsset extends Model {

    static boot() {
        super.boot()
        addStandardTraits(this)
    }


    static get table() {
        return 'document_amortisation_log_assets'
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
        return 'App/Models/Accounting/Attributes/AmortisationLogAsset'
    }

    static get _CustomListSelects() {
        return 'App/Models/Accounting/CustomListSelects/AmortisationLogAsset'
    }

    $createdBy() {
        return this.hasOne('Gbox/Models/User', 'created_by_id', 'id')
    }

    // // HAS ONE EXAMPLE
    // parentExample() {
    //     return this.hasOne('App/Models/Accounting/AmortisationLogAsset', 'parent_id', 'id')
    // }


    // label() {
    //     return this.hasOne('App/Models/Accounting/AmortisationLogAssetLabel', 'label_id', 'id')
    // }

    // // HAS MANY EXAMPLE
    // steps() {
    //     return this.hasMany('App/Models/Accounting/AmortisationLogAssetStep', 'id', 'amortisation_log_asset')
    // }

    // tags() {
    //     return this.hasMany('App/Models/Accounting/AmortisationLogAssetTag', 'tag', 'id').pivotTable('$smartDocument_amortisationLogAsset_tags_assigned')
    // }

    // // BELONGS TO EXAMPLE
    // product() {
    //     return this.belongsTo('Gbox/Models/Product', 'product_id', 'id')
    // }


    

}

module.exports = AmortisationLogAsset
