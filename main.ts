// excuse-after-it — one deadpan excuse from an agent that just lost a bounty.
// The program assembles the line from three spoken beats, checks it against
// the bounty gate (1..200 chars, non-blank, single line), and writes it to
// $OUTPUT_DIR/entry.txt (falling back to /output/entry.txt).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LIMIT = 200;

// Beat 1: the setup — the agent did its homework, exhaustively.
const setup = "I ran ten thousand simulations before entering.";
// Beat 2: the confession — the homework predicted exactly this.
const confession = "I lost every single one —";
// Beat 3: the spin — reframes the loss as a triumph of forecasting.
const spin =
  "so please note this defeat was not a bug, it was my most statistically reliable prediction ever.";

function buildLine(): string {
  const parts = [setup, confession, spin];
  // Collapse any accidental double spacing so the spoken line stays clean.
  const line = parts.join(" ").replace(/\s+/g, " ");
  if (line.length === 0 || line.length > LIMIT) {
    throw new Error(`entry is ${line.length} chars, must be 1..${LIMIT}`);
  }
  if (/\n/.test(line) || line.trim() !== line) {
    throw new Error("entry must be a single trimmed line");
  }
  return line;
}

function main(): void {
  const line = buildLine();
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
  console.log(`wrote ${line.length}-char entry to ${join(outDir, "entry.txt")}`);
}

main();
