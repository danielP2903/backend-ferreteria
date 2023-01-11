/** Convert to array and remove first line (Error label) */
function getLines(error: Error) {
  if (!error.stack) {
    return [];
  }

  return error.stack.split("\n").slice(1);
}

/** Get only method name, remove other information */
function getRealMethodName(line: string): string {
  return line.match(/([^(]+)@|at ([^(]+) \(/)![2];
}

function trimLine(line: string) {
  return line.trim();
}

function removeAsyncLabelFromLine(line: string) {
  return line.replace(/^async /, "");
}

function getAndFormatLine(line: string) {
  const trimmedLine = trimLine(line);
  const realMethodName = getRealMethodName(trimmedLine);

  return removeAsyncLabelFromLine(realMethodName);
}

/** Omit self function name and "processTicksAndRejections"  */
function filterLine(line: string) {
  return (
    line !== "whereCallThisFunctionFrom" && line !== "processTicksAndRejections"
  );
}

export function whereCallThisFunctionFrom() {
  return getLines(new Error()).map(getAndFormatLine).filter(filterLine);
}
