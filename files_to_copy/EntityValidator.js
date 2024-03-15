const BaseValidator = use('App/Validators/Base')

class AmortisationLogAssetValidator extends BaseValidator {
    get model() {
        return 'App/Models/Accounting/AmortisationLogAsset'
    }
}

module.exports = AmortisationLogAssetValidator
