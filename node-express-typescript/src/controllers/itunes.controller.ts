import {Request, Response} from "express";
import Itunes from "../utilities/itunes.class";

export default class ItunesController {


    async getSearchResults(req: Request, res: Response) {
        let searchTerm = req.params.searchTerm;
        const itunes = new Itunes();
        const response =  await itunes.search(searchTerm);
        res.send(response);


    }
}

module.exports = ItunesController;