import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

const packageVersion = JSON.parse(read('package.json')).version;
const packageLock = JSON.parse(read('package-lock.json'));
const tauriVersion = JSON.parse(read('src-tauri/tauri.conf.json')).version;
const cargoManifest = read('src-tauri/Cargo.toml');
const cargoVersion = cargoManifest.match(/^version\s*=\s*"([^"]+)"/m)?.[1];

const versions = new Map([
  ['package.json', packageVersion],
  ['package-lock.json', packageLock.version],
  ['package-lock.json packages[""]', packageLock.packages?.['']?.version],
  ['src-tauri/tauri.conf.json', tauriVersion],
  ['src-tauri/Cargo.toml', cargoVersion],
]);

const invalid = [...versions].filter(
  ([, version]) => !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version ?? ''),
);

if (invalid.length > 0) {
  throw new Error(`Invalid semantic version in: ${invalid.map(([file]) => file).join(', ')}`);
}

const uniqueVersions = new Set(versions.values());
if (uniqueVersions.size !== 1) {
  throw new Error(
    `Version mismatch:\n${[...versions].map(([file, version]) => `- ${file}: ${version}`).join('\n')}`,
  );
}

const expected = process.argv[2]?.replace(/^v/, '');
if (expected && expected !== packageVersion) {
  throw new Error(`Release tag v${expected} does not match project version v${packageVersion}`);
}

console.log(`Version v${packageVersion} is consistent across all manifests.`);
