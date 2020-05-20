import { ExternalView } from "../external";

export default class ChatflowView extends ExternalView {
    constructor(app, name) {
        super(app, name);

        this.baseGitUrl = "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/ThreeBotPackages";

    }

    urlChange(view, url) {
        const params = url[0].params;
        if (Object.keys(params).length !== 3) {
            return;
        }

        const packageName = `${params.author}.${params.package}`
        const packageUrl = packageName.replace(".", "/");

        this.targetUrl = `/${packageUrl}/chat/${params.chat}#/?noheader=yes`;
        this.requiredPackages = {}
        this.requiredPackages[packageName] = `${this.baseGitUrl}/${packageUrl}`;

        this.init(view);
    }
}
