package com.github.gabrielffguimaraes.agendaapi.rest;

import com.github.gabrielffguimaraes.agendaapi.model.entity.Usuario;
import com.github.gabrielffguimaraes.agendaapi.model.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/usuarios")
@AllArgsConstructor
public class UsuarioController {

    public final UsuarioRepository usuarioRepository;

    @PostMapping
    public Usuario AdicionarUsuario(@RequestBody Usuario usuario){
        return usuarioRepository.save(usuario);
    }
}
