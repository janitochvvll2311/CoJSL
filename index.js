import { useLayouts, useTemplateLayouts } from "./lib/layout.js";
import { useViews } from "./lib/view.js";

await useTemplateLayouts();
await useLayouts();
let views = useViews();
console.log(views);
