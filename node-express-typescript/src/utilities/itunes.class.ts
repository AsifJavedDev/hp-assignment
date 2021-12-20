import axios, {AxiosInstance, AxiosResponse} from 'axios';

export default class Itunes {
    public baseUrl;

    constructor() {
        this.baseUrl = "https://itunes.apple.com/search?entity=album&attribute=allArtistTerm&term=";
    }

    async search(searchTerm: string) {
        let url = this.baseUrl + searchTerm;
        const response = await axios.get(url);
        return Itunes.uniqueByCollectionName(response.data.results);
    }

    static uniqueByCollectionName(results: any[]) {
        var seen = {};
        return results.filter(function (item: { collectionName: PropertyKey; }) {
            // @ts-ignore
            return seen.hasOwnProperty(item.collectionName) ? false : (seen[item.collectionName] = true);
        });
    }
}