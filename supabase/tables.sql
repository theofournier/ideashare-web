-- Create users table extension (to extend Supabase Auth users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL DEFAULT 'bg-gray-500'
);

-- Create tech_stacks table
CREATE TABLE IF NOT EXISTS tech_stacks (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Create ideas table
CREATE TABLE IF NOT EXISTS ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  upvotes INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'hidden', 'pending', 'rejected')),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create idea_tags junction table
CREATE TABLE IF NOT EXISTS idea_tags (
  idea_id UUID REFERENCES ideas(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (idea_id, tag_id)
);

-- Create idea_tech_stacks junction table
CREATE TABLE IF NOT EXISTS idea_tech_stacks (
  idea_id UUID REFERENCES ideas(id) ON DELETE CASCADE,
  tech_stack_id INTEGER REFERENCES tech_stacks(id) ON DELETE CASCADE,
  PRIMARY KEY (idea_id, tech_stack_id)
);

-- Create user_votes table to track upvotes
CREATE TABLE IF NOT EXISTS user_votes (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  idea_id UUID REFERENCES ideas(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, idea_id)
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id UUID NOT NULL REFERENCES ideas(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL CHECK (reason IN ('inappropriate', 'spam', 'offensive', 'copyright', 'misinformation', 'other')),
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'dismissed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE idea_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE idea_tech_stacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Ideas policies
CREATE POLICY "Ideas are viewable by everyone" ON ideas
  FOR SELECT USING (status = 'published' OR user_id = auth.uid());

CREATE POLICY "Users can insert their own ideas" ON ideas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ideas" ON ideas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ideas" ON ideas
  FOR DELETE USING (auth.uid() = user_id);

-- Junction tables policies
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

-- User votes policies
CREATE POLICY "Anyone can view votes" ON user_votes
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own votes" ON user_votes
  FOR ALL USING (auth.uid() = user_id);

-- Reports policies
CREATE POLICY "Users can create reports" ON reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own reports" ON reports
  FOR SELECT USING (auth.uid() = user_id);

-- Create function to update idea upvotes count
CREATE OR REPLACE FUNCTION update_idea_upvotes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE ideas SET upvotes = upvotes + 1 WHERE id = NEW.idea_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE ideas SET upvotes = upvotes - 1 WHERE id = OLD.idea_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for upvotes
CREATE TRIGGER update_idea_upvotes_trigger
AFTER INSERT OR DELETE ON user_votes
FOR EACH ROW
EXECUTE FUNCTION update_idea_upvotes();

-- Function to increment upvotes
CREATE OR REPLACE FUNCTION increment_upvotes(idea_id INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE ideas
  SET upvotes = upvotes + 1
  WHERE id = idea_id;
END;
$$ LANGUAGE plpgsql;

-- Function to decrement upvotes
CREATE OR REPLACE FUNCTION decrement_upvotes(idea_id INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE ideas
  SET upvotes = GREATEST(0, upvotes - 1)
  WHERE id = idea_id;
END;
$$ LANGUAGE plpgsql;


-- Create user_votes table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_votes (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  idea_id UUID REFERENCES ideas(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, idea_id)
);

-- Add RLS policies for user_votes
ALTER TABLE user_votes ENABLE ROW LEVEL SECURITY;

-- Allow users to see all votes
CREATE POLICY "Votes are viewable by everyone" 
ON user_votes FOR SELECT 
TO authenticated, anon
USING (true);

-- Allow users to insert their own votes
CREATE POLICY "Users can insert their own votes" 
ON user_votes FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own votes
CREATE POLICY "Users can delete their own votes" 
ON user_votes FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);


-- Create a function to ensure we have a user profile for each user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, created_at, updated_at)
  VALUES (NEW.id, NEW.email, NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to automatically create a user profile when a new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();