const baseEndpoint = '/variants'

const variantEndpoints = {
    get: baseEndpoint,
    getSingle: baseEndpoint + '/',
    delete: baseEndpoint,
    merge: baseEndpoint + '/merge',
    update: baseEndpoint,
    addTags: baseEndpoint + '/addTags',
    deleteTags: baseEndpoint + '/deleteTags',
    create: baseEndpoint,
    show: baseEndpoint + '/',
    edit: baseEndpoint + '/',
    getContacts: baseEndpoint + '/',
};

export default variantEndpoints;
