import { UserController } from './controllers/User.controller';
import express from 'express';
import { WebsiteController } from './controllers/Website.controller';
import { errorHandler } from './middlewares/error.middleware';
import { DocumentationController } from './controllers/Documentation.controller';
import { ToolControler } from './controllers/Tools.controller';

const app = express();
app.use(express.json());
app.post('/auth/login', UserController.login);
app.post('/auth/register', UserController.register);

app.get('/websites/all', WebsiteController.getAllWebsites);
app.get('/websites/public/all', WebsiteController.getPublicAndActiveWebsites);

app.get('/documentation/all', DocumentationController.getAllDocs);
app.get('/documentation/public/all', DocumentationController.getAllActiveAndPublicDocs);

app.get('/tools/all', ToolControler.getAllTools);
app.get('/tools/public/all', ToolControler.getAllActiveAndPublicTools);

app.get('/websites/keywords/all', WebsiteController.getAllKeywords);
app.get('/documentation/keywords/all', DocumentationController.getAllKeywordsFromDocs);
app.use(errorHandler);
export default app;
