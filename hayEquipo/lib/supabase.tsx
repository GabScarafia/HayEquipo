import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js';
import {NewUser, User} from '../classes/user';
import Persona from '../classes/persona';
import Equipo from '../classes/equipo';
import JugadorEquipo from "../classes/jugadorEquipo"
import Partido from '../classes/partido';

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
          const { id, nombre, apellido, dni, genero, userId, image } = data;
          return new Persona(id, nombre, apellido, dni, genero, null, image);
        }
  
        return null;
      } catch {
        return null;
      }
    }

    async getEquiposByNombre(nombre: string){
      try {
        const Equipos: Equipo[] = [];
        const { data, error } = await this.supabase
          .from('Equipo')
          .select('*')
          .ilike('nombre', "%"+nombre+"%")
        if (error) {
          throw new Error(error.message);
        }
        if (data) { 
          await Promise.all(
            data.map(async ({ id, nombre, escudo, adminId }: { id: number; nombre: string; escudo: string, adminId: number }) => {
              var tempEquipo = new Equipo(id, nombre, escudo, adminId)
              Equipos.push(tempEquipo); 
            })
          );
          return Equipos
        }
        return null;
      } catch {
        return null;
      }
    }
    async getEquipoById(id: number){
      const { data, error } = await this.supabase
      .from('Equipo')
      .select('*')
      .eq('id', id)
      .single();

      if (data) {
        const { id, nombre, escudo, adminId } = data;
        const tempEquipo = new Equipo(id, nombre, escudo, adminId);
      return tempEquipo
      }
    }
    
    async getJugadores(equipoId: number){
      try {
        const Jugadores: Persona[] = [];
        const { data, error } = await this.supabase
          .from('JugadorEquipo')
          .select('*')
          .eq('equipoId', equipoId)
          
        if (error) {
          throw new Error(error.message);
        }
        if (data) { 
          await Promise.all(
            data.map(async ({ id, jugadorId, equipoId }: { id: number; jugadorId: number; equipoId: number }) => {
              const { data, error } = await this.supabase
                .from('Persona')
                .select('*')
                .eq('id', jugadorId)
                .single();
        
              if (data) {
                const { id, nombre, apellido, dni, genero, userId, image } = data;
                const tempEquipo = new Persona(id, nombre, apellido, dni, genero, null, image);
                Jugadores.push(tempEquipo);
              }
            })
          );
          return Jugadores;
          // return new Persona(id, username, apellido, dni, genero, null, null);
        }
        return null;
      } catch {
        return null;
      }
    }
    
    async getEquipoByJugadorId(jugadorId: number) {
      try {
        const Equipos: Equipo[] = [];
        const { data, error } = await this.supabase
          .from('JugadorEquipo')
          .select('*')
          .eq('jugadorId', jugadorId)
          
        if (error) {
          throw new Error(error.message);
        }
        if (data) { 
          await Promise.all(
            data.map(async ({ id, jugadorId, equipoId }: { id: number; jugadorId: number; equipoId: number }) => {
              const { data, error } = await this.supabase
                .from('Equipo')
                .select('*')
                .eq('id', equipoId)
                .single();
        
              if (data) {
                const { id, nombre, escudo, adminId } = data;
                const tempEquipo = new Equipo(id, nombre, escudo, adminId);
                Equipos.push(tempEquipo);
              }
            })
          );
          return Equipos;
          // return new Persona(id, username, apellido, dni, genero, null, null);
        }
        return null;
      } catch {
        return null;
      }
    }
    
    async newTeam(equipo: Equipo){
      try {
        const { data, error } = await this.supabase
            .from('Equipo')
            .insert([
              { nombre: equipo.nombre , escudo: equipo.escudo, adminId: equipo.adminId},
            ])
            .select()
          if(data){
              const [{ id, nombre, escudo, adminId }] = data;
              var uJE = new JugadorEquipo(null, adminId, id);
              var finish = await this.newJugadorEquipo(uJE);
              return finish;
          } 
      } catch {
        return false 
      }
    }

    async newJugadorEquipo(jE: JugadorEquipo){
      const { data, error } = await this.supabase
      .from('JugadorEquipo')
      .insert([
        { jugadorId: jE.jugadorId, equipoId: jE.equipoId},
      ])
      .select()
      return true
    }

    async newRegister(user: NewUser, persona: Persona){
      try {
        const { data, error } = await this.supabase
            .from('User')
            .insert([
              { username: user.username , email: user.email, password: user.password},
            ])
            .select()
            console.log("ACA DATA")
            console.log(data)
          if(data){
              const [{ id, username, email, password }] = data;
              var uNew = new User(id, username, email, password);
              var nPerson = await this.newPerson(uNew, persona);
              return nPerson;
          } 
      } catch {
        return null // Cuando no encuentro la db
      }
    }

    async newPerson(user: User, persona: Persona){
      console.log(true)
      const { data, error } = await this.supabase
      .from('Persona')
      .insert([
        { nombre: persona.nombre, apellido: persona.apellido, dni: persona.dni, genero: persona.genero, userId: user.id },
      ])
      .select()
      const [{ id, nombre, apellido, dni, genero }] = data;
      return new Persona(id, nombre, apellido, dni, genero, user, null);
    }

    async setPersonById(persona: Persona){
      const { data, error } = await this.supabase
      .from('Persona')
      .update([
        { nombre: persona.nombre, apellido: persona.apellido, dni: persona.dni, genero: persona.genero, image: persona.image},
      ]).eq("id", persona.id)
      .select()
      if(data){
        return true
      }else{
        return false
      }
    }

    async newPlayerOnTeam(idEquipo: number, idPersona: number){
      const { data, error } = await this.supabase
        .from('JugadorEquipo')
        .select('*')
        .eq('jugadorId', idPersona).eq('equipoId', idEquipo)
        if (error) {
          throw new Error(error.message);
        }
        if (data) { 
          if(data.length > 0){
            console.log("Ya sos parte de este Equipo")
            return "Ya sos parte de este Equipo"
          }else{
            var uJE = new JugadorEquipo(null, idPersona, idEquipo);
            var finish = await this.newJugadorEquipo(uJE);
            if(finish)
              return "Solicitud Enviada"
            else
              return "Error"
          }
        }
    }

    async getGameByEquipoId(equipoId: number) {
      try {
        const partidos: Partido[] = [];
        const { data, error } = await this.supabase
          .from('Partidos')
          .select('*')
          //.eq('idEquipoLocal', equipoId)
          .or("idEquipoLocal.eq."+equipoId+",idEquipoVisitante.eq."+equipoId)
        if (error) {
          throw new Error(error.message);
        }
        if (data) { 
          await Promise.all(
            data.map(async ({ id, idEquipoLocal, idEquipoVisitante, fecha }: { id: number; idEquipoLocal: number; idEquipoVisitante: number, fecha:Date }) => {
              const tempEquipo = new Partido(id, idEquipoLocal, idEquipoVisitante,fecha);
              partidos.push(tempEquipo);
            })
          );
          return partidos;
        }
        return null;
      } catch {
        return null;
      }
    }
    
};

export default SupabaseService;