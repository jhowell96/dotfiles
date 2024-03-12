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
        const coverageDecorations = new coverage_decorations_1.CoverageDecorations();
        const statusBar = vscode_1.window.createStatusBarItem();
        const hideCommand = vscode_1.commands.registerCommand(`${packageInfo.name}.hide`, onHideCoverage);
        const showCommand = vscode_1.commands.registerCommand(`${packageInfo.name}.show`, onShowCoverage);
        const coverageByFile = new Map();
        const extensionConfiguration = new extension_configuration_1.ExtensionConfiguration(vscode_1.workspace.getConfiguration(extension_configuration_1.CONFIG_SECTION_NAME));
        const workspaceFolders = vscode_1.workspace.workspaceFolders;
        // When a workspace is first opened and already has an open document, the setDecoration method has to be called twice.
        // If it is isn't, the user will have to tab between documents before the decorations will render.
        let setDecorationsCounter = 0;
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
        context.subscriptions.push(extensionConfiguration, diagnostics, coverageDecorations, statusBar, showCommand, hideCommand, fileCoverageInfoProviderRegistration, fileCoverageInfoProvider);
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
            setDecorationsCounter = 0;
            showStatusAndDecorations();
        });
        // Run the main routine at activation time as well
        yield findDiagnosticsInWorkspace();
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
        exports.onCommand = function onCommand(cmd) {
            return __awaiter(this, void 0, void 0, function* () {
                switch (cmd) {
                    case `${packageInfo.name}.hide`:
                        return onHideCoverage();
                    case `${packageInfo.name}.show`:
                        return onShowCoverage();
                }
            });
        };
        function onHideCoverage() {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                extensionConfiguration.showCoverage = false;
                fileCoverageInfoProvider.showFileDecorations = false;
                fileCoverageInfoProvider.changeFileDecorations(Array.from(coverageByFile.keys()));
                diagnostics.clear();
                coverageDecorations.clearAllDecorations();
                // Disable rendering of decorations in editor view
                (_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.setDecorations(coverageDecorations.decorationType, []);
            });
        }
        function onShowCoverage() {
            return __awaiter(this, void 0, void 0, function* () {
                extensionConfiguration.showCoverage = true;
                fileCoverageInfoProvider.showFileDecorations = true;
                yield findDiagnosticsInWorkspace();
                // This ensures the decorations will show up again when switching back and forth between Show / Hide.
                const activeTextEditor = vscode_1.window.activeTextEditor;
                if (activeTextEditor !== undefined) {
                    const decorations = coverageDecorations.getDecorationsForFile(activeTextEditor.document.uri);
                    if (decorations !== undefined) {
                        const { decorationType, decorationOptions } = decorations;
                        // Render decorations in editor view
                        activeTextEditor.setDecorations(decorationType, decorationOptions);
                    }
                }
            });
        }
        function findDiagnosticsInWorkspace() {
            return __awaiter(this, void 0, void 0, function* () {
                if (workspaceFolders) {
                    yield Promise.all(workspaceFolders.map(findDiagnostics));
                    fileCoverageInfoProvider.changeFileDecorations(Array.from(coverageByFile.keys()));
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
            });
        }
        // Show the coverage in the VSCode status bar at the bottom
        function showStatusAndDecorations() {
            var _a;
            const activeTextEditor = vscode_1.window.activeTextEditor;
            if (!activeTextEditor) {
                statusBar.hide();
                return;
            }
            const file = activeTextEditor.document.uri.fsPath;
            if (coverageByFile.has(file)) {
                const coverage = coverageByFile.get(file);
                if (coverage) {
                    const { lines } = coverage;
                    // Only want to call setDecorations at most 2 times.
                    if (setDecorationsCounter < 2) {
                        let decorations = coverageDecorations.getDecorationsForFile(activeTextEditor.document.uri);
                        // If VSCode launches the workspace with already opened document, this ensures the decorations will appear along with the diagnostics.
                        if (decorations === undefined) {
                            coverageDecorations.addDecorationsForFile(activeTextEditor.document.uri, (_a = diagnostics.get(activeTextEditor.document.uri)) !== null && _a !== void 0 ? _a : []);
                            decorations = coverageDecorations.getDecorationsForFile(activeTextEditor.document.uri);
                        }
                        else {
                            const { decorationType, decorationOptions } = decorations;
                            activeTextEditor.setDecorations(decorationType, decorationOptions);
                            setDecorationsCounter++;
                        }
                    }
                    statusBar.text = `Coverage: ${lines.hit}/${lines.found} lines`;
                    statusBar.show();
                }
            }
            else {
                statusBar.hide();
            }
        }
        function recordFileCoverage(coverages, workspaceFolder) {
            coverageByFile.clear();
            for (const coverage of coverages) {
                const fileName = !(0, path_1.isAbsolute)(coverage.file)
                    ? (0, path_1.join)(workspaceFolder, coverage.file)
                    : coverage.file;
                coverageByFile.set(fileName, coverage);
            }
            showStatusAndDecorations();
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
                        coverageDecorations.addDecorationsForFile(file, diagnosticsForFiles);
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
            onCommand: exports.onCommand,
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