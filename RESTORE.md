# Database Restore Guide — EU American University

## Overview

This project uses **Neon Branch Backups** for disaster recovery. Every day, a GitHub Action creates a full copy of the production database as a Neon branch. These branches are permanent and never automatically deleted.

> ⚠️ **CRITICAL RULE**: The `main` branch must NEVER be overwritten, reset, or restored to automatically. All restore operations are manual and deliberate.

---

## Branch Naming Convention

| Branch Pattern | Description |
|---|---|
| `backup-YYYY-MM-DD-HH-mm` | Daily automated backup |
| `pre-deploy-YYYYMMDD-HHmm` | Pre-deployment snapshot |
| `deployment-success-YYYYMMDD-HHmm` | Post-deployment snapshot |

---

## Finding Available Backups

### Via Neon Console

1. Go to [Neon Console](https://console.neon.tech)
2. Select the project
3. Navigate to **Branches**
4. Filter by name prefix `backup-` or `pre-deploy-`

### Via Neon API

```bash
curl "https://console.neon.tech/api/v2/projects/${NEON_PROJECT_ID}/branches" \
  -H "Authorization: Bearer ${NEON_API_KEY}" | jq '.branches[] | {name: .name, id: .id, created_at: .created_at}'
```

### Via Neon CLI

```bash
neon branches list --project-id $NEON_PROJECT_ID
```

---

## How to Compare Branches

### Compare row counts between production and a backup

```bash
# Get connection string for backup branch
BACKUP_URI=$(curl -s \
  "https://console.neon.tech/api/v2/projects/${NEON_PROJECT_ID}/connection_uri?branch_id=${BACKUP_BRANCH_ID}&database_name=${DB_NAME}&role_name=${ROLE_NAME}" \
  -H "Authorization: Bearer ${NEON_API_KEY}" | jq -r '.uri')

# Compare Student counts
echo "=== Production ==="
psql "$PRODUCTION_URI" -c "SELECT COUNT(*) FROM \"Student\";"

echo "=== Backup ==="
psql "$BACKUP_URI" -c "SELECT COUNT(*) FROM \"Student\";"
```

### Compare specific records

```bash
# Check a specific student in production vs backup
psql "$PRODUCTION_URI" -c "SELECT * FROM \"Student\" WHERE \"enrollmentId\" = 'EUAU-2024-00001';"
psql "$BACKUP_URI" -c "SELECT * FROM \"Student\" WHERE \"enrollmentId\" = 'EUAU-2024-00001';"
```

---

## How to Recover Individual Rows

### Step 1: Connect to the backup branch

```bash
# Get the backup branch connection string
BACKUP_URI=$(curl -s \
  "https://console.neon.tech/api/v2/projects/${NEON_PROJECT_ID}/connection_uri?branch_id=${BACKUP_BRANCH_ID}&database_name=${DB_NAME}&role_name=${ROLE_NAME}" \
  -H "Authorization: Bearer ${NEON_API_KEY}" | jq -r '.uri')
```

### Step 2: Export the specific rows

```bash
# Export a specific student record
psql "$BACKUP_URI" -c "\COPY (SELECT * FROM \"Student\" WHERE \"enrollmentId\" = 'EUAU-2024-00001') TO 'student_backup.csv' CSV HEADER"
```

### Step 3: Import into production

```bash
# Import the row into production
# ⚠️ VERIFY the data before importing
cat student_backup.csv

# Import (will fail on duplicates — this is safe)
psql "$PRODUCTION_URI" -c "\COPY \"Student\" FROM 'student_backup.csv' CSV HEADER"
```

### Alternative: Direct INSERT from backup

```bash
# Read from backup, write to production using dblink or manual SQL
# 1. Get the row data from backup
psql "$BACKUP_URI" -t -A -c "SELECT \"enrollmentId\", \"fullName\", \"email\", \"programName\", \"programLevel\" FROM \"Student\" WHERE \"enrollmentId\" = 'EUAU-2024-00001';"

# 2. Manually INSERT into production using the values above
psql "$PRODUCTION_URI" -c "INSERT INTO \"Student\" (\"enrollmentId\", \"fullName\", ...) VALUES (...);"
```

---

## How to Recover Entire Tables

### Step 1: Export table from backup branch

```bash
# Export entire Student table from backup
pg_dump "$BACKUP_URI" --table="Student" --data-only --column-inserts > student_table_backup.sql
```

### Step 2: Review the export

```bash
# ALWAYS review before importing
head -50 student_table_backup.sql
wc -l student_table_backup.sql
```

### Step 3: Import into production

> ⚠️ **WARNING**: This will INSERT rows. If rows already exist with the same primary keys, the import will fail (which is safe). To replace existing rows, you must DELETE them first — do this with extreme caution.

```bash
# Option A: Safe import (fails on duplicates)
psql "$PRODUCTION_URI" < student_table_backup.sql

# Option B: If you need to replace the table entirely
# ⚠️ DANGEROUS — only do this if you understand the consequences
psql "$PRODUCTION_URI" -c "BEGIN; DELETE FROM \"Student\"; \i student_table_backup.sql; COMMIT;"
```

---

## Full Database Restore (Nuclear Option)

> ⚠️ **EXTREME CAUTION**: This replaces ALL data in production. Only use this in a true disaster scenario.

### Option 1: Point production to backup branch (temporary)

You can temporarily point your application to the backup branch's connection string:

1. Get the backup branch connection string (see above)
2. Update `DATABASE_URL` in your hosting provider (Vercel, etc.)
3. This gives you immediate read access to backup data
4. **Create a new compute endpoint** if the backup branch doesn't have one:

```bash
curl -X POST \
  "https://console.neon.tech/api/v2/projects/${NEON_PROJECT_ID}/endpoints" \
  -H "Authorization: Bearer ${NEON_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"endpoint\": {
      \"branch_id\": \"${BACKUP_BRANCH_ID}\",
      \"type\": \"read_write\"
    }
  }"
```

### Option 2: Export and import everything

```bash
# Export everything from backup
pg_dump "$BACKUP_URI" > full_backup.sql

# Import into production (after clearing)
# ⚠️ THIS WILL DELETE ALL CURRENT PRODUCTION DATA
psql "$PRODUCTION_URI" < full_backup.sql
```

---

## How to Avoid Overwriting Production

### Rules

1. **NEVER** run `pg_dump | psql $PRODUCTION_URI` without reviewing the dump first
2. **NEVER** automate restore operations — always do them manually
3. **NEVER** change the `DATABASE_URL` environment variable to point to a backup branch permanently
4. **ALWAYS** compare row counts before and after any restore
5. **ALWAYS** test the restore on a new throwaway branch first:

```bash
# Create a test branch from the backup branch
curl -X POST \
  "https://console.neon.tech/api/v2/projects/${NEON_PROJECT_ID}/branches" \
  -H "Authorization: Bearer ${NEON_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"branch\": {
      \"name\": \"restore-test-$(date -u +%Y%m%d-%H%M)\",
      \"parent_id\": \"${BACKUP_BRANCH_ID}\"
    }
  }"
```

### Verification Checklist

After any restore operation, verify:

- [ ] Student count matches expected
- [ ] Application count matches expected
- [ ] Certificate records are intact
- [ ] Program list is complete
- [ ] Admin users can log in
- [ ] Public pages load correctly
- [ ] Student verification works

---

## Quick Reference

### Environment Variables

```bash
NEON_API_KEY=neon_api_key_here
NEON_PROJECT_ID=your_project_id
NEON_MAIN_BRANCH_ID=br_main_branch_id
NEON_DATABASE_NAME=neondb
NEON_ROLE_NAME=your_role_name
```

### Useful Commands

```bash
# List all backup branches
curl -s "https://console.neon.tech/api/v2/projects/${NEON_PROJECT_ID}/branches" \
  -H "Authorization: Bearer ${NEON_API_KEY}" | \
  jq '.branches[] | select(.name | startswith("backup-")) | {name, id, created_at}'

# Get connection string for a specific branch
curl -s "https://console.neon.tech/api/v2/projects/${NEON_PROJECT_ID}/connection_uri?branch_id=${BRANCH_ID}&database_name=${DB_NAME}&role_name=${ROLE_NAME}" \
  -H "Authorization: Bearer ${NEON_API_KEY}" | jq -r '.uri'

# Create manual backup right now
curl -X POST "https://console.neon.tech/api/v2/projects/${NEON_PROJECT_ID}/branches" \
  -H "Authorization: Bearer ${NEON_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"branch\": {\"name\": \"manual-backup-$(date -u +%Y%m%d-%H%M)\", \"parent_id\": \"${NEON_MAIN_BRANCH_ID}\"}}"
```
