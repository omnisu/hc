import * as v from "valibot";

export const appThemeSchema = v.picklist(["light", "dark", "system"]);

export type AppTheme = v.InferOutput<typeof appThemeSchema>;

export type ResolvedAppTheme = Exclude<AppTheme, "system">;
