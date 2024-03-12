"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = exports.deactivate = exports.onCommand = void 0;
const path_1 = require("path");
const vscode_1 = require("vscode");
const extension_configuration_1 = require("./extension-configuration");
const parse_lcov_1 = require("./parse-lcov");
const coverage_decorations_1 = require("./coverage-decorations");
const file_coverage_info_provider_1 = require("./file-coverage-info-provider");
const utils_1 = require("./utils");
exports.onCommand = noop;
function deactivate() {
    return __awaiter(this, void 0, void 0, function* () {
        exports.onCommand = noop;
    });
}
exports.deactivate = deactivate;
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const packageInfo = require((0, path_1.join)(context.extensionPath, "package.json"));
        const diagnostics = vscode_1.languages.createDiagnosticCollection("coverage");
        const statusBar = vscode_1.window.createStatusBarItem();
        const hideCommand = vscode_1.commands.registerCommand(`${packageInfo.name}.hide`, onHideCoverage);
        const showCommand = vscode_1.commands.registerCommand(`${packageInfo.name}.show`, onShowCoverage);
        const coverageByFile = new Map();
        const extensionConfiguration = new extension_configuration_1.ExtensionConfiguration(vscode_1.workspace.getConfiguration(extension_configuration_1.CONFIG_SECTION_NAME));
        const workspaceFolders = vscode_1.workspace.workspaceFolders;
        const coverageDecorations = new coverage_decorations_1.CoverageDecorations(extensionConfiguration, coverageByFile);
        // Register watchers and listen if the coverage file directory has changed
        registerWatchers();
        extensionConfiguration.onConfigOptionUpdated((e) => {
            if (e && e === extension_configuration_1.CONFIG_OPTION_SEARCH_CRITERIA) {
                registerWatchers();
            }
        });
        // Create and Register the file decoration provider
        const fileCoverageInfoProvider = new file_coverage_info_provider_1.FileCoverageInfoProvider(extensionConfiguration, coverageByFile);
        const fileCoverageInfoProviderRegistration = vscode_1.window.registerFileDecorationProvider(fileCoverageInfoProvider);
        // Debounce the showStatusAndDecorations function to prevent it from running too often
        const [showStatusAndDecorations, showStatusAndDecorationsTeardown] = (0, utils_1.debounce)(_showStatusAndDecorations, 10);
        context.subscriptions.push(extensionConfiguration, diagnostics, coverageDecorations, statusBar, showCommand, hideCommand, fileCoverageInfoProviderRegistration, fileCoverageInfoProvider, showStatusAndDecorationsTeardown);
        // Update status bar on changes to any open file
        vscode_1.workspace.onDidChangeTextDocument((e) => {
            if (e) {
                diagnostics.delete(e.document.uri);
                coverageDecorations.removeDecorationsForFile(e.document.uri);
                showStatusAndDecorations();
            }
        });
        vscode_1.workspace.onDidOpenTextDocument(() => {
            showStatusAndDecorations();
        });
        vscode_1.workspace.onDidCloseTextDocument(() => {
            showStatusAndDecorations();
        });
        vscode_1.workspace.onDidChangeConfiguration((e) => {
            if (e) {
                extensionConfiguration.dispatchConfigUpdate(e, vscode_1.workspace.getConfiguration(extension_configuration_1.CONFIG_SECTION_NAME));
            }
        });
        vscode_1.window.onDidChangeActiveTextEditor(() => {
            coverageDecorations.onFileChange();
            showStatusAndDecorations();
        });
        // Run the main routine at activation time as well
        yield findDiagnosticsInWorkspace();
        fileCoverageInfoProvider.updateFileDecorations();
        // Register watchers for file changes on coverage files to re-run the coverage parser
        function registerWatchers() {
            if (workspaceFolders) {
                for (const folder of workspaceFolders) {
                    const pattern = new vscode_1.RelativePattern(folder.uri.fsPath, extensionConfiguration.searchCriteria);
                    const watcher = vscode_1.workspace.createFileSystemWatcher(pattern);
                    watcher.onDidChange(() => findDiagnostics(folder));
                    watcher.onDidCreate(() => findDiagnostics(folder));
                    watcher.onDidDelete(() => findDiagnostics(folder));
                }
            }
        }
        function onCommand(cmd) {
            return __awaiter(this, void 0, void 0, function* () {
                switch (cmd) {
                    case `${packageInfo.name}.hide`:
                        return onHideCoverage();
                    case `${packageInfo.name}.show`:
                        return onShowCoverage();
                }
            });
        }
        function onHideCoverage() {
            return __awaiter(this, void 0, void 0, function* () {
                extensionConfiguration.showCoverage = false;
                fileCoverageInfoProvider.hideCoverage();
                diagnostics.clear();
                coverageDecorations.clearAllDecorations();
            });
        }
        function onShowCoverage() {
            return __awaiter(this, void 0, void 0, function* () {
                extensionConfiguration.showCoverage = true;
                fileCoverageInfoProvider.showCoverage();
                yield findDiagnosticsInWorkspace();
                coverageDecorations.displayCoverageDecorations();
            });
        }
        function findDiagnosticsInWorkspace() {
            return __awaiter(this, void 0, void 0, function* () {
                if (workspaceFolders) {
                    yield Promise.all(workspaceFolders.map(findDiagnostics));
                }
            });
        }
        // Finds VSCode diagnostics to display based on a coverage file specified by the search pattern in each workspace folder
        function findDiagnostics(workspaceFolder) {
            return __awaiter(this, void 0, void 0, function* () {
                const searchPattern = new vscode_1.RelativePattern(workspaceFolder, extensionConfiguration.searchCriteria);
                const files = yield vscode_1.workspace.findFiles(searchPattern);
                for (const file of files) {
                    const coverages = yield (0, parse_lcov_1.parse)(file.fsPath);
                    recordFileCoverage(coverages, workspaceFolder.uri.fsPath);
                    convertDiagnostics(coverages, workspaceFolder.uri.fsPath);
                }
                showStatusAndDecorations();
            });
        }
        // Show the coverage in the VSCode status bar at the bottom
        function _showStatusAndDecorations() {
            const activeTextEditor = vscode_1.window.activeTextEditor;
            if (!activeTextEditor) {
                statusBar.hide();
                return;
            }
            const file = activeTextEditor.document.uri.fsPath;
            const coverage = coverageByFile.get(file);
            if (coverage) {
                const { lines } = coverage;
                statusBar.text = `Coverage: ${lines.hit}/${lines.found} lines`;
                statusBar.show();
                coverageDecorations.displayCoverageDecorations(coverage);
            }
            else {
                statusBar.hide();
            }
        }
        // Record the coverage information for each file
        function recordFileCoverage(coverages, workspaceFolder) {
            for (const coverage of coverages) {
                const fileName = !(0, path_1.isAbsolute)(coverage.file)
                    ? (0, path_1.join)(workspaceFolder, coverage.file)
                    : coverage.file;
                coverageByFile.set(fileName, coverage);
            }
        }
        // Takes parsed coverage information and turns it into diagnostics
        function convertDiagnostics(coverages, workspaceFolder) {
            if (!extensionConfiguration.showCoverage)
                return; // do nothing
            for (const coverage of coverages) {
                if (coverage && coverage.lines && coverage.lines.details) {
                    const fileName = !(0, path_1.isAbsolute)(coverage.file)
                        ? (0, path_1.join)(workspaceFolder, coverage.file)
                        : coverage.file;
                    const diagnosticsForFiles = convertLinesToDiagnostics(coverage.lines.details, fileName);
                    if (diagnosticsForFiles.length > 0) {
                        const file = vscode_1.Uri.file(fileName);
                        diagnostics.set(file, diagnosticsForFiles);
                        const coverage = coverageByFile.get(fileName);
                        if (coverage) {
                            coverageDecorations.addDecorationsForFile(fileName, coverage);
                        }
                    }
                    else {
                        const file = vscode_1.Uri.file(fileName);
                        diagnostics.delete(file);
                        coverageDecorations.removeDecorationsForFile(file);
                    }
                }
            }
        }
        function convertLinesToDiagnostics(details, fileName) {
            var _a;
            const doc = (_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document;
            const currentFile = doc === null || doc === void 0 ? void 0 : doc.uri.fsPath;
            const diagnosticsForFiles = [];
            for (const detail of details) {
                const line = detail.line - 1;
                if (detail.hit === 0) {
                    const range = (currentFile === fileName && (doc === null || doc === void 0 ? void 0 : doc.lineAt(line).range)) ||
                        new vscode_1.Range(new vscode_1.Position(line, 0), new vscode_1.Position(line, 1000));
                    diagnosticsForFiles.push(new vscode_1.Diagnostic(range, `[${packageInfo.name}] line not covered`, vscode_1.DiagnosticSeverity.Information));
                }
            }
            return diagnosticsForFiles;
        }
        // exports - accessible to tests
        return {
            coverageByFile,
            onCommand,
            statusBar,
            coverageDecorations,
            fileCoverageInfoProvider,
            extensionConfiguration,
        };
    });
}
exports.activate = activate;
function noop() {
    return __awaiter(this, void 0, void 0, function* () { });
}
//# sourceMappingURL=extension.js.map