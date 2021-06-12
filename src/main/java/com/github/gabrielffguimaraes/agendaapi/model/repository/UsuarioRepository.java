package com.github.gabrielffguimaraes.agendaapi.model.repository;

import com.github.gabrielffguimaraes.agendaapi.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario,Integer> {
   @Query("select s from Usuario s where s.usuario = :usuario")
   Optional<Usuario> verificarJaCadastrado (@Param("usuario") String nome);

    Usuario findByUsuario(String user_name);
}
