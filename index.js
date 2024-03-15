const fs = require('fs-extra');
const path = require('path');
const {glob} = require("glob");


(async function () {

    let params = require('minimist')(process.argv.slice(2));
    console.log(params);
    let config = require(params.configPath);
    if (!params.configPath) {
        console.error('Missing configPath param!');
        return;
    }
    _checkConfig(config);
    //TODO: make config to be able to just create reference to main model (so no additional routes for)
    //TODO: make config to be able to just create assignees model (referenced to a user and specific entity) - manage, add and remove routes
    //TODO: inside all repositories add saveOneToMany and other methods instead of changing the api base repo!

    let adonisApiPath = `${config.mainGaussBoxPath}/erp/${config.apiName}`;
    if (!fs.pathExistsSync(adonisApiPath)) {
        console.error(`Invalid api name! Check if ${adonisApiPath} path exists!`);
        return;
    }
    await _makeCopyDir();
    await _replaceTextInFiles(config.replacementParams);
    let paths = await _makeAdonisApiPaths(config);
    await _moveFilesToAdonisApi(config, paths); // TODO: add checks for if file exists and print out which ones already exist!
    // TODO: ensure helpers that are used in generated CRUD files are inside api repo
    // for now OneToManyUpdate was missing in repo

    return;
})();


function _checkConfig(config) {
    if (!config.mainGaussBoxPath?.length) {
        console.error('Missing mainGaussBoxPath param inside config file!');
        return;
    }
    if (!config.apiName?.length) {
        console.error('Missing apiName param inside config file!');
        return;
    }

    let configReplaceValues = config.replacementParams;
    let requiredValues = ['$entityGroupPascalCase$', '$entityPascalCase$', '$apiNameWithSuffix$']
    for (let value of requiredValues) {
        if (!configReplaceValues[value]) {
            console.error(`Missing required replacement param '${value}'`);
            process.exit();
        }
    }
}


async function _makeCopyDir() {
    try {
        await fs.copy(path.join(__dirname, 'project_files'), (__dirname, 'files_to_copy'))
    } catch (e) {
        console.log(e)
        process.exit()
    }
}

async function _replaceTextInFiles(replacementPayload) {
    const {glob} = require('glob');
    const replace = require('replace-in-file');

    let formattedReplacementPayload = [];
    try {
        let from = [];
        let to = [];

        for (let [key, value] of Object.entries(replacementPayload)) {
            key = key.replaceAll('$', '\\$');
            from.push(new RegExp(`${key}`, 'g'));
            to.push(value);
        }

        //TEST END
        let result = await replace({files: path.join(__dirname, 'files_to_copy', '*'), from, to});
        console.log(result);
    } catch (e) {
        console.error(e);
        process.exit();
    }
}

async function _makeAdonisApiPaths(config) {
    let apiPath = config.mainGaussBoxPath + '/erp/' + config.apiName;

    let controllerPath = path.join(apiPath, 'app', 'Controllers', 'Http', config.replacementParams.$entityGroupPascalCase$);
    let repoPath = path.join(apiPath, 'app', 'Repositories', config.replacementParams.$entityGroupPascalCase$);
    let routesPath = path.join(apiPath, 'app', 'Routes', config.replacementParams.$entityGroupPascalCase$);
    let servicesPath = path.join(apiPath, 'app', 'Services', config.replacementParams.$entityGroupPascalCase$, config.replacementParams.$entityPascalCase$);
    let validatorPath = path.join(apiPath, 'app', 'Validators', config.replacementParams.$entityGroupPascalCase$);
    let modelPath = path.join(apiPath, 'app', 'Models', config.replacementParams.$entityGroupPascalCase$);

    let modelAttributesPath = path.join(apiPath, 'app', 'Models', config.replacementParams.$entityGroupPascalCase$, 'Attributes');
    let modelCustomListSelectsPath = path.join(apiPath, 'app', 'Models', config.replacementParams.$entityGroupPascalCase$, 'CustomListSelects');

    await Promise.all([
        fs.ensureDir(controllerPath),
        fs.ensureDir(repoPath),
        fs.ensureDir(routesPath),
        fs.ensureDir(servicesPath),
        fs.ensureDir(validatorPath),
        fs.ensureDir(modelPath)
    ]);

    await Promise.all([
        fs.ensureDir(modelAttributesPath),
        fs.ensureDir(modelCustomListSelectsPath),
    ]);
    return {
        controllerPath,
        repoPath,
        routesPath,
        servicesPath,
        validatorPath,
        modelPath,
        modelAttributesPath,
        modelCustomListSelectsPath
    };
}


async function _moveFilesToAdonisApi(config, paths) {
    const {
        controllerPath,
        repoPath,
        routesPath,
        servicesPath,
        validatorPath,
        modelPath,
        modelAttributesPath,
        modelCustomListSelectsPath
    } = paths;
    const replacementParams = config.replacementParams

    await Promise.all([
        fs.copy(path.join(__dirname, 'files_to_copy', 'EntityController.js'), path.join(controllerPath, `${replacementParams.$entityPascalCase$}Controller.js`)),
        fs.copy(path.join(__dirname, 'files_to_copy', 'EntityRepository.js'), path.join(repoPath, `${replacementParams.$entityPascalCase$}.js`)),
        fs.copy(path.join(__dirname, 'files_to_copy', 'EntityRoutes.js'), path.join(routesPath, `${replacementParams.$entityPascalCase$}.js`)),
        fs.copy(path.join(__dirname, 'files_to_copy', 'ReadEntityService.js'), path.join(servicesPath, `Read.js`)),
        fs.copy(path.join(__dirname, 'files_to_copy', 'ScopedEntityService.js'), path.join(servicesPath, `Scoped.js`)),
        fs.copy(path.join(__dirname, 'files_to_copy', 'UnscopedEntityService.js'), path.join(servicesPath, `Unscoped.js`)),
        fs.copy(path.join(__dirname, 'files_to_copy', 'EntityValidator.js'), path.join(validatorPath, `${replacementParams.$entityPascalCase$}.js`)),
        fs.copy(path.join(__dirname, 'files_to_copy', 'EntityModel.js'), path.join(modelPath, `${replacementParams.$entityPascalCase$}.js`)),
        fs.copy(path.join(__dirname, 'files_to_copy', 'EntityModelAttributes.js'), path.join(modelAttributesPath, `${replacementParams.$entityPascalCase$}.js`)),
        fs.copy(path.join(__dirname, 'files_to_copy', 'EntityModelCustomListSelects.js'), path.join(modelCustomListSelectsPath, `${replacementParams.$entityPascalCase$}.js`)),
    ])
    return;
}
