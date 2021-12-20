import express, { Application, Request, Response } from "express";
import ItunesController from "./controllers/itunes.controller";

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
	"/",
	async (req: Request, res: Response): Promise<Response> => {
		return res.status(200).send({
			message: "Hello World!",
		});
	}
);

app.get(
	"/itunes", new ItunesController().getSearchResults
);

try {
	app.listen(port, (): void => {
		console.log(`Connected successfully on port s ${port}`);
	});
} catch (error) {
	// @ts-ignore
	console.error(`Error occured: ${error.message}`);
}
