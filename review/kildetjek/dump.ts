import { INDHOLD } from "/home/user/Cortex/indhold/index";
import { writeFileSync } from "fs";
const out: any = {};
for (const [id, r] of Object.entries(INDHOLD)) if (r) out[id] = r;
writeFileSync(process.argv[2], JSON.stringify(out, null, 1));
