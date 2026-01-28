import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "blog_source_materials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"notes" varchar
  );
  
  ALTER TABLE "blog" ADD COLUMN "topic" varchar;
  ALTER TABLE "blog" ADD COLUMN "ai_content_plan" jsonb;
  ALTER TABLE "blog" ADD COLUMN "ai_draft" jsonb;
  ALTER TABLE "branding" ADD COLUMN "symbol_id" integer;
  ALTER TABLE "branding" ADD COLUMN "colors_purple" varchar DEFAULT '#AF92FF';
  ALTER TABLE "branding" ADD COLUMN "colors_mid_blue" varchar DEFAULT '#3776EC';
  ALTER TABLE "branding" ADD COLUMN "colors_light_blue" varchar DEFAULT '#B1C8FF';
  ALTER TABLE "branding" ADD COLUMN "colors_peach" varchar DEFAULT '#FFB1A0';
  ALTER TABLE "branding" ADD COLUMN "colors_magenta" varchar DEFAULT '#B22873';
  ALTER TABLE "branding" ADD COLUMN "colors_pink" varchar DEFAULT '#FF5BAA';
  ALTER TABLE "branding" ADD COLUMN "colors_yellow" varchar DEFAULT '#FFCF4B';
  ALTER TABLE "branding" ADD COLUMN "colors_lime" varchar DEFAULT '#58B848';
  ALTER TABLE "branding" ADD COLUMN "colors_dark_green" varchar DEFAULT '#00664C';
  ALTER TABLE "branding" ADD COLUMN "colors_mint" varchar DEFAULT '#84D8C9';
  ALTER TABLE "blog_source_materials" ADD CONSTRAINT "blog_source_materials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "blog_source_materials_order_idx" ON "blog_source_materials" USING btree ("_order");
  CREATE INDEX "blog_source_materials_parent_id_idx" ON "blog_source_materials" USING btree ("_parent_id");
  ALTER TABLE "branding" ADD CONSTRAINT "branding_symbol_id_media_id_fk" FOREIGN KEY ("symbol_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "branding_symbol_idx" ON "branding" USING btree ("symbol_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_source_materials" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "blog_source_materials" CASCADE;
  ALTER TABLE "branding" DROP CONSTRAINT "branding_symbol_id_media_id_fk";
  
  DROP INDEX "branding_symbol_idx";
  ALTER TABLE "blog" DROP COLUMN "topic";
  ALTER TABLE "blog" DROP COLUMN "ai_content_plan";
  ALTER TABLE "blog" DROP COLUMN "ai_draft";
  ALTER TABLE "branding" DROP COLUMN "symbol_id";
  ALTER TABLE "branding" DROP COLUMN "colors_purple";
  ALTER TABLE "branding" DROP COLUMN "colors_mid_blue";
  ALTER TABLE "branding" DROP COLUMN "colors_light_blue";
  ALTER TABLE "branding" DROP COLUMN "colors_peach";
  ALTER TABLE "branding" DROP COLUMN "colors_magenta";
  ALTER TABLE "branding" DROP COLUMN "colors_pink";
  ALTER TABLE "branding" DROP COLUMN "colors_yellow";
  ALTER TABLE "branding" DROP COLUMN "colors_lime";
  ALTER TABLE "branding" DROP COLUMN "colors_dark_green";
  ALTER TABLE "branding" DROP COLUMN "colors_mint";`)
}
