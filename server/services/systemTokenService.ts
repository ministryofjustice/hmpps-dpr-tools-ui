import HmppsAuthClient from "../data/hmppsAuthClient";

export default class SystemTokenService {

    constructor(private readonly hmppsAuthClient: HmppsAuthClient) {}

    async getSystemToken(userName: string) : Promise<string> {
        const token = this.hmppsAuthClient.getSystemClientToken(userName)

        return token
    }
}