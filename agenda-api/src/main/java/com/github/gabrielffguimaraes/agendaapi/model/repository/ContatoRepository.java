package com.github.gabrielffguimaraes.agendaapi.model.repository;

import com.github.gabrielffguimaraes.agendaapi.model.entity.Contato;
import org.springframework.data.jpa.repository.JpaRepository;
;

public interface ContatoRepository extends JpaRepository<Contato,Integer> {

}
