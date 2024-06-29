const baseEndpoint = '/collections'

const collectionEndpoints = {
    get: baseEndpoint,
    delete: baseEndpoint,
    merge: baseEndpoint + '/merge',
    update: baseEndpoint + '/',
    addTags: baseEndpoint + '/addTags',
    deleteTags: baseEndpoint + '/deleteTags',
    create: baseEndpoint,
    show: baseEndpoint + '/',
    edit: baseEndpoint + '/',
    getContacts: baseEndpoint + '/',
};

export default collectionEndpoints;
