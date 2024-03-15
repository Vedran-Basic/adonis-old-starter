const BaseService = use('App/Services/BaseService')
const AmortisationLogAsset = use('App/Models/Accounting/AmortisationLogAsset')

class AmortisationLogAssetUnscopedService extends BaseService {

    constructor(ctx) {
        super(ctx, 'App/Models/Accounting/AmortisationLogAsset')
    }

    get Repository() {
        return 'App/Repositories/Accounting/AmortisationLogAsset'
    }

    async create(userParams) {

        const instance = await this.repository.create(userParams, {
            created_by_id: this.user.id,
            apiKey: this.apiKey
        })
        return instance
    }
}
module.exports = AmortisationLogAssetUnscopedService
