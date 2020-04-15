import { ExternalView } from "../external";

export default class WikiExternalView extends ExternalView {
    constructor(app, name) {
        super(app, name);

    }

    urlChange(view, url) {
        const params = url[0].params;
        if (Object.keys(params).length !== 1) {
            return;
        }

        this.targetUrl = `/wiki/${params.name}`;
        
        this.init(view);
    }
}
