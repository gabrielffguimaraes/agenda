package com.github.gabrielffguimaraes.agendaapi.model.repository;

import com.github.gabrielffguimaraes.agendaapi.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario,Integer> {
}
