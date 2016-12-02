export interface FrontPageState {
    regName?: string;
    regEmail?: string;
    regPassword?: string;
    regConfirmation?: string;
    loginEmail?: string;
    loginPassword?: string;
    showServerOpts?: boolean;
    serverURL?: string;
    serverPort?: string;
    forgotPassword?: boolean;
}

export interface FrontPageProps { };