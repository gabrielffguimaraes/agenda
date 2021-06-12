package com.github.gabrielffguimaraes.agendaapi.model.repository;

import com.github.gabrielffguimaraes.agendaapi.model.entity.Contato;
import com.github.gabrielffguimaraes.agendaapi.model.entity.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
;import java.util.List;

public interface ContatoRepository extends JpaRepository<Contato,Integer> {
    @Query("select c from Contato c where c.usuario = :usuario")
    Page<Contato> findAllByUsuario(Usuario usuario, Pageable pageable);
}
