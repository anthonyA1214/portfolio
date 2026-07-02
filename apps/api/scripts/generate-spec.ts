import fs from "node:fs";
import app from "../src";

const res = await app.request("/api/open-api", {}, { ALLOWED_ORIGINS: "http://localhost:3000" });
const spec = await res.json();

fs.writeFileSync("openapi.json", JSON.stringify(spec, null, 2));
