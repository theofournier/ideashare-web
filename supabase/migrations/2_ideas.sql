CREATE TYPE idea_difficulty AS ENUM ('beginner', 'intermediate', 'advanced');

CREATE TYPE idea_status AS ENUM ('published', 'hidden', 'pending', 'rejected');

CREATE TABLE IF NOT EXISTS ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  difficulty idea_difficulty NOT NULL,
  status idea_status NOT NULL DEFAULT 'published',
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tech_stacks (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS idea_tags (
  idea_id UUID REFERENCES ideas(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (idea_id, tag_id)
);

CREATE TABLE IF NOT EXISTS idea_tech_stacks (
  idea_id UUID REFERENCES ideas(id) ON DELETE CASCADE,
  tech_stack_id INTEGER REFERENCES tech_stacks(id) ON DELETE CASCADE,
  PRIMARY KEY (idea_id, tech_stack_id)
);



ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE idea_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE idea_tech_stacks ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Ideas are viewable by everyone" ON ideas
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own ideas" ON ideas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ideas" ON ideas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ideas" ON ideas
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view tags" ON tags
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view tech_stack" ON tech_stacks
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view idea tags" ON idea_tags
  FOR SELECT USING (true);

CREATE POLICY "Users can manage tags for their ideas" ON idea_tags
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM ideas WHERE id = idea_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view idea tech stacks" ON idea_tech_stacks
  FOR SELECT USING (true);

CREATE POLICY "Users can manage tech stacks for their ideas" ON idea_tech_stacks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM ideas WHERE id = idea_id AND user_id = auth.uid()
    )
  );