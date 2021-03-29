import { port } from './config/vars';
import app from './config/express';
import { connect as mongooseConnect } from './config/mongoose';

// open mongoose connection
mongooseConnect();

app.listen(port, () => console.log(`listening on http://localhost:${port}`));

module.exports = app;
