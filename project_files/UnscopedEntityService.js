const BaseService = use('App/Services/BaseService')
const $entityPascalCase$ = use('App/Models/$entityGroupPascalCase$/$entityPascalCase$')

class $entityPascalCase$UnscopedService extends BaseService {

    constructor(ctx) {
        super(ctx, 'App/Models/$entityGroupPascalCase$/$entityPascalCase$')
    }

    get Repository() {
        return 'App/Repositories/$entityGroupPascalCase$/$entityPascalCase$'
    }

    async create(userParams) {

        const instance = await this.repository.create(userParams, {
            created_by_id: this.user.id,
            apiKey: this.apiKey
        })
        return instance
    }
}
module.exports = $entityPascalCase$UnscopedService
