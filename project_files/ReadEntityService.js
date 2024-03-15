const BaseScopedService = use('App/Services/BaseScopedService')

class Read$entityPascalCase$Service extends BaseScopedService {
    
    constructor(ctx) {
        super(ctx, 'App/Models/$entityGroupPascalCase$/$entityPascalCase$')
    }
    
    get Repository() {
        return 'App/Repositories/$entityGroupPascalCase$/$entityPascalCase$'
    }
    
}

module.exports = Read$entityPascalCase$Service
