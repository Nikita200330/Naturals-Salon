# Database Backup and Restore Runbook

## Current Backup Status
**BACKUPS NOT CONFIGURED** (Database infrastructure not yet provisioned successfully).

## General Instructions (Once Provisioned)

### How to trigger a backup
1. Access the database provider's dashboard (e.g., Supabase, RDS, Render).
2. Navigate to Backups/Snapshots.
3. Select "Create Manual Backup" or equivalent.

### How to restore
1. Open the provider's backup interface.
2. Select the desired backup snapshot.
3. Choose "Restore to new database" (Recommended) or "Restore in-place" (High Risk - Not Recommended for Production without downtime).
4. Update application connection strings if restoring to a new database.

### How to verify restore
1. Connect to the restored database using a SQL client.
2. Verify `services` structure and data.
3. Verify `business settings` and `business-hours` structure.
4. Verify `appointments` and `feedback` tables exist.
5. Verify `admin` table structure.
*Note: Do not inspect/report private customer details unnecessarily during verification.*

### Who should perform the restore
- System Administrator / Lead Developer.

### What to check after restore
1. Verify frontend and backend connectivity to the new/restored DB.
2. Run health checks (`/api/v1/health`).
3. Perform a controlled production smoke test (submit test appointment).
