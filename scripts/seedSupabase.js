const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const { pathToFileURL } = require('url');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

const seed = async () => {
  const mockPath = pathToFileURL(path.join(__dirname, '..', 'src', 'data', 'mockData.js'));
  const { students } = await import(mockPath.href);

  if (process.env.SEED_RESET === 'true') {
    await supabase.from('saved_candidates').delete().neq('id', 0);
    await supabase.from('projects').delete().neq('id', 0);
    await supabase.from('students').delete().neq('id', 0);
    await supabase.from('recruiters').delete().neq('id', 0);
  }

  for (const student of students) {
    const { data: studentRow, error: studentError } = await supabase
      .from('students')
      .insert({
        user_id: `seed-${student.id}`,
        name: student.name,
        email: student.email,
        location: student.location,
        github_url: student.githubUrl,
        bio: student.bio,
        availability: student.availability,
        tech_stack: student.techStack
      })
      .select('id')
      .single();

    if (studentError) {
      console.error('Failed to insert student:', student.name, studentError.message);
      continue;
    }

    const projectRows = (student.projects || []).map((project) => ({
      student_id: studentRow.id,
      title: project.title,
      description: project.description,
      tech_stack: project.techStack,
      impact: project.impact,
      github_url: project.githubUrl || null
    }));

    if (projectRows.length > 0) {
      const { error: projectError } = await supabase.from('projects').insert(projectRows);
      if (projectError) {
        console.error('Failed to insert projects for:', student.name, projectError.message);
      }
    }
  }

  console.log('Seed complete.');
};

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
