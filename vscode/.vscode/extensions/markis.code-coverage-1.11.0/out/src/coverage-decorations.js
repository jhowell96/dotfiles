"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverageDecorations = void 0;
const vscode_1 = require("vscode");
const UNCOVERED_LINE_MESSAGE = "This line is missing code coverage.";
class CoverageDecorations extends vscode_1.Disposable {
    get decorationType() {
        this._checkDisposed();
        // will never be undefined if not disposed
        return this._decorationType;
    }
    constructor() {
        // use dummy function for callOnDispose since dispose() will be overrided
        super(() => true);
        this._isDisposed = false;
        this._decorationType = CoverageDecorations._createDecorationType();
        this._fileCoverageDecorations = new Map();
    }
    dispose() {
        if (!this._isDisposed) {
            this._fileCoverageDecorations.clear();
            this._decorationType = undefined;
            this._isDisposed = true;
        }
    }
    addDecorationsForFile(file, diagnostics) {
        this._checkDisposed();
        this._fileCoverageDecorations.set(file.toString(), this._mapDecorationOptions(diagnostics));
    }
    getDecorationsForFile(file) {
        this._checkDisposed();
        const coverageDecorations = this._fileCoverageDecorations.get(file.toString());
        if (coverageDecorations !== undefined) {
            return {
                decorationType: this._decorationType,
                decorationOptions: coverageDecorations,
            };
        }
        return coverageDecorations;
    }
    removeDecorationsForFile(file) {
        this._checkDisposed();
        this._fileCoverageDecorations.delete(file.toString());
    }
    clearAllDecorations() {
        this._checkDisposed();
        this._fileCoverageDecorations.clear();
    }
    _mapDecorationOptions(diagnostics) {
        const makeDecoration = (start, end) => {
            return {
                hoverMessage: new vscode_1.MarkdownString(UNCOVERED_LINE_MESSAGE),
                range: new vscode_1.Range(start, 1, end, 1),
            };
        };
        // For a single diagnostic or none, create a single decoration or none.
        if (diagnostics.length <= 1) {
            return diagnostics.map((diag) => makeDecoration(diag.range.start.line, diag.range.end.line));
        }
        // Instead of creating a decoration for each diagnostic,
        //// create a decoration for each contiguous set of lines marked with diagnostics.
        let decorations = [];
        let start = diagnostics[0].range.start.line;
        let end = diagnostics[0].range.end.line;
        for (let i = 0; i < diagnostics.length; ++i) {
            if (i === 0) {
                continue;
            }
            // If this a line number constitutes a segment, increase the end line number
            if (diagnostics[i - 1].range.end.line + 1 ===
                diagnostics[i].range.start.line) {
                end = diagnostics[i].range.end.line;
                if (i + 1 < diagnostics.length) {
                    continue;
                }
            }
            // Create decorations covering the found line segment
            decorations.push(makeDecoration(start, end));
            start = diagnostics[i].range.start.line;
            end = diagnostics[i].range.end.line;
            // If the very last diagnostic constitutes a point and is not part of any segment, create a decoration for it.
            if (i + 1 === diagnostics.length &&
                decorations[decorations.length - 1].range.end.line !== start) {
                decorations.push(makeDecoration(start, end));
            }
        }
        return decorations;
    }
    _checkDisposed() {
        if (this._isDisposed) {
            throw new Error("illegal state - object is disposed");
        }
    }
    static _createDecorationType() {
        return vscode_1.window.createTextEditorDecorationType({
            isWholeLine: true,
            overviewRulerLane: vscode_1.OverviewRulerLane.Full,
            overviewRulerColor: { id: "markiscodecoverage.colorUncoveredLineRuler" },
            backgroundColor: { id: "markiscodecoverage.colorUncoveredLineText" },
        });
    }
}
exports.CoverageDecorations = CoverageDecorations;
//# sourceMappingURL=coverage-decorations.js.map