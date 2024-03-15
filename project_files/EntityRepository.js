const $entityPascalCase$ = use('App/Models/$entityGroupPascalCase$/$entityPascalCase$')
const Base = use('App/Repositories/Base')
const {separateData} = use('App/Helpers/OneToManyUpdate')
const _pick = require('lodash/pick')
const throwError = use('App/Helpers/ThrowError')

class $entityPascalCase$Repository extends Base {
    constructor() {
        super($entityPascalCase$)
        //TODO: check - maybe put parent_column for saveOneToMany method so parent_column can be used for instance.id
    }

    get SubRepositories() {
        return {
            $entityCamelCase$LabelRepository: '$entityGroupPascalCase$/$entityPascalCase$Label',
            $entityCamelCase$StepRepository: '$entityGroupPascalCase$/$entityPascalCase$Step'
        }
    }

    get MainValidator() {
        return 'App/Validators/$entityGroupPascalCase$/$entityPascalCase$'
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

            await this.$entityPascalCase$StepRepository.saveOneToMany(instance, data, {
                created_by_id: instance.created_by_id,
                apiKey: instance.apiKey,
                $entitySnakeCase$_id: instance.id
            })
        }
    }

}

module.exports = $entityPascalCase$Repository
