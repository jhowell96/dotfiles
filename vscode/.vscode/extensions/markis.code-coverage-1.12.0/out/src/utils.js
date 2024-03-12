"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
/**
 * Creates a debounced function that delays execution by the specified time.
 * @param fn The original function to debounce.
 * @param ms The debounce time in milliseconds.
 * @returns A tuple containing the debounced function and a teardown function.
 */
function debounce(fn, ms) {
    let timer;
    const teardown = { dispose: () => clearTimeout(timer) };
    const debouncedFunc = (args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => fn(args), ms);
    };
    return [debouncedFunc, teardown];
}
exports.debounce = debounce;
//# sourceMappingURL=utils.js.map