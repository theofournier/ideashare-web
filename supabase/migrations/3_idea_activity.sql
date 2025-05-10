CREATE TABLE IF NOT EXISTS idea_votes (
  idea_id UUID REFERENCES ideas(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  PRIMARY KEY (user_id, idea_id)
);

CREATE TABLE IF NOT EXISTS idea_views (
  idea_id UUID REFERENCES ideas(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  PRIMARY KEY (user_id, idea_id)
);

CREATE TABLE IF NOT EXISTS idea_activities (
  idea_id UUID NOT NULL UNIQUE PRIMARY KEY REFERENCES ideas(id) ON DELETE CASCADE,
  vote_count BIGINT NOT NULL DEFAULT 0,
  view_count BIGINT NOT NULL DEFAULT 0
);


ALTER TABLE idea_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE idea_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE idea_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view idea votes" ON idea_votes
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view idea views" ON idea_views
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view idea activities" ON idea_activities
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own idea votes" ON idea_votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own idea votes" ON idea_votes
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own idea views" ON idea_views
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own idea views" ON idea_views
  FOR DELETE USING (auth.uid() = user_id);


CREATE OR REPLACE FUNCTION handle_new_idea()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO idea_activities (idea_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_idea_created
AFTER INSERT ON ideas
FOR EACH ROW
EXECUTE FUNCTION handle_new_idea();

CREATE OR REPLACE FUNCTION handle_update_idea_vote()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE idea_activities
    SET vote_count = vote_count + 1
    WHERE idea_id = NEW.idea_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE idea_activities
    SET vote_count = vote_count - 1
    WHERE idea_id = OLD.idea_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_update_idea_vote
AFTER INSERT OR DELETE ON idea_votes
FOR EACH ROW
EXECUTE FUNCTION handle_update_idea_vote();

CREATE OR REPLACE FUNCTION handle_update_idea_view()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE idea_activities
    SET view_count = view_count + 1
    WHERE idea_id = NEW.idea_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE idea_activities
    SET view_count = view_count - 1
    WHERE idea_id = OLD.idea_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_update_idea_view
AFTER INSERT OR DELETE ON idea_views
FOR EACH ROW
EXECUTE FUNCTION handle_update_idea_view();