// polyfills.ts
import structuredClone from "@ungap/structured-clone";

if (typeof globalThis.structuredClone !== "function") {
  globalThis.structuredClone = structuredClone as typeof globalThis.structuredClone;
}
