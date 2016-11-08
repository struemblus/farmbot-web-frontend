type ProtocolString = "http:" | "https:";
let current: API | undefined;

/** Store all API endpoints in one place for the sake of DRYness.
 * API.current is probably the instance you want to use.
 */
export class API {
    static setBaseUrl(base: string) {
        current = new API(base);
    }
    /** The base URL can't be known until the user is logged in.
     * API.current will give URLs is the base URL is known and throw an
     * exception otherwise.
     */
    static get current(): API {
        if (current) {
            return current;
        } else {
            console.warn("???")
            throw new Error(`
            Tried to access API before URL was resolved.
            Call API.setBaseUrl() before using API.current .`);
        }
    };

    /** "https:" or "http:". NO "//"! */
    private readonly protocol: ProtocolString;
    /** "localhost", "yahoo.com" */
    private readonly hostname: string;
    /** "80", "443" or "" */
    private readonly port: string;
    /** "/pathname/x/whatever" or "/foo/" */
    private readonly pathname: string;
    /** "?foo=bar" */
    private readonly search: string;
    /** "#hashfragment" */
    private readonly hash: string;
    /** "example.com:3000" */
    private readonly host: string;

    constructor(url: string) {
        var parser = document.createElement("a");
        parser.href = url;
        // Best. Hack. Ever.
        this.protocol = parser.protocol as ProtocolString;
        this.hostname = parser.hostname;
        this.port = parser.port;
        this.pathname = parser.pathname;
        this.search = parser.search;
        this.hash = parser.hash;
        this.host = parser.host;
    }

    /** http://localhost:3000 */
    get baseUrl() { return `${this.protocol}//${this.host}`; };
    /** /api/tokens/ */
    get tokensPath() { return `${this.baseUrl}/api/tokens/`; };
    /** /api/device/ */
    get devicePath() { return `${this.baseUrl}/api/device/`; };
    /** /api/users/ */
    get usersPath() { return `${this.baseUrl}/api/users/`; };
    /** /api/peripherals/ */
    get peripheralsPath() { return `${this.baseUrl}/api/peripherals/`; };
    /** /api/plants/ */
    get plantsPath() { return `${this.baseUrl}/api/plants/`; };
    /** /api/regimens/ */
    get regimensPath() { return `${this.baseUrl}/api/regimens/`; };
    /** /api/sequences/ */
    get sequencesPath() { return `${this.baseUrl}/api/sequences/`; };
}
