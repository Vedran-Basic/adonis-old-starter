const AmortisationLogAsset = use('App/Models/Accounting/AmortisationLogAsset')
const Base = use('App/Repositories/Base')
const {separateData} = use('App/Helpers/OneToManyUpdate')
const _pick = require('lodash/pick')
const throwError = use('App/Helpers/ThrowError')

class AmortisationLogAssetRepository extends Base {
    constructor() {
        super(AmortisationLogAsset)
        //TODO: check - maybe put parent_column for saveOneToMany method so parent_column can be used for instance.id
    }

    get SubRepositories() {
        return {
            amortisationLogAssetLabelRepository: 'Accounting/AmortisationLogAssetLabel',
            amortisationLogAssetStepRepository: 'Accounting/AmortisationLogAssetStep'
        }
    }

    get MainValidator() {
        return 'App/Validators/Accounting/AmortisationLogAsset'
    }

    async getFilteredResponseData(body, listSelects, records) {
        const serialized = await this.serialize(records)
        if (body.list) {
            if(!listSelects || !listSelects.length) return throwError(400, 'nothing is selected. add selects to preferences.')
            let list = this.MainModel.formGBoxList(serialized.data, listSelects)
            return {
                totalPages: Math.ceil(serialized.pagination.total / serialized.pagination.perPage),
                totalRecords: serialized.pagination.total,
                records: list.records
            }
        } else {
            let records = serialized.data
            if (listSelects && listSelects.length) records = records.map(record => _pick(record, listSelects));
            return {
                records,
                totalPages: Math.ceil(serialized.pagination.total / serialized.pagination.perPage),
                totalRecords: serialized.pagination.total
            }
        }
    }

    async afterSave (instance, userParams) {

        if (userParams.hasOwnProperty('steps')) {
            const reqRatings = userParams.steps
            const existingRatings = instance.getRelated('steps')?.rows || []

            let data = separateData(existingRatings, reqRatings)

            await this.AmortisationLogAssetStepRepository.saveOneToMany(instance, data, {
                created_by_id: instance.created_by_id,
                apiKey: instance.apiKey,
                amortisation_log_asset_id: instance.id
            })
        }
    }

}

module.exports = AmortisationLogAssetRepository
