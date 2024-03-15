const BaseScopedService = use('App/Services/BaseScopedService')

class AmortisationLogAssetScopedService extends BaseScopedService {

    constructor(ctx) {
        super(ctx, 'App/Models/Accounting/AmortisationLogAsset')
    }

    get Repository() {
        return 'App/Repositories/Accounting/AmortisationLogAsset'
    }

    async getScope(instanceId) {
        this.instance = await this.getLoadedInstanceOrFail(instanceId)
    }

}

module.exports = AmortisationLogAssetScopedService
