import { writeFileSync } from "node:fs";
import { openApiDocument } from "../src/openapi";

writeFileSync("openapi.json", JSON.stringify(openApiDocument, null, 2) + "\n");
console.log("Wrote openapi.json");
