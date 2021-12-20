export default class HttpClass {

    static authUrl = "https://url.to.auth.system.com/invitation";

    static async invitations(reqData) {
        return  await superagent.post( HttpClass.authUrl).send(invitationBody);
    }

}