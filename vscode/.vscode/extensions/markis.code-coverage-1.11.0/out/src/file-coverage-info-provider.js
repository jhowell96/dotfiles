"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileCoverageInfoProvider = void 0;
const vscode_1 = require("vscode");
const extension_configuration_1 = require("./extension-configuration");
const os = __importStar(require("node:os"));
const isWindows = () => os.type() === "Windows_NT";
const FILE_DECORATION_BADGE = "<%";
const FILE_DECORATION_TOOLTIP_PRELUDE = "Insufficent Code Coverage:";
class FileCoverageInfoProvider extends vscode_1.Disposable {
    constructor(configuration, coverageByFile) {
        // use dummy function for callOnDispose since dispose() will be overrided
        super(() => true);
        this.configuration = configuration;
        this.coverageByFile = coverageByFile;
        this._onDidChangeFileDecorations = new vscode_1.EventEmitter();
        this._isDisposed = false;
        this._showFileDecorations = true;
        this._coverageThreshold = 0;
        this._coverageByFile = coverageByFile;
        this._coverageThreshold = configuration.coverageThreshold;
        // Watch for updates to coverage threshold and regenerate when its updated
        this._listener = configuration.onConfigOptionUpdated((e) => {
            if (e &&
                e === extension_configuration_1.CONFIG_OPTION_COVERAGE_THRESHOLD &&
                configuration.coverageThreshold !== this._coverageThreshold) {
                this._coverageThreshold = configuration.coverageThreshold;
                this.changeFileDecorations(Array.from(this._coverageByFile.keys()));
            }
        });
    }
    dispose() {
        if (!this._isDisposed) {
            this._onDidChangeFileDecorations.dispose();
            this._listener.dispose();
            this._isDisposed = true;
        }
    }
    // Toggle display of the decorations in Explore View
    get showFileDecorations() {
        this._checkDisposed();
        return this._showFileDecorations;
    }
    set showFileDecorations(value) {
        this._checkDisposed();
        this._showFileDecorations = value;
    }
    // The event that window.registerFileDecorationProvider() subscribes to
    get onDidChangeFileDecorations() {
        this._checkDisposed();
        return this._onDidChangeFileDecorations.event;
    }
    // Either decorates or undecorates a file within the Explore View
    provideFileDecoration(uri, _token) {
        this._checkDisposed();
        if (!this.showFileDecorations) {
            return;
        }
        let path = uri.fsPath;
        // Uri.file() might lowercase the drive letter on some machines which might not match coverageByFile's keys
        // Encountered this issue on a Windows 11 machine but not my main Windows 10 system...
        if (!this._coverageByFile.has(path) && isWindows()) {
            path = path.charAt(0).toUpperCase().concat(path.substring(1));
        }
        const coverage = this._coverageByFile.get(path);
        if (coverage === undefined) {
            return;
        }
        const { lines } = coverage;
        const percentCovered = Math.floor((lines.hit / lines.found) * 100);
        if (percentCovered < this._coverageThreshold) {
            return new vscode_1.FileDecoration(FILE_DECORATION_BADGE, `${FILE_DECORATION_TOOLTIP_PRELUDE} ${percentCovered}% vs. ${this._coverageThreshold}%.`, new vscode_1.ThemeColor("markiscodecoverage.insufficientCoverageForeground"));
        }
        return;
    }
    // Fire the onDidChangeFileDecorations event for the specified file(s)
    changeFileDecorations(fsPaths) {
        this._checkDisposed();
        if (typeof fsPaths === "string") {
            this._onDidChangeFileDecorations.fire([vscode_1.Uri.file(fsPaths)]);
        }
        this._onDidChangeFileDecorations.fire(fsPaths.map((p) => vscode_1.Uri.file(p)));
    }
    _checkDisposed() {
        if (this._isDisposed) {
            throw new Error("illegal state - object is disposed");
        }
    }
}
exports.FileCoverageInfoProvider = FileCoverageInfoProvider;
//# sourceMappingURL=file-coverage-info-provider.js.map