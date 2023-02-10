"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const application_module_1 = require("./application.module");
const common_1 = require("@nestjs/common");
const start = async () => {
    const PORT = process.env.PORT || 7000;
    const app = await core_1.NestFactory.create(application_module_1.ApplicationModule, { cors: true });
    app.useGlobalPipes(new common_1.ValidationPipe({
        forbidUnknownValues: false,
    }));
    await app.listen(5000, () => console.log("Server started on port " + PORT));
};
start();
//# sourceMappingURL=main.js.map