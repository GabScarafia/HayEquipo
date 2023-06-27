import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js';
import User from '../classes/user';
import Persona from '../classes/persona';

class SupabaseService {
    supabaseUrl: string;
    supabaseKey: string;
    supabase: any;
  
    constructor() {
      this.supabaseUrl =  'https://rpbhrlmnuqxqtvwctjcq.supabase.co';
      this.supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwYmhybG1udXF4cXR2d2N0amNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY2MDE1OTIsImV4cCI6MjAwMjE3NzU5Mn0._icBJiTqLV6HvOWxfVocRcEa4WCQbOb1Osx70Glmgjs";
      this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    }
  
    async getUserByUsername(username: string) {
      try {
        const { data, error } = await this.supabase
          .from('User')
          .select('*')
          .eq('username', username)
          .single();
  
        if (error) {
          throw new Error(error.message);
        }
  
        if (data) {
          const { id, username, email, password } = data;
          return new User(id, username, email, password);
        }
  
        return null;
      } catch {
        return null;
      }
    }

    async getPersonByUserId(userId: number) {
      try {
        const { data, error } = await this.supabase
          .from('Persona')
          .select('*')
          .eq('userId', userId)
          .single();
  
        if (error) {
          throw new Error(error.message);
        }
  
        if (data) { 
          const { id, username, apellido, dni, genero } = data;
          return new Persona(id, username, apellido, dni, genero, null);
        }
  
        return null;
      } catch {
        return null;
      }
    }
  }
  
export default SupabaseService