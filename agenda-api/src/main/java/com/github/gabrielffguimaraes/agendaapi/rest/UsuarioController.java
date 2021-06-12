package com.github.gabrielffguimaraes.agendaapi.rest;

import com.github.gabrielffguimaraes.agendaapi.model.entity.Usuario;
import com.github.gabrielffguimaraes.agendaapi.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    public final UsuarioService usuarioService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario AdicionarUsuario(@RequestBody Usuario usuario){
      return usuarioService.salvar(usuario);
    }
}
