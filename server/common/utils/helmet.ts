import helmet from 'helmet';

const directives = helmet.contentSecurityPolicy.getDefaultDirectives();
delete directives['upgrade-insecure-requests'];

export const cspWithoutUpgradeInsecureRequests = directives;
