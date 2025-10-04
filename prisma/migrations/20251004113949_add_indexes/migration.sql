-- CreateIndex
CREATE INDEX "AnalysisResult_well_id_idx" ON "public"."AnalysisResult"("well_id");

-- CreateIndex
CREATE INDEX "AnalysisResult_created_at_idx" ON "public"."AnalysisResult"("created_at");

-- CreateIndex
CREATE INDEX "AnalysisResult_vertical_depth_idx" ON "public"."AnalysisResult"("vertical_depth");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "public"."User"("username");

-- CreateIndex
CREATE INDEX "Well_name_idx" ON "public"."Well"("name");

-- CreateIndex
CREATE INDEX "Well_location_idx" ON "public"."Well"("location");

-- CreateIndex
CREATE INDEX "Well_created_at_idx" ON "public"."Well"("created_at");
