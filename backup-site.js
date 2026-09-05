const path = require('path');
require(path.join(__dirname, 'backend', 'node_modules', 'dotenv')).config({ path: path.join(__dirname, 'backend', '.env') });
const fs = require('fs');
const mongoose = require(path.join(__dirname, 'backend', 'node_modules', 'mongoose'));

async function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(__dirname, 'backups', `backup-${timestamp}`);

  fs.mkdirSync(backupDir, { recursive: true });
  const dbDir = path.join(backupDir, 'mongodb_data');
  const codeDir = path.join(backupDir, 'source_code');
  fs.mkdirSync(dbDir, { recursive: true });
  fs.mkdirSync(codeDir, { recursive: true });

  console.log(`[Backup] Initializing backup at: ${backupDir}`);

  // 1. BACKUP DATABASE
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bharat-darshan';
  console.log(`[Backup] Connecting to MongoDB: ${mongoUri}...`);
  await mongoose.connect(mongoUri);

  const collections = await mongoose.connection.db.listCollections().toArray();
  const dbStats = {};

  for (const col of collections) {
    const colName = col.name;
    const docs = await mongoose.connection.db.collection(colName).find({}).toArray();
    fs.writeFileSync(
      path.join(dbDir, `${colName}.json`),
      JSON.stringify(docs, null, 2),
      'utf8'
    );
    dbStats[colName] = docs.length;
    console.log(`[Backup] Exported collection "${colName}": ${docs.length} documents`);
  }

  await mongoose.disconnect();

  // 2. BACKUP SOURCE CODE (excluding node_modules, .git, dist)
  function copyDirRecursive(src, dest, ignoreDirs = ['node_modules', '.git', 'dist', 'backups']) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      if (ignoreDirs.includes(entry.name)) continue;
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        copyDirRecursive(srcPath, destPath, ignoreDirs);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  console.log('[Backup] Copying frontend source code...');
  copyDirRecursive(path.join(__dirname, 'frontend'), path.join(codeDir, 'frontend'));

  console.log('[Backup] Copying backend source code...');
  copyDirRecursive(path.join(__dirname, 'backend'), path.join(codeDir, 'backend'));

  // Copy root configs / README
  const rootFiles = ['.gitignore', 'README.md', 'package.json'];
  for (const rf of rootFiles) {
    const p = path.join(__dirname, rf);
    if (fs.existsSync(p)) {
      fs.copyFileSync(p, path.join(codeDir, rf));
    }
  }

  // 3. CREATE MANIFEST
  const manifest = {
    backupName: `backup-${timestamp}`,
    createdAt: new Date().toISOString(),
    databaseStats: dbStats,
    sourceDirectories: ['frontend', 'backend'],
    restorationGuide: {
      step1: 'Database restore: import json files in mongodb_data using mongoimport or node script.',
      step2: 'Source code restore: files preserved under source_code directory.',
    },
  };

  fs.writeFileSync(
    path.join(backupDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );

  console.log(`✅ [Backup] Complete! Total Collections: ${Object.keys(dbStats).length}, Saved in: ${backupDir}`);
  return backupDir;
}

createBackup()
  .then((dir) => {
    console.log(`Backup completed successfully: ${dir}`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Backup failed:', err);
    process.exit(1);
  });
