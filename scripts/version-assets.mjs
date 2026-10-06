import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

// Refresh cache keys from file contents; no bundler or external dependencies.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const versions = new Map();
const visiting = new Set();
const hash = text => createHash('sha256').update(text).digest('hex').slice(0,12);
function versionFile(relative) {
  if (versions.has(relative)) return versions.get(relative);
  if (visiting.has(relative)) throw new Error(`Circular import: ${relative}`);
  visiting.add(relative);
  const file = path.join(root,relative);
  let text = fs.readFileSync(file,'utf8');
  if (relative.endsWith('.js')) text = text.replace(/from\s+(["'])(\.\/[^"'?]+)(?:\?v=[^"']+)?\1/g, (_,quote,target) => {
    const dependency = path.posix.join(path.posix.dirname(relative),target);
    return `from ${quote}${target}?v=${versionFile(dependency)}${quote}`;
  });
  fs.writeFileSync(file,text);
  const version = hash(text);
  visiting.delete(relative);
  versions.set(relative,version);
  return version;
}
let html = fs.readFileSync(path.join(root,'index.html'),'utf8');
for (const asset of ['assets/css/styles.css','assets/js/app.js']) {
  const version = versionFile(asset);
  html = html.replace(new RegExp(`${asset.replaceAll('.','\\.')}([?]v=[^" ]+)?`,'g'),`${asset}?v=${version}`);
}
fs.writeFileSync(path.join(root,'index.html'),html);
console.log(`Updated cache keys for ${versions.size} assets.`);
