require('dotenv').config(); // Load environment variables

const supabaseUrl = process.env.SUPABASE_URL; // Get Supabase URL from env
const supabaseKey = process.env.SUPABASE_KEY; // Get Supabase Key from env

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey);

// Create Supabase client
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to update gong count
const updateGongCount = async (userId) => {
  const { data, error } = await supabase
    .from('gongs')
    .insert([{ user_id: userId, timestamp: new Date() }]);
  
  if (error) {
    console.error('Error updating gong count:', error);
    throw error;
  }
  return data;
};

// Get the total gong count
const getGongCount = async () => {
  const { data, error } = await supabase
    .from('gongs')
    .select('id', { count: 'exact' });
  
  if (error) {
    console.error('Error getting gong count:', error);
    throw error;
  }
  
  return data.count;
};

// Get user profile
const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }

  return data;
};

module.exports = {
  updateGongCount,
  getGongCount,
  getUserProfile
};
