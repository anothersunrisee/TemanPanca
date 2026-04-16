import fs from 'fs';

import('./src/data/silaData.js').then(silaModule => {
  import('./src/data/materiData.js').then(materiModule => {
    const SILA_DATA = silaModule.SILA_DATA;
    const MATERI_DATA = materiModule.MATERI_DATA;

    let sql = `-- Create Tables
CREATE TABLE IF NOT EXISTS silas (
  id INT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  character_name TEXT,
  character_img TEXT,
  intro_text TEXT,
  theme_color TEXT,
  references_items JSONB
);

CREATE TABLE IF NOT EXISTS materis (
  id TEXT PRIMARY KEY,
  sila_id INT REFERENCES silas(id),
  title TEXT NOT NULL,
  subtitle TEXT,
  icon TEXT,
  character_name TEXT,
  character_img_url TEXT,
  illustration_url TEXT,
  slides JSONB,
  interaction JSONB,
  quiz JSONB
);\n\n`;

    sql += '-- Insert Silas\n';
    for (const key in SILA_DATA) {
      const s = SILA_DATA[key];
      const refs = JSON.stringify(s.references).replace(/'/g, "''");
      sql += `INSERT INTO silas (id, title, subtitle, character_name, character_img, intro_text, theme_color, references_items) VALUES (
  ${s.id}, 
  '${s.title.replace(/'/g, "''")}', 
  '${s.subtitle.replace(/'/g, "''")}', 
  '${s.characterName.replace(/'/g, "''")}', 
  '${s.characterImg}', 
  '${s.introText.replace(/'/g, "''")}', 
  '${s.themeColor}', 
  '${refs}'::jsonb
) ON CONFLICT (id) DO NOTHING;\n`;
    }

    sql += '\n-- Insert Materis\n';
    
    // Map to find subtitle and icon
    const materiMeta = {};
    for (const key in SILA_DATA) {
      for (const m of SILA_DATA[key].materiList) {
        materiMeta[m.id] = { sub: m.sub, icon: m.icon };
      }
    }

    for (const id in MATERI_DATA) {
      const m = MATERI_DATA[id];
      const meta = materiMeta[id] || { sub: '', icon: '' };
      
      const slides = JSON.stringify(m.slides).replace(/'/g, "''");
      const interaction = JSON.stringify(m.interaction).replace(/'/g, "''");
      const quiz = JSON.stringify(m.quiz).replace(/'/g, "''");

      sql += `INSERT INTO materis (id, sila_id, title, subtitle, icon, character_name, character_img_url, illustration_url, slides, interaction, quiz) VALUES (
  '${m.id}', 
  ${m.sila}, 
  '${m.title.replace(/'/g, "''")}', 
  '${meta.sub.replace(/'/g, "''")}', 
  '${meta.icon}', 
  '${m.character.replace(/'/g, "''")}', 
  '${m.character_img}', 
  '${m.illustration}', 
  '${slides}'::jsonb, 
  '${interaction}'::jsonb, 
  '${quiz}'::jsonb
) ON CONFLICT (id) DO NOTHING;\n`;
    }

    fs.writeFileSync('supabase_seed.sql', sql);
    console.log('Successfully generated supabase_seed.sql');
  });
});
