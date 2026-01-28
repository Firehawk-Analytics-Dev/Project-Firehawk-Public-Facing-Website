import * as migration_20260127_043217_init_schema from './20260127_043217_init_schema';
import * as migration_20260127_212147_branding_final_fix from './20260127_212147_branding_final_fix';
import * as migration_20260128_012525_make_alt_nullable from './20260128_012525_make_alt_nullable';

export const migrations = [
  {
    up: migration_20260127_043217_init_schema.up,
    down: migration_20260127_043217_init_schema.down,
    name: '20260127_043217_init_schema',
  },
  {
    up: migration_20260127_212147_branding_final_fix.up,
    down: migration_20260127_212147_branding_final_fix.down,
    name: '20260127_212147_branding_final_fix',
  },
  {
    up: migration_20260128_012525_make_alt_nullable.up,
    down: migration_20260128_012525_make_alt_nullable.down,
    name: '20260128_012525_make_alt_nullable'
  },
];
