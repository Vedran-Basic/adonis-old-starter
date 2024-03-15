const BaseScopedService = use('App/Services/BaseScopedService')

class $entityPascalCase$ScopedService extends BaseScopedService {

    constructor(ctx) {
        super(ctx, 'App/Models/$entityGroupPascalCase$/$entityPascalCase$')
    }

    get Repository() {
        return 'App/Repositories/$entityGroupPascalCase$/$entityPascalCase$'
    }

    async getScope(instanceId) {
        this.instance = await this.getLoadedInstanceOrFail(instanceId)
    }

}

module.exports = $entityPascalCase$ScopedService
