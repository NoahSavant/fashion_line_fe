const baseEndpoint = "/users";

const userEndpoints = {
    get: baseEndpoint,
    create: baseEndpoint,
    getSingle: baseEndpoint + '/',
    update: baseEndpoint,
    getUserInformation: baseEndpoint + '/',
    getCoworkers: baseEndpoint + '/coworkers',
    invites: baseEndpoint + '/invites',
    delete: baseEndpoint
};

export default userEndpoints;
