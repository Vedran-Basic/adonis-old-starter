const BaseScopedService = use('App/Services/BaseScopedService')

class ReadAmortisationLogAssetService extends BaseScopedService {
    
    constructor(ctx) {
        super(ctx, 'App/Models/Accounting/AmortisationLogAsset')
    }
    
    get Repository() {
        return 'App/Repositories/Accounting/AmortisationLogAsset'
    }
    
}

module.exports = ReadAmortisationLogAssetService
